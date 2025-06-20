import { Recipient } from '../../../domain/entities/RecipientData';

export class RecipientRemoteDataSource {
  async fetchRecipients(): Promise<Recipient[]> {
    console.log("Calling recipient API...");

    const url = '/api/directus/items/address_normailize_job_failed_recipients';
    const token = 'GAgVtFNmNoAdyH3BQK3OZcBRaMGvQvxt';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Needed for some APIs, may not be strictly required for GET
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();

      // Assuming the API response has a 'data' field containing the array of recipients
      if (data && Array.isArray(data.data)) {
        return data.data as Recipient[]; // Assuming the structure matches Recipient interface
      } else {
        throw new Error("Invalid API response format: 'data' array not found.");
      }
    } catch (error) {
      console.error("Error fetching recipients:", error);
      throw error; // Re-throw the error for handling in the repository
    }
  }
}
