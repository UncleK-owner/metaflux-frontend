import * as React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';

import { UnrefinedAddressData } from '@domain/entities/UnrefinedAddressData';

const columns: GridColDef<UnrefinedAddressData>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'rawAddress',
        headerName: 'Raw Address',
        flex: 1,
        minWidth: 250,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 180,
    },
];

export interface UnrefinedAddressDataGridProps {
    unrefinedAddresses: UnrefinedAddressData[];
    onRowClick?: (id: GridRowId) => void;
}

export default function UnrefinedAddressDataGrid({ unrefinedAddresses, onRowClick }: UnrefinedAddressDataGridProps) {
    const rows = unrefinedAddresses?.map((address) => ({ ...address, id: address.id })) || [];
    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, height: 'auto', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 20, 50]}
                    disableRowSelectionOnClick
                    sx={{
                        width: '100%',
                        '& .MuiDataGrid-row.Mui-selected': {
                            outline: 'none',
                            boxShadow: 'none',
                        },
                        '& .MuiDataGrid-row--withBorderColor': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                    }}
                    onRowClick={(params: any) => {
                        if (onRowClick) {
                            return onRowClick(params.id);
                        }
                    }}
                    slots={{
                        toolbar: () => null,
                    }}
                />
            </Box>
        </Box>
    );
}
