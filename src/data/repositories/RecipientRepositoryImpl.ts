import { RecipientRepository } from '../../domain/repositories/RecipientRepository';
import { Recipient } from '../../domain/entities/RecipientData';

// Assume RecipientApiDataSource interface exists or define a placeholder
interface RecipientApiDataSource {
  fetchRecipients(): Promise<Recipient[]>;
}

export class RecipientRepositoryImpl implements RecipientRepository {
  private apiDataSource: RecipientApiDataSource;

  constructor(apiDataSource: RecipientApiDataSource) {
    this.apiDataSource = apiDataSource;
  }

  async getAllRecipients(): Promise<Recipient[]> {
    console.log("Fetching recipients from API...");
    const recipients = await this.apiDataSource.fetchRecipients();
    console.log("Recipients fetched:", recipients);
    return recipients;
  }
}