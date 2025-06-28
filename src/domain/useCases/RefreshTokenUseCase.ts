import { AuthRepository } from '../repositories/AuthRepository';

export interface RefreshTokenUseCase {
  execute(refreshToken: string): Promise<{ accessToken: string, expires: number, refreshToken: string }>;
}
