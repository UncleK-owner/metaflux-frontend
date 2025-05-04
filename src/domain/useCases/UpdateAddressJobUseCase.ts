import { AddressJobData } from '@domain/entities/AddressJobData';

export interface UpdateAddressJobUseCase {
  execute(id: string, addressJob: AddressJobData): Promise<AddressJobData>;
}