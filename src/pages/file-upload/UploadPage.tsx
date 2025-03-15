import React, { useState } from 'react';
const UPLOAD_URL = 'https://starkapin.duckdns.org/metaflux/api/upload';
const UploadPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };
    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('No file selected');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                setUploadStatus('File uploaded successfully');
            } else {
                setUploadStatus('File upload failed');
            }
        } catch (error) {
            setUploadStatus('Error uploading file');
        }
    };
    return (
        <div>
            <h1>File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default UploadPage;