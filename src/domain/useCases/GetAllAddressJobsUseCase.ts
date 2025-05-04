import { AddressJobRemoteDataSource } from 'src/data/datasources';
import { AddressJobData } from '../entities/AddressJobData';

export interface GetAllAddressJobsUseCase {
  execute(): Promise<AddressJobData[]>;
}

export class GetAllAddressJobsUseCaseImpl implements GetAllAddressJobsUseCase {
  private addressJobRemoteDataSource: AddressJobRemoteDataSource;

  constructor(addressJobRemoteDataSource: AddressJobRemoteDataSource) {
    this.addressJobRemoteDataSource = addressJobRemoteDataSource;
  }

  async execute(): Promise<AddressJobData[]> {
    const data = await this.addressJobRemoteDataSource.getAllAddressJobs();
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
    }));
  }
}







