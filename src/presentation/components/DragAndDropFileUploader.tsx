import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx";


export default function DragAndDropFileUploader() {

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);


    const handleExcelFile = async (file: File) => {
        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            console.log("엑셀 데이터 파싱 성공:", jsonData);
            // 여기서 jsonData를 처리하거나 반환할 수 있습니다.
            return jsonData;
        } catch (error) {
            console.error("엑셀 파일 파싱 실패:", error);
            alert("엑셀 파일 파싱 실패!");
            return null;
        }
    };

    const handleFileUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('task', file);

            const response = await axios.post(
                'https://starkapin.duckdns.org/webhook/tasks/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('파일 업로드 성공:', response.data);
            alert('파일 업로드 성공!');
            setUploadedFile(file);
        } catch (error) {
            console.error('파일 업로드 실패:', error);
            alert('파일 업로드 실패!');
        }
    };

    const handleFileRemove = () => {
        setUploadedFile(null);
    };

    return <Box
        sx={{
            border: '2px dashed gray',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            cursor: 'pointer',
            mb: 2,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={async (e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length > 1) {
                alert('하나의 파일만 업로드할 수 있습니다.');
                return;
            }
            const file = e.dataTransfer.files[0];
            handleExcelFile(file);

        }}
        onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = async (e: any) => {
                const file = e.target.files[0];
                handleExcelFile(file);
            };
            input.click();
        }}
    >
        <Typography variant="body1" color="gray">
            여기에 파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요.
        </Typography>
    </Box>;
}