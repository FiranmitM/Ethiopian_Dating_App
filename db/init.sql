SET time_zone = '+03:00';  -- Ethiopia Time Zone

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    verified ENUM('YES', 'NO') DEFAULT 'NO',
    last_connection TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS email_verify (
    running_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    verify_code VARCHAR(255) NOT NULL,
    expire_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS password_reset (
    running_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reset_code VARCHAR(255) NOT NULL,
    expire_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_settings (
    running_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    gender VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    sexual_pref VARCHAR(255) NOT NULL,
    biography TEXT NOT NULL,
    fame_rating INT NOT NULL DEFAULT 0,
    user_location VARCHAR(255) NOT NULL,
    IP_location POINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_pictures (
    picture_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    picture_data TEXT NOT NULL,
    profile_pic ENUM('YES', 'NO') DEFAULT 'NO',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS likes (
    running_id INT AUTO_INCREMENT PRIMARY KEY,
    liker_id INT NOT NULL,
    target_id INT NOT NULL,
    liketime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (liker_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (target_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS connections (
    connection_id INT AUTO_INCREMENT PRIMARY KEY,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS blocks (
    block_id INT AUTO_INCREMENT PRIMARY KEY,
    blocker_id INT NOT NULL,
    target_id INT NOT NULL,
    FOREIGN KEY (blocker_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (target_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_content VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_tags (
    user_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (user_id, tag_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS chat (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    connection_id INT NULL,
    sender_id INT NOT NULL,
    message TEXT NOT NULL,
    read_status ENUM('YES', 'NO') DEFAULT 'NO',
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (connection_id) REFERENCES connections(connection_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS watches (
    watch_id INT AUTO_INCREMENT PRIMARY KEY,
    watcher_id INT NOT NULL,
    target_id INT NOT NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (watcher_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (target_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    target_id INT NOT NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (target_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    sender_id INT NULL,
    notification_text VARCHAR(255) NOT NULL,
    redirect_path VARCHAR(255),
    read_status ENUM('YES', 'NO') DEFAULT 'NO',
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fame_rates (
    famerate_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    setup_pts INT NOT NULL DEFAULT 0,
    picture_pts INT NOT NULL DEFAULT 0,
    tag_pts INT NOT NULL DEFAULT 0,
    like_pts INT NOT NULL DEFAULT 0,
    connection_pts INT NOT NULL DEFAULT 0,
    total_pts INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
