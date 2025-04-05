import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes } from "react-router";
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage, SignInPage, DashboardPage } from './pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={<HomePage />} />
                <Route path="/app/sign-in" element={<SignInPage />} />
                <Route path="/app/dashboard" element={<DashboardPage />} />
                {/* ... */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;