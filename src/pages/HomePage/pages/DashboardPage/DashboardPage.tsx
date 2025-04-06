import * as React from 'react';
import { Outlet } from 'react-router-dom';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import Header from '@layouts/components/Header';
import MainGrid from './components/MainGrid';
import { Box } from '@mui/material';

export default function DashboardPage(props: { disableCustomTheme?: boolean }) {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Header />
            <MainGrid />
        </Box>
    );

}
