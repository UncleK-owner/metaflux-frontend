import { UnrefinedAddressData } from '../entities/UnrefinedAddressData';

export interface UnrefinedAddressRepository {
  getAllUnrefinedAddresses(): Promise<UnrefinedAddressData[]>;
}
