import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import signUpService from '../services/signUpService';
import { changeSeverity } from "../reducers/severityReducer";
import { changeNotification } from "../reducers/notificationReducer";
import Notification from "../components/notification/Notification";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user !== undefined && user !== '') {
            navigate('/profile');
        }
    }, [user, navigate]);

    const submitUser = async (event) => {
        event.preventDefault();
    
        const signedUpUser = {
            username: event.target.username.value,
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirm_password.value,
        };

        signUpService.createUser(signedUpUser)
            .then(result => {
                if (result === true) {
                    dispatch(changeSeverity('success'));
                    dispatch(changeNotification('User created successfully - Email sent with link for verification'));
                    navigate('/login');
                } else {
                    dispatch(changeSeverity('error'));
                    dispatch(changeNotification(result));
                }
            });
    };

    return (
        <Container 
            sx={{ 
                pt: 12,  // Increased padding-top to account for header
                pb: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundImage: `url("https://assets.materialup.com/uploads/cd7deaa7-e263-4c1b-98c9-132d248fc0d4/preview.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Paper 
                elevation={10} 
                sx={{ 
                    padding: 4, 
                    width: { xs: '90%', sm: '70%', md: '50%' },
                    maxWidth: '600px',
                    margin: 'auto',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Create Your Account
                </Typography>
                <form onSubmit={submitUser}>
                    <TextField 
                        fullWidth 
                        margin="normal" 
                        name="username" 
                        label="Username" 
                        placeholder="Username" 
                        autoComplete="nickname" 
                        required 
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            name="firstname" 
                            label="First name" 
                            placeholder="First name" 
                            autoComplete="given-name" 
                            required 
                        />
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            name="lastname" 
                            label="Last name" 
                            placeholder="Last name" 
                            autoComplete="family-name" 
                            required 
                        />
                    </Box>
                    <TextField 
                        fullWidth 
                        margin="normal"  
                        name="email" 
                        label="Email" 
                        placeholder="Email" 
                        autoComplete="email" 
                        required 
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            type="password" 
                            name="password" 
                            label="Password" 
                            placeholder="Password" 
                            autoComplete="new-password" 
                            required 
                        />
                        <TextField 
                            fullWidth 
                            margin="normal" 
                            type="password" 
                            name="confirm_password" 
                            label="Confirm Password" 
                            placeholder="Confirm Password" 
                            autoComplete="confirm-password" 
                            required 
                        />
                    </Box>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        size="large" 
                        fullWidth
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        Create Account
                    </Button>
                </form>
                <Notification />
            </Paper>
        </Container>
    );
};

export default Signup;