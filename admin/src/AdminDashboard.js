import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Alert, Link, Box
} from '@mui/material';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchApplications = () => {
    setLoading(true);
    fetch(`${API_URL}/api/applications`)
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
    await fetch(`${API_URL}/api/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchApplications();
  };

  const exportToExcel = async () => {
    try {
      const response = await fetch(`${API_URL}/api/export/excel`);
      if (response.ok) {
        const blob = await response.blob();
        saveAs(blob, `student_applications_${new Date().toISOString().split('T')[0]}.xlsx`);
      } else {
        alert('Failed to export Excel file');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export Excel file');
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Student Accommodation Applications Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Total Applications: ${applications.length}`, 20, 40);
    
    // Prepare table data
    const tableData = applications.map(app => [
      app.full_names,
      app.student_number,
      app.institution,
      app.email,
      app.phone,
      app.status || 'pending',
      app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : ''
    ]);
    
    // Add table
    doc.autoTable({
      head: [['Name', 'Student #', 'Institution', 'Email', 'Phone', 'Status', 'Submitted']],
      body: tableData,
      startY: 50,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [66, 139, 202] },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 25 },
        2: { cellWidth: 35 },
        3: { cellWidth: 40 },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 },
        6: { cellWidth: 25 }
      }
    });
    
    // Save PDF
    doc.save(`student_applications_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
        Admin Dashboard
      </Typography>
      
      {/* Export Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        <Button 
          variant="contained" 
          color="success" 
          onClick={exportToExcel}
          disabled={loading || applications.length === 0}
          sx={{ minWidth: 120 }}
        >
          📊 Export Excel
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={exportToPDF}
          disabled={loading || applications.length === 0}
          sx={{ minWidth: 120 }}
        >
          📄 Export PDF
        </Button>
      </Box>

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
                    <Link href={`${API_URL}/${app.photo}`} target="_blank" rel="noopener noreferrer">Photo</Link><br/>
                    <Link href={`${API_URL}/${app.id_card_1}`} target="_blank" rel="noopener noreferrer">ID 1</Link><br/>
                    <Link href={`${API_URL}/${app.id_card_2}`} target="_blank" rel="noopener noreferrer">ID 2</Link><br/>
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
