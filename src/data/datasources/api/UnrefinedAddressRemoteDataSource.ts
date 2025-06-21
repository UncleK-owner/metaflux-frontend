import { UnrefinedAddressData } from '@domain/entities/UnrefinedAddressData';
import { httpProvider } from '@data/providers/AxiosHttpProvider';

export class UnrefinedAddressRemoteDataSource {
  async fetchUnrefinedAddresses(): Promise<UnrefinedAddressData[]> {
    return httpProvider.get<UnrefinedAddressData[]>('directus', 'unrefined_addresses');
  }
}
