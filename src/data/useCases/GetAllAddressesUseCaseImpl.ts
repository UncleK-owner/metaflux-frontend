import { AddressData } from '@domain/entities/AddressData';
import { AddressRepository } from '@domain/repositories/AddressRepository';
import { GetAllAddressesUseCase } from '@domain/useCases/GetAllAddressesUseCase';

export class GetAllAddressesUseCaseImpl implements GetAllAddressesUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(): Promise<AddressData[]> {
    return this.addressRepository.getAll();
  }
}
