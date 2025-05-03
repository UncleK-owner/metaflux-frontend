import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material';
import { store } from '@presentation/store/store';
import { Provider } from 'react-redux';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <App />
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>,
);

