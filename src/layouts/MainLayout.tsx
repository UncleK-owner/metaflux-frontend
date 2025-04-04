import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import SideMenu from './components/SideMenu';
import AppTheme from '../../theme/AppTheme';

export default function MainLayout(props: { children: React.ReactNode; disableCustomTheme?: boolean }) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <SideMenu />
                <AppNavbar />
                {/* Main content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        overflow: 'auto',
                        height: '100%',
                    }}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                            height: '100%',
                        }}
                    >
                        {props.children}
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}