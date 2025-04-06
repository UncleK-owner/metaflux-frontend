import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { LoadScript } from '@react-google-maps/api';
import { Routes } from "react-router";
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage, SignInPage, LandingPage } from './pages';
import { DashboardPage, MapsPage, TasksPage, TasksUploadPage } from './pages/HomePage/pages';

function App() {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // 환경 변수에서 API 키 읽기
    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <BrowserRouter>
                <Routes>
                    <Route path="/app/landing" element={<LandingPage />} />
                    <Route path="/app/sign-in" element={<SignInPage />} />
                    {/* ... */}
                    <Route path="/app/" element={<HomePage />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="maps" element={<MapsPage />} />
                        <Route path="tasks" element={<TasksPage />} />
                        <Route path="tasks/upload" element={<TasksUploadPage />} />
                        {/* Add more nested routes here if needed */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </LoadScript>
    );
}

export default App;