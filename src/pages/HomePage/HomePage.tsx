import * as React from 'react';
import { Outlet } from 'react-router-dom';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { MainLayout } from '@layouts/index';

export default function DashboardPage(props: { disableCustomTheme?: boolean }) {
    return (
        <MainLayout {...props}>
            <Outlet />
        </MainLayout>
    );
}
