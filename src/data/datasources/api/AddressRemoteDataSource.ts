import { AddressData } from "@domain/entities/AddressData";
import { httpProvider } from "@data/providers/AxiosHttpProvider";

export class AddressRemoteDataSource {
  async getAll(): Promise<AddressData[]> {
    return httpProvider.get<AddressData[]>('directus', 'refined_addresses');
  }
}
