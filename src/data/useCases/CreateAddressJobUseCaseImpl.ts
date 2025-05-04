import { AddressJobData } from '@domain/entities/AddressJobData';
import { AddressJobRepository } from '@domain/repositories/AddressJobRepository';
import { CreateAddressJobUseCase } from '@domain/useCases/CreateAddressJobUseCase';

export class CreateAddressJobUseCaseImpl implements CreateAddressJobUseCase {
  constructor(private readonly addressJobRepository: AddressJobRepository) {}

  async execute(addressJob: AddressJobData): Promise<AddressJobData> {
    return this.addressJobRepository.create(addressJob);
  }
}