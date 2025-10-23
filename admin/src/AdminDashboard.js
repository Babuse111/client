import React, { useState, useEffect } from 'react';
import ApplicationCard from './ApplicationCard';
import './AdminDashboard.css'; // Create this for styling
import {
  Container, Typography, Button, CircularProgress, Alert, Box
} from '@mui/material';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'accepted', 'declined'
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    setLoading(true);
    fetch(`${API_URL}/api/applications`)
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load applications');
        setLoading(false);
        console.error('Error fetching applications:', error);
      });
  };

  const handleStatusChange = (id, newStatus) => {
    // Update local state when a status changes
    setApplications(applications.map(app => 
      app.id === id ? {...app, status: newStatus} : app
    ));
  };

  const handleExportExcel = () => {
    window.location.href = `${API_URL}/api/export/excel`;
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

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
        Admin Dashboard
      </Typography>
      
      {/* Filter and Export Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="subtitle1">Filter by status:</Typography>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
          </select>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleExportExcel}
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
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
      
      {loading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
      ) : filteredApplications.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ my: 4 }}>
          {filter === 'all' ? 
            'No applications found.' : 
            `No ${filter} applications found.`}
        </Typography>
      ) : (
        <div className="applications-list">
          {filteredApplications.map(application => (
            <ApplicationCard 
              key={application.id} 
              application={application}
              onStatusChange={handleStatusChange}
              API_URL={API_URL}
            />
          ))}
        </div>
      )}
    </Container>
  );
}

export default AdminDashboard;
