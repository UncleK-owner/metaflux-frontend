import { Box, Stack } from '@mui/material';
import { RouterPath } from '@presentation/routes/RouterPath';
import { GridRowId } from '@mui/x-data-grid';
import Header from '@presentation/layouts/components/Header';
import JobDataGrid from './components/JobDataGrid';
import { useGetAllAddressJobsQuery } from '@presentation/store/api/addressJobApi';

const AddressJobPage: React.FC = () => {
    return (
        <Stack
            sx={{
                alignItems: 'center',
                mx: 3,
                pb: 2,
                mt: { xs: 8, md: 0 },
                height: '100%',
            }}
        >

            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                <Header />
            </Box>
        </Stack>
    );
};

export default AddressJobPage;