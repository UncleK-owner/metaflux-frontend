import { User } from '@domain/entities/User';
import { AuthRepository } from '@domain/repositories/AuthRepository';
import { GetCurrentUserUseCase } from '@domain/useCases/GetCurrentUserUseCase';

export class GetCurrentUserUseCaseImpl implements GetCurrentUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<User | null> {
    return this.authRepository.getCurrentUser();
  }
}
