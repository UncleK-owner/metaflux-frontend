import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Navigate } from 'react-router'
import { Route } from 'react-router'
import AboutPage from './pages/AboutPage.tsx'
import UploadPage from './pages/file-upload/UploadPage.tsx'
import { Routes } from 'react-router'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/app" element={<App />} />
        <Route path="*" element={<Navigate to="/app" />} />
        <Route path="/app/about" element={<AboutPage />} />
        <Route path="/app/upload" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
