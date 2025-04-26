import { Box, Stack } from '@mui/material';
import TaskDataGrid from './components/TaskDataGrid';
import Header from '@presentation/layouts/components/Header';

const TasksPage: React.FC = (props: { disableCustomTheme?: boolean }) => {
    return (
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
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                <Header />
                <TaskDataGrid />
            </Box>
        </Stack>
    );
};

export default TasksPage;