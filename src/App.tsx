import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes } from "react-router";
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage, SignInPage, DashboardPage, MapsPage } from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={<HomePage />} />
                <Route path="/app/sign-in" element={<SignInPage />} />
                <Route path="/app/dashboard" element={<DashboardPage />} />
                <Route path="/app/dashboard/maps" element={<MapsPage />} />
                {/* ... */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;