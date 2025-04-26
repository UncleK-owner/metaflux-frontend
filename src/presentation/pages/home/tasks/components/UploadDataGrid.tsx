import * as React from 'react';
import Box from '@mui/material/Box';
import UploadFileOutlined from '@mui/icons-material/UploadFileOutlined';
import { DataGrid, GridToolbarContainer, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'file_name', headerName: 'File Name', width: 200 },
    { field: 'file_extension', headerName: 'File Extension', width: 150 },
    { field: 'file_size', headerName: 'File Size', width: 150 },
    { field: 'uploaded_at', headerName: 'Uploaded At', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
];

export default function UploadDataGrid() {
    interface RowData {
        id: number;
        file_name: string;
        file_extension: string;
        file_size: number;
        uploaded_at: string;
        status: string;
    }

    const [rows, setRows] = React.useState<RowData[]>([]);

    // Fetch tasks from the server
    const fetchTasks = React.useCallback(() => {
        fetch('https://starkapin.duckdns.org/webhook/tasks/uploaded?limit=50', {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch uploaded tasks');
                }
                return response.json();
            })
            .then((data) => {
                const updatedRows = Array.isArray(data)
                    ? data.map((item: any) => ({
                        id: item.id,
                        file_name: item.file_name,
                        file_extension: item.file_extension,
                        file_size: item.file_size,
                        uploaded_at: item.uploaded_at,
                        status: item.status,
                    }))
                    : [];
                setRows(updatedRows);
            })
            .catch((error) => {
                console.error('Error fetching uploaded tasks:', error);
            });
    }, []);

    // Handle file upload
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Uploaded file:', file.name);
            const formData = new FormData();
            formData.append('task', file);

            fetch('https://starkapin.duckdns.org/webhook/tasks/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('File upload failed');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('File uploaded successfully:', data);
                    fetchTasks(); // Fetch tasks after successful upload
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        }
    };

    // Fetch tasks on component mount
    React.useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const CustomToolbar = () => (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                variant="contained"
                component="label"
                startIcon={<UploadFileOutlined />}
                sx={{ marginBottom: 1 }}
            >
                Upload File
                <input type="file" hidden onChange={handleFileUpload} />
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