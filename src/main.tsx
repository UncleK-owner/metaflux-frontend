import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Route } from 'react-router'
import AboutPage from './pages/AboutPage.tsx'
import UploadPage from './pages/file-upload/UploadPage.tsx'
import { Routes } from 'react-router'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="upload" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
