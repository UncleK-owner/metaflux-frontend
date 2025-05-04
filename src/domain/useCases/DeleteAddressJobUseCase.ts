import { AddressJobData } from '@domain/entities/AddressJobData';

export interface DeleteAddressJobUseCase {
  execute(id: string): Promise<boolean>;
}