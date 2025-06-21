import { AuthRepository } from '@domain/repositories/AuthRepository';
import { RequestPasswordResetUseCase } from '@domain/useCases/RequestPasswordResetUseCase';

export class RequestPasswordResetUseCaseImpl implements RequestPasswordResetUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string): Promise<void> {
    return this.authRepository.requestPasswordReset(email);
  }
}
