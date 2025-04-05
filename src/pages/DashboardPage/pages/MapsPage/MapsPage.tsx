import * as React from 'react';
import MainLayout from '../../../../layouts/MainLayout';
import Header from '../../../../layouts/components/Header';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

export default function MapsPage(props: { disableCustomTheme?: boolean }) {
    return (
        <MainLayout {...props}>
            <Header />
            <MapComponent />
        </MainLayout>
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
        <LoadScript googleMapsApiKey="AIzaSyAEXt4TDhvP5EekhMZ1FcxT1ad2A7o0A2g">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                {/* Add markers or other components here */}
            </GoogleMap>
        </LoadScript>
    );
}

export { MapComponent };