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
    const fetchUnrefinedAddresses = async () => {
      try {
        setLoading(true);
        const apiDataSource = new UnrefinedAddressRemoteDataSource();
        const repository = new UnrefinedAddressRepositoryImpl(apiDataSource);
        const useCase = new GetAllUnrefinedAddressesUseCaseImpl(repository);
        const data = await useCase.execute();
        setUnrefinedAddresses(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching unrefined addresses in component:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnrefinedAddresses();
  }, []);

  if (loading) {
    return <div>Loading unrefined addresses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Unrefined Address List</h1>
      <div style={{ height: 600, width: '100%' }}>
        <UnrefinedAddressDataGrid unrefinedAddresses={unrefinedAddresses} />
      </div>
    </div>
  );
};

export default UnrefinedAddressPage;
