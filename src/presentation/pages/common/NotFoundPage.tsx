import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFoundPage: React.FC = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            textAlign="center"
        >
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
                Sorry, the page you are looking for does not exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/app"
            >
                Go back to Home
            </Button>
        </Box>
    );
};

export default NotFoundPage;