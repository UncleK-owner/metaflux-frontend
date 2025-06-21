import { AddressData } from '../entities/AddressData';
import { AddressRepository } from '../repositories/AddressRepository';

export interface GetAllAddressesUseCase {
  execute(): Promise<AddressData[]>;
}
