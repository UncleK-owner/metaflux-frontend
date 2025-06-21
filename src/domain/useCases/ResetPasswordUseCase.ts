import { AuthRepository } from '../repositories/AuthRepository';

export interface ResetPasswordUseCase {
  execute(token: string, password: string): Promise<void>;
}
