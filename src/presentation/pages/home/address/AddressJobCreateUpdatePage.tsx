import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { AddressJobData } from '@domain/entities/AddressJobData';
import { useParams } from 'react-router-dom';

const AddressJobCreateUpdatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [addressJob, setAddressJob] = useState<AddressJobData>({
    title: '',
    description: '',
    status: 'To Do',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  useEffect(() => {
    if (id) {
      setAddressJob(prev => ({ ...prev, id }));
    }
  }, [id]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const { name, value } = event.target;
    setAddressJob(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>

        <Typography variant="h4">Create Address Job</Typography>
        <Button color="secondary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>



        <TextField
          fullWidth
          label="Title"
          name="title"
          value={addressJob.title}
        />

        <FormControl fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            value={addressJob.status || 'To Do'}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </form>
  );
};

export default AddressJobCreateUpdatePage;
