import React, { useContext } from 'react';
import { AppBar, Box, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import { AppContext } from '../../../context/AppContext';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
    const { appLoading, user, logout } = useContext(AppContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ backgroundColor: "green" }}>
                    <Box maxWidth="xl" mx="auto" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <Typography
                            component="div"
                            sx={{
                                fontSize: 24,
                                fontWeight: 700,
                            }}
                        >
                            FOOD DONATIONS
                        </Typography>
                        {user && (
                            <IconButton onClick={logout}>
                                <LogoutIcon sx={{ color: 'white' }} />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
                {appLoading && <LinearProgress />}
            </AppBar>
        </Box>
    );
};

export default Header;
