
import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Divider
} from '@mui/material';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = () => {
    setLoading(true);
  fetch('https://student-accomodation-g42p.onrender.com/api/applications')
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load applications');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
  await fetch(`https://student-accomodation-g42p.onrender.com/api/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchApplications();
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', my: 5, px: 2 }}>
      <Paper elevation={6} sx={{ borderRadius: 5, p: { xs: 2, sm: 4 }, background: 'rgba(255,255,255,0.98)' }}>
        <Typography variant="h4" align="center" color="primary" fontWeight={800} gutterBottom letterSpacing={1} sx={{ mb: 2 }}>
          Admin Dashboard
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {loading && <Typography align="center">Loading...</Typography>}
        {error && <Typography align="center" color="error">{error}</Typography>}
        {!loading && !error && (
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, boxShadow: '0 2px 16px #e0e0e0', background: '#fff' }}>
            <Table sx={{ minWidth: 1200 }}>
              <TableHead>
                <TableRow sx={{ background: '#f5f5f5' }}>
                  <TableCell><b>Year</b></TableCell>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Gender</b></TableCell>
                  <TableCell><b>Ethnicity</b></TableCell>
                  <TableCell><b>Home Language</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Institution</b></TableCell>
                  <TableCell><b>Student #</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell><b>Home Address</b></TableCell>
                  <TableCell><b>Guardian</b></TableCell>
                  <TableCell><b>Uploads</b></TableCell>
                  <TableCell><b>Submitted</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map(app => (
                  <TableRow key={app.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{app.year}</TableCell>
                    <TableCell>{app.full_names}</TableCell>
                    <TableCell>{app.gender}</TableCell>
                    <TableCell>{app.ethnicity}</TableCell>
                    <TableCell>{app.home_language}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.institution}</TableCell>
                    <TableCell>{app.student_number}</TableCell>
                    <TableCell>{app.phone}</TableCell>
                    <TableCell>{app.home_address}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>{app.guardian_name}</Typography>
                      <Typography variant="caption">({app.guardian_relationship})</Typography><br/>
                      <Typography variant="body2">{app.guardian_phone}</Typography><br/>
                      <Typography variant="body2">{app.guardian_email}</Typography>
                    </TableCell>
                    <TableCell>
                      <a href={`/${app.photo}`} target="_blank" rel="noopener noreferrer">Photo</a><br/>
                      <a href={`/${app.id_card_1}`} target="_blank" rel="noopener noreferrer">ID 1</a><br/>
                      <a href={`/${app.id_card_2}`} target="_blank" rel="noopener noreferrer">ID 2</a>
                    </TableCell>
                    <TableCell>{app.submitted_at ? new Date(app.submitted_at).toLocaleString() : ''}</TableCell>
                    <TableCell>
                      <Chip
                        label={app.status || 'pending'}
                        color={app.status === 'accepted' ? 'success' : app.status === 'declined' ? 'error' : 'warning'}
                        sx={{ fontWeight: 700, textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      {app.status !== 'accepted' && (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{ mb: 1, mr: 1, borderRadius: 2, fontWeight: 700 }}
                          onClick={() => updateStatus(app.id, 'accepted')}
                        >Accept</Button>
                      )}
                      {app.status !== 'declined' && (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ borderRadius: 2, fontWeight: 700 }}
                          onClick={() => updateStatus(app.id, 'declined')}
                        >Decline</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
  
}

export default AdminDashboard;
