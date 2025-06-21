import { Recipient } from '@domain/entities/RecipientData';
import { httpProvider } from '@data/providers/AxiosHttpProvider';

export class RecipientRemoteDataSource {
  async fetchRecipients(): Promise<Recipient[]> {
    return httpProvider.get<Recipient[]>('directus', 'address_normailize_job_failed_recipients');
  }
}
