import { Typography, TextField } from "@mui/material";
import { useState } from 'react';

export default function EditableText({ text, onSave }: { text: string; onSave: (newText: string) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentText, setCurrentText] = useState(text);

    const handleSave = () => {
        setIsEditing(false);
        onSave(currentText);
    };

    return isEditing ? (
        <TextField
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
            }}
            autoFocus
            fullWidth
            sx={{
                '& .MuiInputBase-input': {
                    color: 'blue', // 입력 글자 색상을 파란색으로 설정
                },
            }}
        />
    ) : (
        <Typography
            variant="body1"
            onClick={() => setIsEditing(true)}
            sx={{
                cursor: 'pointer',
                display: 'inline-block',
                color: 'black', // 글자 색상을 검정으로 설정
            }}
        >
            {currentText}
        </Typography>
    );
}