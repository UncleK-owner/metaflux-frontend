import { UnrefinedAddressRepository } from '../../domain/repositories/UnrefinedAddressRepository';
import { UnrefinedAddressData } from '../../domain/entities/UnrefinedAddressData';
import { UnrefinedAddressRemoteDataSource } from '../datasources/api/UnrefinedAddressRemoteDataSource';

export class UnrefinedAddressRepositoryImpl implements UnrefinedAddressRepository {
  private apiDataSource: UnrefinedAddressRemoteDataSource;

  constructor(apiDataSource: UnrefinedAddressRemoteDataSource) {
    this.apiDataSource = apiDataSource;
  }

  async getAllUnrefinedAddresses(): Promise<UnrefinedAddressData[]> {
    console.log("Fetching unrefined addresses from API...");
    const unrefinedAddresses = await this.apiDataSource.fetchUnrefinedAddresses();
    console.log("Unrefined addresses fetched:", unrefinedAddresses);
    return unrefinedAddresses;
  }
}
