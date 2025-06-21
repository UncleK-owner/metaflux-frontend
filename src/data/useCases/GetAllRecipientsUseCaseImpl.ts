import { GetAllRecipientsUseCase } from '../../domain/useCases/GetAllRecipientsUseCase';
import { Recipient } from '../../domain/entities/RecipientData';
import { RecipientRepository } from '../../domain/repositories/RecipientRepository';

export class GetAllRecipientsUseCaseImpl implements GetAllRecipientsUseCase {
  private repository: RecipientRepository;

  constructor(repository: RecipientRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Recipient[]> {
    return this.repository.getAllRecipients();
  }
}
