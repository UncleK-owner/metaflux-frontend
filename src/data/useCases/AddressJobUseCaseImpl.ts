import { AddressJobUseCase } from '../../domain/index';
import { AddressJobRepository } from '../../domain/repositories/AddressJobRepository';
import { AddressJobData } from '../../domain/index';

export class AddressJobUseCaseImpl implements AddressJobUseCase {
  private addressJobRepository: AddressJobRepository;

  constructor(addressJobRepository: AddressJobRepository) {
    this.addressJobRepository = addressJobRepository;
  }

  async getAllAddressJobs(): Promise<AddressJobData[]> {
    return this.addressJobRepository.getAll();
  }

  async getAddressJobById(id: string): Promise<AddressJobData | null> {
    return this.addressJobRepository.getById(id);
  }

  async createAddressJob(addressJob: AddressJobData): Promise<AddressJobData> {
    return this.addressJobRepository.create(addressJob);
  }

  async updateAddressJob(id: string, addressJob: AddressJobData): Promise<AddressJobData | null> {
    return this.addressJobRepository.update(id, addressJob);
  }

  async deleteAddressJob(id: string): Promise<boolean> {
    return this.addressJobRepository.delete(id);
  }
}