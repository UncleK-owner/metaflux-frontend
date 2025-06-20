import { Recipient } from '../entities/RecipientData';

export interface GetAllRecipientsUseCase {
  execute(): Promise<Recipient[]>;
}