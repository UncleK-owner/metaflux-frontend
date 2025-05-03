import { LoadScript } from '@react-google-maps/api';
import { Routes } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage, SignInPage, LandingPage } from './presentation/pages';
import { DashboardPage, MapsPage, AddressJobPage, AddressJobDetailPage, AddressJobCreateUpdatePage } from './presentation/pages/home';
import { NotFoundPage } from './presentation/pages/common';
import PricingPage from './presentation/pages/landing/pricing/PricingPage';
import { RouterPath } from './presentation/routes/RouterPath';

const App: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // 환경 변수에서 API 키 읽기
    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <BrowserRouter>
                <Routes>
                    <Route path={RouterPath.LANDING} element={<LandingPage />} />
                    <Route path={RouterPath.PRICING} element={<PricingPage />} />
                    <Route path={RouterPath.SIGN_IN} element={<SignInPage />} />
                    <Route path={RouterPath.ROOT_APP} element={<HomePage />}>
                        <Route index element={<DashboardPage />} />
                        <Route path={RouterPath.DASHBOARD_INDEX} element={<DashboardPage />} />
                        <Route path={RouterPath.MAPS_INDEX} element={<MapsPage />} />
                        <Route path={RouterPath.ADDRESS_INDEX} element={<AddressJobPage />} />
                        <Route path={RouterPath.ADDRESS_CREATE} element={<AddressJobCreateUpdatePage />} />
                        <Route path={RouterPath.ADDRESS_EDIT} element={<AddressJobCreateUpdatePage />} />
                        <Route path={RouterPath.ADDRESS_DETAIL} element={<AddressJobDetailPage />} />

                        {/* Add more nested routes here if needed */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </LoadScript>
    );
}

export default App;