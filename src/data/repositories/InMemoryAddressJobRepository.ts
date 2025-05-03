// src/data/repositories/InMemoryAddressJobRepository.ts
import { AddressJobRepository } from '../../../domain/repositories/AddressJobRepository';
import { AddressJobData } from '../../../domain/entities/AddressJobData';

export class InMemoryAddressJobRepository implements AddressJobRepository {
  private data: { [id: string]: AddressJobData } = {}; // In-memory storage

  async getAll(): Promise<AddressJobData[]> {
    return Object.values(this.data);
  }

  async getById(id: string): Promise<AddressJobData | null> {
    return this.data[id] || null;
  }

  async create(addressJob: AddressJobData): Promise<AddressJobData> {
    // Generate a unique ID if it's a new entry
    const id = addressJob.id || Math.random().toString(36).substring(2, 9);
    this.data[id] = { ...addressJob, id };
    return this.data[id];
  }

  async update(id: string, addressJob: AddressJobData): Promise<AddressJobData | null> {
    if (!this.data[id]) return null;
    this.data[id] = { ...addressJob, id };
    return this.data[id];
  }

  async delete(id: string): Promise<boolean> {
    if (!this.data[id]) return false;
    delete this.data[id];
    return true;
  }
}