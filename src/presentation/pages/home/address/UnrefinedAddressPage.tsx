import React, { useEffect, useState } from 'react';
import { UnrefinedAddressData } from '@domain/entities/UnrefinedAddressData';
import { UnrefinedAddressDataGrid } from '@presentation/pages/home/address/components';
import { GetAllUnrefinedAddressesUseCaseImpl } from '../../../../data/useCases/GetAllUnrefinedAddressesUseCaseImpl';
import { UnrefinedAddressRepositoryImpl } from '../../../../data/repositories/UnrefinedAddressRepositoryImpl';
import { UnrefinedAddressRemoteDataSource } from '../../../../data/datasources/api/UnrefinedAddressRemoteDataSource';

const UnrefinedAddressPage: React.FC = () => {
  const [unrefinedAddresses, setUnrefinedAddresses] = useState<UnrefinedAddressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandardizedAddresses = async () => {
      setLoading(true);
      try {
        const remoteDataSource = new UnrefinedAddressRemoteDataSource();
        const repository = new UnrefinedAddressRepositoryImpl(remoteDataSource);
        const getAllUseCase = new GetAllUnrefinedAddressesUseCaseImpl(repository);
        const data = await getAllUseCase.execute();
        setUnrefinedAddresses(data);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
        console.error("Error fetching standardized addresses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStandardizedAddresses();
  }, []);

  if (loading) {
    return <div>Loading standardized addresses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Standardized Address List</h1>
      <div style={{ height: 600, width: '100%' }}>
        <UnrefinedAddressDataGrid unrefinedAddresses={unrefinedAddresses} />
      </div>
    </div>
  );
};

export default UnrefinedAddressPage;
