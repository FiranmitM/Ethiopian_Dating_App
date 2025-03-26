import React, { useEffect, useState } from "react";
import "./style/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, Container, CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import socketIO from "socket.io-client";

// Services
import signUpService from "./services/signUpService";

// Pages & Components
import WelcomePage from "./components/WelcomePage";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login/Login";
import Browsing from "./pages/Browsing/Browsing";
import Profile from "./pages/Profile/Profile";
import ProfileSettings from "./pages/Profile/ProfileSettings";
import UserProfile from "./pages/Profile/UserProfile";
import Chat from "./pages/Chat/Chat";
import ResetPassword from "./pages/Login/ResetPassword";
import ConfirmMail from "./pages/Login/ConfirmMail";
import Logout from "./pages/Logout";
import PathNotExists from "./pages/PathNotExists";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Notification from "./components/notification/Notification";

// Redux Actions
import { setUser } from "./reducers/userReducer";
import { getProfileData } from "./reducers/profileReducer";
import { getUserNotifications } from "./reducers/userNotificationsReducer";
import { changeOnlineUsers } from "./reducers/onlineUsersReducer";

// Theme Configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
    secondary: {
      main: "#d32f2f",
      light: "#f44336",
      dark: "#b71c1c",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Readex Pro', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
  },
});

const App = () => {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = socketIO("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setSocketConnected(true);
    });

    newSocket.on("newUserResponse", (data) => {
      dispatch(changeOnlineUsers(data));
    });

    return () => newSocket.disconnect();
  }, [dispatch]);

  // Check for existing session
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const sessionUser = await signUpService.getSessionUser();
        if (sessionUser) {
          dispatch(setUser(sessionUser));
          dispatch(getProfileData());
          dispatch(getUserNotifications());
        }
      } catch (error) {
        console.error("Session initialization error:", error);
      }
    };
    initializeUser();
  }, [dispatch]);

  if (!socketConnected) {
    return (
      <Container sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <Loader text="Connecting to server..." />
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Root path redirects to welcome page */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          
          {/* Welcome Page (now default) */}
          <Route 
            path="/welcome" 
            element={<WelcomePage />} 
          />
          
          {/* Authentication Routes */}
          <Route 
            path="/login" 
            element={
              <>
                <Header />
                <Login socket={socket} />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <>
                <Header />
                <Signup />
                <Footer />
              </>
            } 
          />
          
          {/* Authenticated Routes */}
          {user && (
            <>
              <Route 
                path="/home" 
                element={
                  <>
                    <Header />
                    <Home />
                    <Footer />
                  </>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <>
                    <Header />
                    <Profile />
                    <Footer />
                  </>
                } 
              />
              {/* Add other authenticated routes here */}
            </>
          )}
          
          {/* Fallback Route */}
          <Route 
            path="*" 
            element={
              <>
                <Header />
                <PathNotExists />
                <Footer />
              </>
            } 
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;