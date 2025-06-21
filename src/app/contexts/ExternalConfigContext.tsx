// src/app/contexts/ExternalConfigContext.tsx
import React, { createContext, useContext } from 'react';

interface ExternalConfig {
  googleMapsApiKey: string;
  metaFluxUrl: string;
  authToken: string;
  // 다른 API 키도 추가 가능
}

const ExternalConfigContext = createContext<ExternalConfig | undefined>(undefined);

export const ExternalConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config: ExternalConfig = {
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    metaFluxUrl: import.meta.env.META_FLUX_URL,
    authToken: import.meta.env.VITE_AUTH_TOKEN,
  };

  return (
    <ExternalConfigContext.Provider value={config}>
      {children}
    </ExternalConfigContext.Provider>
  );
};

export const useExternalConfig = () => {
  const context = useContext(ExternalConfigContext);
  if (!context) throw new Error('useExternalConfig must be used within ExternalConfigProvider');
  return context;
};
