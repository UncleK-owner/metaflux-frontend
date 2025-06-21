++++++import { User } from '../entities/User';
import { AuthRepository } from '../repositories/AuthRepository';

export interface LoginUseCase {
  execute(email: string, password: string): Promise<{ user: User, accessToken: string, refreshToken: string }>;
}
