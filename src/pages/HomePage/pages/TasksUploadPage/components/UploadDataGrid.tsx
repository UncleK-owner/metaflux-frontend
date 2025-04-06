import * as React from 'react';
import Box from '@mui/material/Box';
import UploadFileOutlined from '@mui/icons-material/UploadFileOutlined';
import { DataGrid, GridToolbarContainer, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function UploadDataGrid() {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Uploaded file:', file.name);
            // 파일 처리 로직 추가
        }
    };

    const CustomToolbar = () => (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                variant="contained"
                component="label"
                startIcon={<UploadFileOutlined />}
                sx={{ marginBottom: 1 }}
            >
                Upload File
                <input
                    type="file"
                    hidden
                    onChange={handleFileUpload}
                />
            </Button>
        </GridToolbarContainer>
    );



    return (
        <Box sx={{ height: '100%', width: '100%', mt: 2 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                slots={{
                    toolbar: CustomToolbar,
                }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
