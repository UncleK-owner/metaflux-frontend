import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AddressData } from '@domain/entities/AddressData';

interface AddressDataGridProps {
  addresses: AddressData[];
}

const AddressDataGrid: React.FC<AddressDataGridProps> = ({ addresses }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'street', headerName: 'Street', width: 250 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 100 },
    { field: 'zip', headerName: 'Zip Code', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={addresses.map((address) => ({ ...address, id: address.id }))}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default AddressDataGrid;
