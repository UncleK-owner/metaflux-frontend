import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import * as XLSX from "xlsx";
import { useState } from "react";

export default function DragAndDropFileUploader() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleExcelFile = async (file: File | null) => {
        if (!file) {
            console.error("No file selected.");
            return;
        }
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = e.target?.result;
            if (!data) {
                console.error("Failed to read file data.");
                return;
            }

            const workbook = XLSX.read(data, { type: "array" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            console.log("Excel Data:", jsonData);
            //await handleFileUpload(file);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleFileUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("task", file);

            const response = await axios.post(
                "https://starkapin.duckdns.org/webhook/tasks/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("파일 업로드 성공:", response.data);
            alert("파일 업로드 성공!");
            setUploadedFile(file);
        } catch (error) {
            console.error("파일 업로드 실패:", error);
            alert("파일 업로드 실패!");
        };
        const handleFileRemove = () => {
            setUploadedFile(null);
        };
    }

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
                alert("하나의 파일만 업로드할 수 있습니다.");
                return;
            }
            const file = e.dataTransfer.files[0];
            handleExcelFile(file);
        }}
        onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.onchange = async (e: any) => {
                const file = e.target.files[0];
                await handleExcelFile(file);
            };
            input.click();
        }}
    >
        <Typography variant="body1" color="gray">
            여기에 파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요.
        </Typography>
    </Box>;
}