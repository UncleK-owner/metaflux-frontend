import { UnrefinedAddressData } from '../../../domain/entities/UnrefinedAddressData';

export class UnrefinedAddressRemoteDataSource {
  async fetchUnrefinedAddresses(): Promise<UnrefinedAddressData[]> {
    console.log("Calling unrefined address API...");

    const url = '/api/directus/items/unrefined_addresses';
    const token = 'GAgVtFNmNoAdyH3BQK3OZcBRaMGvQvxt';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        return data.data as UnrefinedAddressData[];
      } else {
        throw new Error("Invalid API response format: 'data' array not found.");
      }
    } catch (error) {
      console.error("Error fetching unrefined addresses:", error);
      throw error;
    }
  }
}
