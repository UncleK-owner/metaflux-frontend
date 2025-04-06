import * as React from 'react';
import { Box } from '@mui/material';
import MainLayout from '@layouts/MainLayout';
import Header from '@layouts/components/Header';
import TaskDataGrid from './components/TaskDataGrid';

export default function TasksPage(props: { disableCustomTheme?: boolean }) {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Header />
            <TaskDataGrid />
        </Box>
    );
}