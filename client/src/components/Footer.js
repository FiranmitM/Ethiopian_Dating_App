import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"

const Footer = () => {

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels sx={{ width: '100%', position: 'absolute', bottom: 0, left:0, right:0  }}>
                <BottomNavigationAction label="Github" href='https://github.com/FiranmitM/Ethiopian_Dating_App' />
                <BottomNavigationAction label="Contact" href='megersafiranmit@gmail.com' />
                <BottomNavigationAction label="About" href='https://github.com/FiranmitM/Ethiopian_Dating_App'/>
            </BottomNavigation>
        </Paper>
    )
}

export default Footer