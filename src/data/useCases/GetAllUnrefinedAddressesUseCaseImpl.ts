import { GetAllUnrefinedAddressesUseCase } from '../../domain/useCases/GetAllUnrefinedAddressesUseCase';
import { UnrefinedAddressData } from '../../domain/entities/UnrefinedAddressData';
import { UnrefinedAddressRepository } from '../../domain/repositories/UnrefinedAddressRepository';

export class GetAllUnrefinedAddressesUseCaseImpl implements GetAllUnrefinedAddressesUseCase {
  private repository: UnrefinedAddressRepository;

  constructor(repository: UnrefinedAddressRepository) {
    this.repository = repository;
  }

  async execute(): Promise<UnrefinedAddressData[]> {
    return this.repository.getAllUnrefinedAddresses();
  }
}
