import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type BaseURLNames = 'directus' | 'n8n' |'anotherApi';

const baseUrls: Record<BaseURLNames, string> = {
  directus: 'https://starkapin.duckdns.org/directus',
  n8n: 'https://starkapin.duckdns.org',
  anotherApi: 'https://api.another.com', // Example of another base URL
};

const axiosInstances: Record<BaseURLNames, AxiosInstance> = {
  directus: axios.create({ baseURL: baseUrls.directus }),
  n8n: axios.create({ baseURL: baseUrls.n8n }),
  anotherApi: axios.create({ baseURL: baseUrls.anotherApi }),
};

const setAuthToken = (instanceName: BaseURLNames, token: string) => {
  axiosInstances[instanceName].defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

async function request<T>(instanceName: BaseURLNames, config: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstances[instanceName](config);
    // Directus wraps responses in a 'data' object. We extract it here.
    // This is now more specific to the 'directus' instance.
    if (instanceName === 'directus' && response.data && (response.data as any).data) {
        return (response.data as any).data;
    }
    return response.data;
  } catch (error) {
    // You can add more robust error handling here
    console.error('Axios request error:', error);
    throw error;
  }
}

export const httpProvider = {
  setAuthToken,
  get: <T>(instanceName: BaseURLNames, url: string, config?: AxiosRequestConfig) => request<T>(instanceName, { ...config, method: 'GET', url }),
  post: <T>(instanceName: BaseURLNames, url: string, data?: any, config?: AxiosRequestConfig) => request<T>(instanceName, { ...config, method: 'POST', url, data }),
  put: <T>(instanceName: BaseURLNames, url: string, data?: any, config?: AxiosRequestConfig) => request<T>(instanceName, { ...config, method: 'PUT', url, data }),
  delete: <T>(instanceName: BaseURLNames, url: string, config?: AxiosRequestConfig) => request<T>(instanceName, { ...config, method: 'DELETE', url }),
};
