import { AddressJobRepository } from '@domain/repositories/AddressJobRepository';
import { DeleteAddressJobUseCase } from '@domain/useCases/DeleteAddressJobUseCase';

export class DeleteAddressJobUseCaseImpl implements DeleteAddressJobUseCase {
  constructor(private readonly addressJobRepository: AddressJobRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.addressJobRepository.delete(id);
  }
}