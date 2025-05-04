export class AddressJobRemoteDataSource {
  private readonly baseUrl = 'https://starkapin.duckdns.org/webhook';

  async createAddressJob(title: string, description: string): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create address job: ${response.statusText}`);
    }

    return response.json();
  }

  async getAllAddressJobs(): Promise<any[]> {
    const url = `${this.baseUrl}/address/job/items?sort=id&direction=DESC&page=1&size=10`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch all address jobs: ${response.statusText}`);
    }

    return response.json();
  }

  async getAddressJobById(id: string): Promise<any> {
      const url = `${this.baseUrl}/${id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch address job: ${response.statusText}`);
      }
  
      return response.json();
    }

  async updateAddressJob(id: string, title: string, description: string): Promise<any> {
    const url = `${this.baseUrl}/address/job/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update address job: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteAddressJob(id: string): Promise<void> {
    const url = `${this.baseUrl}/address/job/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete address job: ${response.statusText}`);
    }
  }
}