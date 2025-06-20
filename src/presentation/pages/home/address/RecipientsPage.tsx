import React, { useEffect, useState } from 'react';
import { Recipient } from '../../../../domain/entities/RecipientData';
import { GetAllRecipientsUseCaseImpl } from '../../../../data/useCases/GetAllRecipientsUseCaseImpl'; // Import Use Case Implementation
import { RecipientRepositoryImpl } from '../../../../data/repositories/RecipientRepositoryImpl'; // Keep Repository Import
import { RecipientRemoteDataSource } from '../../../../data/datasources/api/RecipientRemoteDataSource'; // Keep Data Source Import

const RecipientsPage: React.FC = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        setLoading(true);
        const apiDataSource = new RecipientRemoteDataSource(); // Consider using Dependency Injection
        const repository = new RecipientRepositoryImpl(apiDataSource);
        const useCase = new GetAllRecipientsUseCaseImpl(repository); // Instantiate Use Case
        const data = await useCase.execute();
        setRecipients(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching recipients in component:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipients();
  }, []);

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
