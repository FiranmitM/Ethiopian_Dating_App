import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Header = ({ transparent = false }) => {
  const theme = useTheme();
  const location = useLocation();

  // Hide auth buttons if we're already on auth pages
  const showAuthButtons = !['/login', '/signup'].includes(location.pathname);

  return (
    <AppBar 
      position="static"
      sx={{ 
        background: transparent ? 'transparent' : `
          linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})
        `,
        boxShadow: 'none',
        padding: transparent ? '2rem 0' : '1rem 0',
        position: 'fixed',
        top: 0,
        zIndex: 1000
      }}
    >
      <Toolbar sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 'lg',
        width: '100%',
        margin: '0 auto',
        px: 3
      }}>
        {/* Logo/Title */}
        <Typography 
          variant="h3"
          component={Link} 
          to="/"
          sx={{ 
            fontWeight: 'bold',
            textDecoration: 'none',
            color: transparent ? theme.palette.accent.main : 'white',
            textShadow: transparent ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          Ethiopian Dating
        </Typography>
        
        {/* Auth Buttons (only when needed) */}
        {showAuthButtons && !transparent && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="medium"
              sx={{
                color: 'white',
                borderColor: 'white',
                borderRadius: '50px',
                px: 3,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                }
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: theme.palette.accent.main,
                color: 'white',
                borderRadius: '50px',
                px: 3,
                '&:hover': {
                  backgroundColor: theme.palette.accent.dark
                }
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;