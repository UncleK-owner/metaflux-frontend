import * as React from 'react';
import { Outlet } from 'react-router-dom';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { MainLayout } from '@presentation/layouts';

export { default as DashboardPage } from './Dashboard/DashboardPage';
export { default as MapsPage } from './Maps/MapsPage';
export { default as TasksPage } from './Tasks/TasksPage';
export { default as TasksUploadPage } from './Tasks/TasksUploadPage';

export default function HomePage(props: { disableCustomTheme?: boolean }) {
    return (
        <MainLayout {...props}>
            <Outlet />
        </MainLayout>
    );
}
