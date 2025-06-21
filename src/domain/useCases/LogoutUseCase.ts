import { AuthRepository } from '../repositories/AuthRepository';

export interface LogoutUseCase {
  execute(refreshToken: string): Promise<void>;
}
