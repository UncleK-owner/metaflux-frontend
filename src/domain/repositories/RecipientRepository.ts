import { Recipient } from '../entities/RecipientData';

export interface RecipientRepository {
  getAllRecipients(): Promise<Recipient[]>;
}
