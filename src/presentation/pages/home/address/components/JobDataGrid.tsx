import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowId, GridFilterItem, GridFilterModel } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { RouterPath } from '../../../../routes/RouterPath';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { AddressJobData } from '@domain/entities/AddressJobData';

const columns: GridColDef<Row>[] = [
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

interface Row {
    id: string;
    title: string;
    status: string;
    updatedAt: string;
    createdAt: string;
}

const getFilterItem = (field: string, value: string): GridFilterItem => {
    return {
        id: 0,
        field,
        operator: 'contains',
        value
    }
};

const getFilterModel = (value: string): GridFilterModel => ({
    items: ['id', 'title', 'status', 'updatedAt', 'createdAt'].map(field => getFilterItem(field, value))
});

interface JobDataGridProps {
    addressJobs: AddressJobData[];
    rowLink?: (id: GridRowId) => { pathname: string };
}

export default function JobDataGrid({ addressJobs, rowLink }: JobDataGridProps) {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isFilterMode, setIsFilterMode] = React.useState(false);
    const filterModel: GridFilterModel = isFilterMode && searchTerm.length > 0 ? getFilterModel(searchTerm) : { items: [] };
    const toggleFilterMode = () => {
        setIsFilterMode(!isFilterMode);
        setSearchTerm('');
    };

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {isFilterMode && <TextField
                    label="검색"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    sx={{ mr: 2 }}
                />}
                <Box sx={{ display: 'flex', gap: 1 }}>                    
                    <Button
                        variant="contained"
                        startIcon={<FilterAltIcon />}
                        sx={{ mb: 2 }}
                        onClick={toggleFilterMode}
                    >                        
                        Filter
                    </Button>
                    <Link to={RouterPath.ADDRESS_CREATE}> 

                        <Button variant="contained" startIcon={<AddIcon />} sx={{ mb: 2 }}>데이터 추가</Button>                                      
                    </Link>
                </Box>
            </Box>
            <Box sx={{ flex: 1, height: 'auto' }}>
                <DataGrid
                    filterMode="server"
                    filterModel={filterModel}
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
                        if (rowLink) {                            
                            navigate(rowLink(params.id.toString()));
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
