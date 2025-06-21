import { httpProvider } from '@data/providers/AxiosHttpProvider';

export class AddressJobRemoteDataSource {

  async createAddressJob(title: string, description: string): Promise<any> {
    return httpProvider.post('directus', 'address_jobs', { title, description });
  }

  async getAllAddressJobs(): Promise<any[]> {
    return httpProvider.get('directus', 'address_jobs?sort=id&direction=DESC&page=1&size=10');
  }

  async getAddressJobById(id: string): Promise<any> {
    return httpProvider.get('directus', `address_jobs/${id}`);
  }

  async updateAddressJob(id: string, title: string, description: string): Promise<any> {
    return httpProvider.put('directus', `address_jobs/${id}`, { title, description });
  }

  async deleteAddressJob(id: string): Promise<void> {
    return httpProvider.delete('directus', `address_jobs/${id}`);
  }
}
