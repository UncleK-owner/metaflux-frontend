import { AddressJobData } from '@domain/entities/AddressJobData';

export interface GetAddressJobByIdUseCase {
  execute(id: string): Promise<AddressJobData>;
}