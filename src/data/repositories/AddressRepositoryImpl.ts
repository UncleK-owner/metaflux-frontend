import { AddressData } from '@domain/entities/AddressData';
import { AddressRepository } from '@domain/repositories/AddressRepository';
import { AddressRemoteDataSource } from '@data/datasources/api/AddressRemoteDataSource';

export class AddressRepositoryImpl implements AddressRepository {
  constructor(private readonly remoteDataSource: AddressRemoteDataSource) {}

  async getAll(): Promise<AddressData[]> {
    return this.remoteDataSource.getAll();
  }
}
