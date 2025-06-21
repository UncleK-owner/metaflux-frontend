import React, { useEffect, useState } from 'react';
import { Recipient } from '../../../../domain/entities/RecipientData';
import { GetAllRecipientsUseCaseImpl } from '../../../../data/useCases/GetAllRecipientsUseCaseImpl';
import { RecipientRepositoryImpl } from '../../../../data/repositories/RecipientRepositoryImpl';
import { RecipientRemoteDataSource } from '../../../../data/datasources/api/RecipientRemoteDataSource';
import { useExternalConfig } from '../../../../app/contexts/ExternalConfigContext';
import { httpProvider } from '../../../../data/providers/AxiosHttpProvider';

const RecipientsPage: React.FC = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { authToken } = useExternalConfig();

  useEffect(() => {
    if (authToken) {
      httpProvider.setAuthToken('directus', authToken);
    }
  }, [authToken]);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        setLoading(true);
        const apiDataSource = new RecipientRemoteDataSource();
        const repository = new RecipientRepositoryImpl(apiDataSource);
        const useCase = new GetAllRecipientsUseCaseImpl(repository);
        const data = await useCase.execute();
        setRecipients(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching recipients in component:", err);
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchRecipients();
    }
  }, [authToken]);

  if (loading) {
    return <div>Loading recipients...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Recipients List</h1>
      {recipients.length === 0 ? (
        <p>No recipients found.</p>
      ) : (
        <ul>
          {recipients.map(recipient => (
            <li key={recipient.id}>
              {recipient.name} (ID: {recipient.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipientsPage;
