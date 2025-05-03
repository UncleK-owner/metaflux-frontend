import React, { useState } from 'react';
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
import { AddressJobData } from '../../../../domain/entities/AddressJobData';

const AddressJobCreateUpdatePage: React.FC = () => {
  const navigate = useNavigate();
  const [addressJob, setAddressJob] = useState<AddressJobData>({
    id: '',
    title: '',
    description: '',
    status: 'To Do'
  });

  const saveAddressJob = async () => {
    console.log('Saving address job:', addressJob);
    // Simulate a server call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveAddressJob();
    navigate(-1);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setAddressJob(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      {/* <Grid container spacing={2}>
        <Grid size={8}>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h4">Create Address Job</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button color="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Job Name"
            name="jobName"
            value={addressJob.jobName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={addressJob.description}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={addressJob.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid> */}
    </form>
  );
};

export default AddressJobCreateUpdatePage;
