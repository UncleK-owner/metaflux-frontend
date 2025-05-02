import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'JOB-ID', width: 90 },
    {
        field: 'title',
        headerName: 'Title',
        flex: 1, // This makes the column take up the remaining space
        minWidth: 200, // Ensures a minimum width
    },
    {
        field: 'status',
        headerName: 'Status',
        type: 'string',
        width: 110,
    },
    {
        field: 'updatedAt',
        headerName: 'Updated At',
        width: 150,
        sortable: true,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 150,
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
    },
];

const rows = [
    { id: 1, title: '2025-04-30 Route 10-1 배송목록', status: 'waiting', updatedAt: '2025-05-01 15:39:11', createdAt: '2025-04-30 15:11:22' },
    { id: 2, title: '2025-05-01 Route 12-3 배송목록', status: 'in-progress', updatedAt: '2025-05-02 10:15:45', createdAt: '2025-05-01 09:30:00' },
    { id: 3, title: '2025-05-02 Route 15-7 배송목록', status: 'completed', updatedAt: '2025-05-02 18:45:22', createdAt: '2025-05-02 08:20:10' },
    { id: 4, title: '2025-05-03 Route 8-2 배송목록', status: 'waiting', updatedAt: '2025-05-03 14:12:33', createdAt: '2025-05-03 07:50:00' },
    { id: 5, title: '2025-05-04 Route 20-5 배송목록', status: 'in-progress', updatedAt: '2025-05-04 16:30:00', createdAt: '2025-05-04 09:00:00' },
    { id: 6, title: '2025-05-05 Route 3-9 배송목록', status: 'completed', updatedAt: '2025-05-05 19:00:00', createdAt: '2025-05-05 08:45:00' },
    { id: 7, title: '2025-05-06 Route 14-4 배송목록', status: 'waiting', updatedAt: '2025-05-06 12:00:00', createdAt: '2025-05-06 07:30:00' },
    { id: 8, title: '2025-05-07 Route 6-1 배송목록', status: 'in-progress', updatedAt: '2025-05-07 15:45:00', createdAt: '2025-05-07 08:00:00' },
    { id: 9, title: '2025-05-08 Route 18-8 배송목록', status: 'completed', updatedAt: '2025-05-08 20:30:00', createdAt: '2025-05-08 09:15:00' },
    { id: 10, title: '2025-05-09 Route 11-6 배송목록', status: 'waiting', updatedAt: '2025-05-09 13:00:00', createdAt: '2025-05-09 07:45:00' },
    { id: 11, title: '2025-05-10 Route 9-3 배송목록', status: 'in-progress', updatedAt: '2025-05-10 17:15:00', createdAt: '2025-05-10 08:30:00' },
];

export default function JobDataGrid() {
    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, textAlign: 'right' }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => { }} // 빈 함수 호출
                    sx={{ mb: 2 }} // DataGrid 위에 여백 추가
                >
                    데이터 추가
                </Button>
            </Box>
            <Box sx={{ flex: 1, height: 'auto' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20, 50]}
                    checkboxSelection // 체크박스 선택을 사용하더라도 테두리를 제거할 수 있습니다.
                    disableRowSelectionOnClick // 행 클릭 시 선택되는 기본 동작 비활성화 (선택 동작 방식을 바꾸고 싶다면 고려)
                    sx={{
                        // DataGrid의 Root 스타일에 접근
                        '& .MuiDataGrid-row.Mui-selected': {
                            // 선택된 행에 적용되는 스타일
                            outline: 'none', // 기본 포커스/선택 테두리 제거
                            // box-shadow가 적용되는 경우 이를 제거하거나 변경
                            boxShadow: 'none',
                            // 배경색을 변경하고 싶다면 주석 해제
                            // backgroundColor: 'transparent',
                            // ':hover': { // 선택된 상태에서 호버 시 스타일
                            //   backgroundColor: 'rgba(0, 0, 0, 0.04)', // MUI 기본 호버 색상 또는 원하는 색상
                            // },
                        },
                        // 행에 포커스가 갔을 때의 스타일 (키보드 네비게이션 시 나타나는 파란 테두리)
                        '& .MuiDataGrid-row--withBorderColor': {
                            outline: 'none',
                        },
                        // 셀에 포커스가 갔을 때의 스타일 (셀 단위 포커스 테두리)
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                    }}
                    onRowClick={(params) => {
                        const selectedRowId = params.id;
                        // Replace with your navigation logic
                        console.log(`Navigate to details of row with ID: ${selectedRowId}`);
                    }}
                    slots={{
                        toolbar: () => null,
                    }}
                />
            </Box>
        </Box>
    );
}
