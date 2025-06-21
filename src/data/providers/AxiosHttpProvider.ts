import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type BaseURLNames = 'directus' | 'anotherApi';

const baseUrls: Record<BaseURLNames, string> = {
  directus: 'https://starkapin.duckdns.org/directus', // Corrected Base URL
  anotherApi: 'https://api.another.com',
};

const axiosInstances: Record<BaseURLNames, AxiosInstance> = {
  directus: axios.create({ baseURL: baseUrls.directus }),
  anotherApi: axios.create({ baseURL: baseUrls.anotherApi }),
};

const setAuthToken = (instanceName: BaseURLNames, token: string) => {
  axiosInstances[instanceName].defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

async function request<T>(instanceName: BaseURLNames, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axiosInstances[instanceName](config);
    return response;
  } catch (error) {
    console.error('Axios request error:', error);
    // Consider more specific error handling based on status codes
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
