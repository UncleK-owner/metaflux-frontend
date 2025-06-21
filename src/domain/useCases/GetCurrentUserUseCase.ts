import { User } from '../entities/User';
import { AuthRepository } from '../repositories/AuthRepository';

export interface GetCurrentUserUseCase {
  execute(): Promise<User | null>;
}
