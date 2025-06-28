import { UnrefinedAddressData } from '@domain/entities/UnrefinedAddressData';
import { httpProvider } from '@data/providers/AxiosHttpProvider';

export class UnrefinedAddressRemoteDataSource {
  async fetchUnrefinedAddresses(): Promise<UnrefinedAddressData[]> {
    // Fetch data from the 'standardized_addresses' collection and extract the data array
    const response = await httpProvider.get<{data: UnrefinedAddressData[]}>('directus', '/items/standardized_addresses');
    return response.data.data;
  }
}
