import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function NotFound() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" color="error">404 - Page Not Found</Typography>    
    </Container>
  );
}

export default NotFound;