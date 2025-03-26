import { Box, Button, Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const WelcomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: 'url(/ethiopia.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Overlay with gradient */}
      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          padding: 2
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: theme.palette.primary.main,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Welcome to Ethiopian Dating
          </Typography>
          
          <Typography variant="h5" sx={{ mb: 5 }}>
            Connect with Ethiopian singles looking for meaningful relationships
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/login')}
                sx={{ 
                  px: 5, 
                  py: 1.5, 
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease'
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
                onClick={() => navigate('/signup')}
                sx={{ 
                  px: 5, 
                  py: 1.5, 
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease'
                  }
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default WelcomePage;