import { Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../layouts/components/Header';

const AddressJobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log('AddressJob ID:', id);
  }, [id]);

  return (
    <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 }, height: '100%' }}>
      <Header />

      

    </Stack>
  );
};

export default AddressJobDetailPage;