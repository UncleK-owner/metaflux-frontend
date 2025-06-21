import { User } from '@domain/entities/User';
import { AuthRepository } from '@domain/repositories/AuthRepository';
import { AuthRemoteDataSource } from '../datasources/api/AuthRemoteDataSource';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly remoteDataSource: AuthRemoteDataSource) {}

  async login(email: string, password: string): Promise<{ user: User, accessToken: string, refreshToken: string }> {
    return this.remoteDataSource.login(email, password);
  }

  async logout(refreshToken: string): Promise<void> {
    return this.remoteDataSource.logout(refreshToken);
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string, expires: number }> {
    return this.remoteDataSource.refreshToken(refreshToken);
  }

  async requestPasswordReset(email: string): Promise<void> {
    return this.remoteDataSource.requestPasswordReset(email);
  }

  async resetPassword(token: string, password: string): Promise<void> {
    return this.remoteDataSource.resetPassword(token, password);
  }

  async getCurrentUser(): Promise<User | null> {
    return this.remoteDataSource.getCurrentUser();
  }
}
