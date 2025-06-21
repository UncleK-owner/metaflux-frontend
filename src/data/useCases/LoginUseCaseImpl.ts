import { User } from '@domain/entities/User';
import { AuthRepository } from '@domain/repositories/AuthRepository';
import { LoginUseCase } from '@domain/useCases/LoginUseCase';

export class LoginUseCaseImpl implements LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, password:string): Promise<{ user: User, accessToken: string, refreshToken: string }> {
    return this.authRepository.login(email, password);
  }
}
