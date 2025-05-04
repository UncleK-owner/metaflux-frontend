import { AddressJobData } from '@domain/entities/AddressJobData';

export interface CreateAddressJobUseCase {
  execute(addressJob: AddressJobData): Promise<AddressJobData>;
}