module.exports = function (app, pool, bcrypt, transporter, crypto) {
  app.post('/api/signup', async (request, response) => {
    try {
      const {
        username,
        firstname,
        lastname,
        email,
        password,
        confirmPassword
      } = request.body;

      // Validation function
      const validateSignupData = async () => {
        // Username validation
        if (username.length < 4 || username.length > 25) {
          throw new Error("Username must be between 4-25 characters");
        }
        if (!/^[a-z0-9]+$/i.test(username)) {
          throw new Error("Username can only contain letters and numbers");
        }

        // Name validation
        if (firstname.length > 50 || lastname.length > 50 || 
            firstname.length < 1 || lastname.length < 1) {
          throw new Error("Names must be 1-50 characters");
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new Error("Invalid email format");
        }

        // Password validation
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,30}/.test(password)) {
          throw new Error("Password must contain uppercase, lowercase, number, and special character");
        }
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }

        // Check if username exists
        const [userRows] = await pool.query(
          "SELECT id FROM users WHERE username = ?", 
          [username]
        );
        if (userRows.length > 0) {
          throw new Error("Username already exists");
        }

        // Check if email exists
        const [emailRows] = await pool.query(
          "SELECT id FROM users WHERE email = ?", 
          [email]
        );
        if (emailRows.length > 0) {
          throw new Error("Email already registered");
        }
      };

      await validateSignupData();

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Start transaction
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        // Insert user
        const [userResult] = await connection.query(
          `INSERT INTO users 
           (username, firstname, lastname, email, password, verified) 
           VALUES (?, ?, ?, ?, ?, 'NO')`,
          [username, firstname, lastname, email, hashedPassword]
        );

        const userId = userResult.insertId;

        // Generate verification code
        const verificationCode = crypto.randomBytes(20).toString('hex');

        // Store verification code
        await connection.query(
          `INSERT INTO email_verify 
           (user_id, email, verify_code) 
           VALUES (?, ?, ?)`,
          [userId, email, verificationCode]
        );

        // Create fame rating entry
        await connection.query(
          `INSERT INTO fame_rates (user_id) VALUES (?)`,
          [userId]
        );

        await connection.commit();

        // Send verification email
        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: email,
          subject: 'Verify your Ethiopian Dating account',
          html: `
            <p>Welcome to Ethiopian Dating!</p>
            <p>Click the link below to verify your account:</p>
            <a href="http://localhost:3000/confirm/${username}/${verificationCode}">
              Verify Account
            </a>
          `
        };

        await transporter.sendMail(mailOptions);
        response.json({ success: true });

      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }

    } catch (error) {
      console.error("Signup error:", error.message);
      response.status(400).json({ error: error.message });
    }
  });

  // Verification endpoint
  app.post('/api/signup/verifyuser', async (request, response) => {
    try {
      const { username, code } = request.body;

      const [verifyRows] = await pool.query(
        `SELECT user_id FROM email_verify 
         WHERE verify_code = ?`,
        [code]
      );

      if (verifyRows.length === 0) {
        throw new Error("Invalid verification code");
      }

      // Update user as verified
      await pool.query(
        `UPDATE users SET verified = 'YES' 
         WHERE username = ?`,
        [username]
      );

      // Delete verification code
      await pool.query(
        `DELETE FROM email_verify 
         WHERE verify_code = ?`,
        [code]
      );

      response.json({ success: true });

    } catch (error) {
      console.error("Verification error:", error.message);
      response.status(400).json({ error: error.message });
    }
  });
};