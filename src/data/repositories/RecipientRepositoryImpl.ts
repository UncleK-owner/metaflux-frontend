import { RecipientRepository } from '../../domain/repositories/RecipientRepository';
import { Recipient } from '../../domain/entities/RecipientData';
import { RecipientRemoteDataSource } from '../datasources/api/RecipientRemoteDataSource';

export class RecipientRepositoryImpl implements RecipientRepository {
  private apiDataSource: RecipientRemoteDataSource;

  constructor(apiDataSource: RecipientRemoteDataSource) {
    this.apiDataSource = apiDataSource;
  }

  async getAllRecipients(): Promise<Recipient[]> {
    console.log("Fetching recipients from API...");
    const recipients = await this.apiDataSource.fetchRecipients();
    console.log("Recipients fetched:", recipients);
    return recipients;
  }
}
