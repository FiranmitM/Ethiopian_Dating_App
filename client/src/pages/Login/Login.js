import { Button, Paper, TextField, Typography, Box, Link } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification/Notification";
import { changeNotification } from "../../reducers/notificationReducer";
import { changeSeverity } from "../../reducers/severityReducer";
import signUpService from "../../services/signUpService";
import { setUser } from "../../reducers/userReducer";
import { getProfileData } from '../../reducers/profileReducer';
import { getUserLists } from "../../reducers/userListsReducer";
import { getUserNotifications } from "../../reducers/userNotificationsReducer";

const Login = ({ socket }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitUser = async (event) => {
        event.preventDefault();

        const signedUpUser = {
            username: event.target.username.value,
            password: event.target.password.value,
        };

        signUpService.logInUser(signedUpUser)
            .then(result => {
                if (result.userid) {
                    const sessionUser = { name: result.username, id: result.userid };
                    dispatch(setUser(sessionUser));
                    dispatch(getUserLists());
                    dispatch(getUserNotifications());
                    dispatch(getProfileData());
                    dispatch(changeNotification(""));
                    socket.emit("newUser", { name: result.username, id: result.userid, socketID: socket.id });
                    socket.emit("join_notification", { id: result.userid });
                    navigate('/home');
                } else {
                    dispatch(changeSeverity('error'));
                    dispatch(changeNotification(result));
                }
            });
    };

    const navigateToReset = () => {
        navigate('/login/resetpassword');
    };

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 128px)',
                py: 4
            }}
        >
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    width: '100%', 
                    maxWidth: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome Back!
                </Typography>
                <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                    Please login to your account
                </Typography>
                
                <form onSubmit={submitUser}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="username"
                        label="Username"
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        type="password"
                        name="password"
                        label="Password"
                        required
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button 
                        onClick={navigateToReset}
                        color="secondary"
                    >
                        Forgot Password?
                    </Button>
                    <Typography variant="body2">
                        Don't have an account? {' '}
                        <Link 
                            href="/signup" 
                            underline="hover"
                            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
                
                <Notification />
            </Paper>
        </Container>
    );
};

export default Login;