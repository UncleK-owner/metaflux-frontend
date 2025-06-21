import { UnrefinedAddressData } from '../entities/UnrefinedAddressData';

export interface GetAllUnrefinedAddressesUseCase {
  execute(): Promise<UnrefinedAddressData[]>;
}
