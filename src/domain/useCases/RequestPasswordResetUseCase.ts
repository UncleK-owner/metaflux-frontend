import { AuthRepository } from '../repositories/AuthRepository';

export interface RequestPasswordResetUseCase {
  execute(email: string): Promise<void>;
}
