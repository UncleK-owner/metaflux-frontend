import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import App from './presentation/App';
import { ExternalConfigProvider } from './app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ExternalConfigProvider>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </ExternalConfigProvider>
  </React.StrictMode>,
);

