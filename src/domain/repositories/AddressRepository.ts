import { AddressData } from '../entities/AddressData';

export interface AddressRepository {
  getAll(): Promise<AddressData[]>;
}
