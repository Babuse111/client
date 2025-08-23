import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Alert, Link
} from '@mui/material';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/applications')
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
    await fetch(`http://localhost:5000/api/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchApplications();
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
        Admin Dashboard
      </Typography>
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: '#f5f5f5' }}>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Institution</TableCell>
                <TableCell>Student #</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Guardian</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map(app => (
                <TableRow key={app.id}>
                  <TableCell>{app.full_names}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.institution}</TableCell>
                  <TableCell>{app.student_number}</TableCell>
                  <TableCell>{app.phone}</TableCell>
                  <TableCell>
                    {app.guardian_name} ({app.guardian_relationship})<br/>
                    {app.guardian_phone}<br/>
                    {app.guardian_email}
                  </TableCell>
                  <TableCell>{app.submitted_at ? new Date(app.submitted_at).toLocaleString() : ''}</TableCell>
                  <TableCell>
                    <Typography sx={{
                      color: app.status === 'accepted' ? 'green' : app.status === 'declined' ? 'red' : '#bfa14a',
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}>
                      {app.status || 'pending'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Link href={`/${app.photo}`} target="_blank" rel="noopener noreferrer">Photo</Link><br/>
                    <Link href={`/${app.id_card_1}`} target="_blank" rel="noopener noreferrer">ID 1</Link><br/>
                    <Link href={`/${app.id_card_2}`} target="_blank" rel="noopener noreferrer">ID 2</Link><br/>
                    {app.status !== 'accepted' && (
                      <Button variant="contained" color="success" size="small" sx={{ m: 0.5 }} onClick={() => updateStatus(app.id, 'accepted')}>Accept</Button>
                    )}
                    {app.status !== 'declined' && (
                      <Button variant="contained" color="error" size="small" sx={{ m: 0.5 }} onClick={() => updateStatus(app.id, 'declined')}>Decline</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default AdminDashboard;
