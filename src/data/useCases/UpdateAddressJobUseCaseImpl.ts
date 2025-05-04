import { UpdateAddressJobUseCase } from '@domain/useCases/UpdateAddressJobUseCase';
import { AddressJobData } from '@domain/entities/AddressJobData';
import { AddressJobRepository } from '@domain/repositories/AddressJobRepository';

export class UpdateAddressJobUseCaseImpl implements UpdateAddressJobUseCase {
  constructor(private readonly addressJobRepository: AddressJobRepository) {}

  async execute(id: string, addressJob: AddressJobData): Promise<AddressJobData> {
    return await this.addressJobRepository.update(id, addressJob);
  }
}