import React from 'react'
import '../style/Loader.css'
import { Typography, Box } from '@mui/material'

const Loader = ({ text, welcomeMessage }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
        color: 'white'
      }}
    >
      {welcomeMessage && (
        <Typography 
          variant="h2"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: '#FCDD09', // Ethiopian yellow
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Welcome to Ethiopian Dating App
        </Typography>
      )}
      
      <Typography
        variant="h5"
        sx={{ 
          color: 'white',
          mb: 3
        }}
      >
        {text}
      </Typography>
      
      <div className="loader" />
    </Box>
  )
}

export default Loader