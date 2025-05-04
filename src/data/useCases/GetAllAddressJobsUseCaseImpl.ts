import { GetAllAddressJobsUseCase } from '@domain/useCases/GetAllAddressJobsUseCase';
import { AddressJobData } from '@domain/entities/AddressJobData';
import { AddressJobRepository } from '@domain/repositories/AddressJobRepository';

export class GetAllAddressJobsUseCaseImpl implements GetAllAddressJobsUseCase {
  constructor(private readonly addressJobRepository: AddressJobRepository) {}

  async execute(): Promise<AddressJobData[]> {
    return this.addressJobRepository.getAll();
  }
}