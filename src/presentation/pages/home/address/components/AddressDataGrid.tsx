import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AddressData } from '@domain/entities/AddressData';

interface AddressDataGridProps {
  address: AddressData[];
}

const AddressDataGrid: React.FC<AddressDataGridProps> = ({ address }) => {
  const columns: GridColDef[] = [
    { field: 'userName', headerName: 'User Name', width: 150 },
    { field: 'address1', headerName: 'Address 1', width: 250 },
    { field: 'address2', headerName: 'Address 2', width: 250 },
    { field: 'postalCode', headerName: 'Postal Code', width: 150 },
    { field: 'isRefined', headerName: 'Refined', width: 100, type: 'boolean' },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={address.map((detail) => ({ ...detail, id: detail.id }))}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default AddressDataGrid;