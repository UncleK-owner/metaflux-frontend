import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import MainGrid from './components/MainGrid';
import { Box, Stack } from '@mui/material';
import Header from '@presentation/layouts/components/Header';

export default function DashboardPage(props: { disableCustomTheme?: boolean }) {
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
                <MainGrid />
            </Box>
        </Stack>

    );

}
