import React from "react";
import { Box, Button, Typography, Container, Grid, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/ethiopian-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: theme.palette.accent.main,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Welcome to Ethiopian Dating App
        </Typography>
        
        <Typography variant="h5" sx={{ mb: 5 }}>
          Find your perfect match in Ethiopia's finest dating community
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/login"
              sx={{ 
                px: 5, 
                py: 1.5, 
                fontSize: "1.1rem",
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark
                }
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="/signup"
              sx={{ 
                px: 5, 
                py: 1.5, 
                fontSize: "1.1rem",
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark
                }
              }}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>

        <Typography variant="body1" sx={{ mt: 4, color: 'white' }}>
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            sx={{ 
              color: theme.palette.accent.light,
              fontWeight: 'bold',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Sign up here
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;