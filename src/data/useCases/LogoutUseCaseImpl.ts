import { AuthRepository } from '@domain/repositories/AuthRepository';
import { LogoutUseCase } from '@domain/useCases/LogoutUseCase';

export class LogoutUseCaseImpl implements LogoutUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(refreshToken: string): Promise<void> {
    return this.authRepository.logout(refreshToken);
  }
}
