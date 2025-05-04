import { AddressJobData } from '@domain/entities/AddressJobData';
import { AddressJobRepository } from '@domain/repositories/AddressJobRepository';
import { GetAddressJobByIdUseCase } from '@domain/useCases/GetAddressJobByIdUseCase';

export class GetAddressJobByIdUseCaseImpl implements GetAddressJobByIdUseCase {
  constructor(private readonly addressJobRepository: AddressJobRepository) {}

  async execute(id: string): Promise<AddressJobData> {
    return await this.addressJobRepository.getById(id);
  }
}