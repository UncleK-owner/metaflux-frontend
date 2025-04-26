import * as React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MarkerData } from 'src/domain/entities/MarkerData';

function MapComponent({ markers }: { markers: MarkerData[] }) {
    // 마커 옵션을 메모이제이션
    const markerOptions = React.useMemo(() => ({
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#FF0000',
            fillOpacity: 1,
            strokeWeight: 1,
        },
    }), []);

    // Google Map 옵션
    const mapOptions = React.useMemo(() => ({
        disableDefaultUI: true, // 기본 UI 숨기기
        zoomControl: true, // 줌 컨트롤만 활성화
        mapTypeControl: false, // 지도 유형 선택 숨기기
        fullscreenControl: false, // 전체 화면 버튼 숨기기
        streetViewControl: false, // 스트리트 뷰 컨트롤 숨기기
        scaleControl: false, // 스케일 컨트롤 숨기기
    }), []);

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} options={mapOptions}>
            {React.useMemo(
                () =>
                    markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            options={markerOptions} // 메모이제이션된 옵션 사용
                        />
                    )),
                [markers, markerOptions] // markers와 markerOptions가 변경될 때만 다시 렌더링
            )}
        </GoogleMap>
    );
}

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 33.4919844536046,
    lng: 126.512701653406,
};


export { MapComponent };