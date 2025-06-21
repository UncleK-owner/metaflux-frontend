import { AuthRepository } from '@domain/repositories/AuthRepository';
import { ResetPasswordUseCase } from '@domain/useCases/ResetPasswordUseCase';

export class ResetPasswordUseCaseImpl implements ResetPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string, password: string): Promise<void> {
    return this.authRepository.resetPassword(token, password);
  }
}
