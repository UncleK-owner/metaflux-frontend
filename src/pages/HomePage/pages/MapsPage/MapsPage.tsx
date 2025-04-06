import * as React from 'react';
import MainLayout from '@layouts/MainLayout';
import Header from '@layouts/components/Header';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Box } from '@mui/material';

export default function MapsPage(props: { disableCustomTheme?: boolean }) {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, height: '100vh' }}>
            <Header />
            <MapComponent />
        </Box>
    );
}

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

function MapComponent() {
    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
            {/* Add markers or other components here */}
        </GoogleMap>
    );
}

export { MapComponent };