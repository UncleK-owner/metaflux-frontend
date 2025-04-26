import { Box, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MarkerData } from 'src/domain/entities/MarkerData';
import { MapComponent } from './components/MapComponent';
import DragAndDropFileUploader from '@components/DragAndDropFileUploader';
import EditableText from '@presentation/components/EditTableText';

const items = [
    { id: 1, name: '장소 1', description: '설명 1' },
    { id: 2, name: '장소 2', description: '설명 2' },
    { id: 3, name: '장소 3', description: '설명 3' },
    { id: 4, name: '장소 4', description: '설명 4' },
    { id: 5, name: '장소 5', description: '설명 5' },
    { id: 6, name: '장소 6', description: '설명 6' },
    { id: 7, name: '장소 7', description: '설명 7' },
    { id: 8, name: '장소 8', description: '설명 8' },
    { id: 9, name: '장소 9', description: '설명 9' },
    { id: 10, name: '장소 10', description: '설명 10' },
    // ... 더 많은 항목
];

function useMarkers() {
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    useEffect(() => {
        async function fetchMarkers() {
            try {
                const response = await axios.get('https://starkapin.duckdns.org/webhook/markers');

                const data = response.data
                    .filter((item: any) => {
                        if (item.latitude === null || item.longitude === null) {
                            console.warn(`Skipping marker with id ${item.id} due to null latitude or longitude`);
                            return false;
                        }
                        return true;
                    })
                    .map((item: any) => ({
                        id: item.id,
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }));

                data.forEach((marker: MarkerData) => {
                    if (marker.latitude === null || marker.longitude === null) {
                        console.warn(`Skipping marker with id ${marker.id} due to null latitude or longitude`);
                    } else {
                        console.log(`Marker ID: ${marker.id}, Latitude: ${marker.latitude}, Longitude: ${marker.longitude}`);
                    }
                });

                console.log('Fetched markers:', data);
                setMarkers(data);
            } catch (error) {
                console.error('Error fetching markers:', error);
            }
        }

        fetchMarkers();
    }, []);

    return markers;
}



export default function MapsPage(props: { disableCustomTheme?: boolean }) {
    const markers = useMarkers();

    const headerStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 10,
    };

    return <Box
        sx={{
            position: 'relative', // 자식 absolute 요소의 기준
            width: '100%',
            height: '100vh', // 예시: 뷰포트 전체 높이
            overflow: 'hidden', // 컨테이너를 넘어가는 내용은 숨김
        }}
    >
        {/* 지도 컴포넌트 */}
        <MapComponent markers={markers} />

        {/* 지도 영역 제목 
        <Typography variant="h4" color="black" sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
            지도 영역
        </Typography>
        */}

        {/* 목록 오버레이 영역 */}
        <Paper
            sx={{
                position: 'absolute', // 부모 relative 요소 (.MuiBox-root) 기준 위치
                top: 0, // 상단에 붙임
                left: 0, // 왼쪽에 붙임
                width: '30%', // 전체 너비의 30% 차지
                height: '100%', // 전체 높이 차지
                zIndex: 10, // 지도보다 위에 표시 (지도의 z-index보다 큰 값)
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // 투명한 흰색 배경
                overflowY: 'auto', // 내용이 넘칠 경우 스크롤
                boxShadow: 3, // 그림자 효과 (MUI 기본값)
                p: 2, // 내부 패딩 (MUI spacing 단위)
            }}
        >
            <Typography variant="h6" component="div" color='black' sx={{ mb: 1 }}>
                <EditableText
                    text="장소 목록"
                    onSave={(newText) => console.log('Saved text:', newText)}
                />
            </Typography>


            <DragAndDropFileUploader />


            <List>
                {items.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.name} secondary={item.description} />
                    </ListItem>
                ))}
            </List>
        </Paper>

    </Box>;


}