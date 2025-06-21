import { AddressData } from "@domain/entities/AddressData";

export class AddressRemoteDataSource {
  async getAll(): Promise<AddressData[]> {
    // In a real application, you would fetch data from an API.
    // For this example, we're returning mock data.
    return [
      { id: '1', street: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' },
      { id: '2', street: '456 Oak Ave', city: 'Someplace', state: 'NY', zip: '67890' },
    ];
  }
}
