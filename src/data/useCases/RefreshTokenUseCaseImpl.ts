import { AuthRepository } from '@domain/repositories/AuthRepository';
import { RefreshTokenUseCase } from '@domain/useCases/RefreshTokenUseCase';

export class RefreshTokenUseCaseImpl implements RefreshTokenUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(refreshToken: string): Promise<{ accessToken: string, expires: number }> {
    return this.authRepository.refreshToken(refreshToken);
  }
}
