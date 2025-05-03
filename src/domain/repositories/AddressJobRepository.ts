import { AddressJobData } from "@domain/entities/AddressJobData";

export interface AddressJobRepository {
  getAll(): Promise<AddressJobData[]>;
  getById(id: string): Promise<AddressJobData | null>;
  create(addressJob: AddressJobData): Promise<AddressJobData>;
  update(id: string, addressJob: AddressJobData): Promise<AddressJobData | null>;
  delete(id: string): Promise<boolean>;
}