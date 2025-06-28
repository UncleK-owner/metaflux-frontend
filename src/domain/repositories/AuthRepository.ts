import { User } from '../entities/User';

export interface AuthRepository {
  login(email: string, password: string): Promise<{ user: User, accessToken: string, refreshToken: string }>;
  logout(refreshToken: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<{ accessToken: string, expires: number, refreshToken: string }>;
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, password: string): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
