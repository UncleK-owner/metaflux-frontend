import { Box, Stack, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '@presentation/layouts/components/Header';
import JobDataGrid from './components/JobDataGrid';
import { AddressJobData } from '@domain/entities/AddressJobData';
import { GetAllAddressJobsUseCase, GetAllAddressJobsUseCaseImpl } from '@domain/useCases';
import { AddressJobRemoteDataSource } from '@data/datasources/api/AddressJobRemoteDataSource';
import { GridRowId } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '@presentation/routes/RouterPath';

const AddressJobPage: React.FC = () => {
    const navigate = useNavigate();
    const [addressJobs, setAddressJobs] = useState<AddressJobData[]>([]);
    const addressJobRemoteDataSource = new AddressJobRemoteDataSource();
    const getAllAddressJobsUseCase: GetAllAddressJobsUseCase = new GetAllAddressJobsUseCaseImpl(addressJobRemoteDataSource);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllAddressJobsUseCase.execute();
            setAddressJobs(data);
        };

        fetchData();
    }, []);

    return (
        <Stack
            width={"100%"}
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
                {addressJobs.length > 0 ? (
                    <React.Fragment>
                        <Button variant="contained" onClick={() => navigate(RouterPath.ADDRESS_RECIPIENTS)} sx={{ my: 2 }}>
                            View Recipients
                        </Button>
                        <JobDataGrid
                            addressJobs={addressJobs}

                            onRowClick={(id: GridRowId) => {
                                navigate(RouterPath.ADDRESS_DETAIL.replace(":id", id.toString()));
                            }}
                        />
                    </React.Fragment>
                ) : (
                    <Typography>Loading</Typography>
                )}
            </Box> {/* Corrected closing tag position */}
        </Stack>
    );
};

export default AddressJobPage;