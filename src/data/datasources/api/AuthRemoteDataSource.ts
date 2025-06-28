import { httpProvider } from '@data/providers/AxiosHttpProvider';
import { User } from '@domain/entities/User';

interface AuthResponse {
  data: {
    access_token: string;
    expires: number;
    refresh_token: string;
  }
}

interface UserResponse {
  data: User;
}

export class AuthRemoteDataSource {
  async login(email: string, password: string): Promise<{ user: User, accessToken: string, refreshToken: string }> {
    const authResponse = await httpProvider.post<AuthResponse>('directus', '/auth/login', { email, password });
    const { access_token, refresh_token } = authResponse.data.data;
    
    httpProvider.setAuthToken('directus', access_token);
    
    const userResponse = await httpProvider.get<UserResponse>('directus', '/users/me');
    
    return { user: userResponse.data.data, accessToken: access_token, refreshToken: refresh_token };
  }

  async logout(refreshToken: string): Promise<void> {
    await httpProvider.post('directus', '/auth/logout', { refresh_token: refreshToken });
    httpProvider.setAuthToken('directus', '');
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; expires: number; refreshToken: string }> {
    const response = await httpProvider.post<{ data: { access_token: string; expires: number; refresh_token: string } }>('directus', '/auth/refresh', { refresh_token: refreshToken });
    const { access_token, expires, refresh_token: newRefreshToken } = response.data.data;
    httpProvider.setAuthToken('directus', access_token);
    return { accessToken: access_token, expires, refreshToken: newRefreshToken };
  }

  async requestPasswordReset(email: string): Promise<void> {
    await httpProvider.post('directus', '/auth/password/request', { email });
  }

  async resetPassword(token: string, password: string):Promise<void> {
    await httpProvider.post('directus', '/auth/password/reset', { token, password });
  }

  async getCurrentUser(): Promise<User | null> {
    const response = await httpProvider.get<UserResponse>('directus', '/users/me');
    return response.data.data;
  }
}
