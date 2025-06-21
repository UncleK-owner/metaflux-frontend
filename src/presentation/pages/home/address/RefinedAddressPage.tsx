import React, { useEffect, useState } from 'react';
import { AddressData } from '@domain/entities/AddressData';
import { AddressDataGrid } from '@presentation/pages/home/address/components';
import { GetAllAddressesUseCaseImpl } from '../../../../data/useCases/GetAllAddressesUseCaseImpl';
import { AddressRepositoryImpl } from '../../../../data/repositories/AddressRepositoryImpl';
import { AddressRemoteDataSource } from '../../../../data/datasources/api/AddressRemoteDataSource';
import { useExternalConfig } from '../../../../app/contexts/ExternalConfigContext';
import { httpProvider } from '../../../../data/providers/AxiosHttpProvider';

const RefinedAddressPage: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { authToken } = useExternalConfig();

  useEffect(() => {
    if (authToken) {
      httpProvider.setAuthToken('directus', authToken);
    }
  }, [authToken]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const apiDataSource = new AddressRemoteDataSource();
        const repository = new AddressRepositoryImpl(apiDataSource);
        const useCase = new GetAllAddressesUseCaseImpl(repository);
        const data = await useCase.execute();
        setAddresses(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching addresses in component:", err);
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchAddresses();
    }
  }, [authToken]);

  if (loading) {
    return <div>Loading addresses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Refined Address List</h1>
      <div style={{ height: 600, width: '100%' }}>
        <AddressDataGrid addresses={addresses} />
      </div>
    </div>
  );
};

export default RefinedAddressPage;
