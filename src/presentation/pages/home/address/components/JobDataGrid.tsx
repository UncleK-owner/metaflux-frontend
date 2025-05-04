import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowId, GridFilterItem, GridFilterModel } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { RouterPath } from '@presentation/routes/RouterPath';

import { AddressJobData } from '@domain/entities/AddressJobData';

const columns: GridColDef<AddressJobData>[] = [
    { field: 'id', headerName: 'JOB-ID', width: 90 },
    {
        field: 'title',
        headerName: 'Title',
        flex: 1, // This makes the column take up the remaining space
        minWidth: 150, // Ensures a minimum width
    },
    {
        field: 'updatedAt',
        headerName: 'Updated At',
        width: 180,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 180,
    },
];

export interface JobDataGridProps {
    addressJobs: AddressJobData[];
    onRowClick?: (id: GridRowId) => void;    
}

export default function JobDataGrid({ addressJobs, onRowClick }: JobDataGridProps) {
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const navigate = useNavigate();
    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link to={RouterPath.ADDRESS_CREATE}>
                        <Button variant="contained" startIcon={<AddIcon />} sx={{ mb: 2 }}>데이터 추가</Button>
                    </Link>
                </Box>
            </Box>
            <Box sx={{ flex: 1, height: 'auto', width: '100%' }}>
                <DataGrid
                    rows={addressJobs}
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
                        width: '100%',
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
