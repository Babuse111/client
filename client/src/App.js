import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import khayaLogo from './logo-khayalethu.png';
import './App.css';
import AdminPage from './AdminPage';
import {
  Container, Typography, TextField, Button, MenuItem, Box, Paper, CircularProgress, Alert, Divider, Fade
} from '@mui/material';

function ApplicationForm() {
  const [form, setForm] = useState({
    year: '',
    id_number: '',
    gender: '',
    ethnicity: '',
    home_language: '',
    full_names: '',
    student_number: '',
    institution: '',
    email: '',
    phone: '',
    home_address: '',
    guardian_name: '',
    guardian_relationship: '',
    guardian_phone: '',
    guardian_email: ''
  });
  const [files, setFiles] = useState({ photo: null, id_card_1: null, id_card_2: null });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    Object.entries(files).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    try {
      const res = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Application submitted successfully!');
        setForm({
          year: '', id_number: '', gender: '', ethnicity: '', home_language: '',
          full_names: '', student_number: '', institution: '', email: '', phone: '',
          home_address: '', guardian_name: '', guardian_relationship: '', guardian_phone: '', guardian_email: ''
        });
        setFiles({ photo: null, id_card_1: null, id_card_2: null });
      } else {
        setMessage(data.error || 'Submission failed.');
      }
    } catch (err) {
      setMessage('Submission failed.');
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 4,
      background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blurred logo background watermark */}
      <div className="logo-bg-watermark">
        <img src={khayaLogo} alt="Khayalethu Logo Watermark" />
      </div>
      <Fade in timeout={900}>
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Paper elevation={6} sx={{ borderRadius: 5, p: { xs: 2, sm: 4 }, mt: 4, background: 'rgba(255,255,255,0.98)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <img src={khayaLogo} alt="Khayalethu Logo" style={{ width: 120, marginBottom: 12, filter: 'drop-shadow(0 2px 8px #bfa14a66)' }} />
              <Typography variant="h4" align="center" color="primary" fontWeight={800} gutterBottom letterSpacing={1}>
                Student Accommodation Application
              </Typography>
              <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 1 }}>
                Secure your spot with a few easy steps
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }}>
              <Typography variant="overline" color="primary">Personal Details</Typography>
            </Divider>
            <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" sx={{ mt: 1 }}>
              <TextField label="Year of Application" name="year" value={form.year} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Full Names" name="full_names" value={form.full_names} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="ID Number" name="id_number" value={form.id_number} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Student Number" name="student_number" value={form.student_number} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Institution" name="institution" value={form.institution} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Email" type="email" name="email" value={form.email} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Home Address" name="home_address" value={form.home_address} onChange={handleChange} required fullWidth margin="normal" />
              <TextField select label="Gender" name="gender" value={form.gender} onChange={handleChange} required fullWidth margin="normal">
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
              <TextField select label="Ethnicity" name="ethnicity" value={form.ethnicity} onChange={handleChange} required fullWidth margin="normal">
                <MenuItem value="">Select Ethnicity</MenuItem>
                <MenuItem value="African">African</MenuItem>
                <MenuItem value="Coloured">Coloured</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="White">White</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField select label="Home Language" name="home_language" value={form.home_language} onChange={handleChange} required fullWidth margin="normal">
                <MenuItem value="">Select Language</MenuItem>
                <MenuItem value="siSwati">siSwati</MenuItem>
                <MenuItem value="isiZulu">isiZulu</MenuItem>
                <MenuItem value="isiXhosa">isiXhosa</MenuItem>
                <MenuItem value="Xitsonga">Xitsonga</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <Divider sx={{ my: 3 }}>
                <Typography variant="overline" color="primary">Uploads</Typography>
              </Divider>
              <Button variant="outlined" component="label" fullWidth sx={{ my: 1, borderStyle: 'dashed', borderColor: '#bfa14a' }}>
                Upload Head-to-shoulder Photo
                <input type="file" name="photo" accept="image/*" hidden onChange={handleFileChange} required />
              </Button>
              <Button variant="outlined" component="label" fullWidth sx={{ my: 1, borderStyle: 'dashed', borderColor: '#bfa14a' }}>
                Upload ID Card 1st Side
                <input type="file" name="id_card_1" accept="image/*" hidden onChange={handleFileChange} required />
              </Button>
              <Button variant="outlined" component="label" fullWidth sx={{ my: 1, borderStyle: 'dashed', borderColor: '#bfa14a' }}>
                Upload ID Card 2nd Side
                <input type="file" name="id_card_2" accept="image/*" hidden onChange={handleFileChange} required />
              </Button>
              <Divider sx={{ my: 3 }}>
                <Typography variant="overline" color="primary">Guardian/Parent Info</Typography>
              </Divider>
              <TextField label="Full Name" name="guardian_name" value={form.guardian_name} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Relationship" name="guardian_relationship" value={form.guardian_relationship} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Phone Number" name="guardian_phone" value={form.guardian_phone} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Email Address" type="email" name="guardian_email" value={form.guardian_email} onChange={handleChange} required fullWidth margin="normal" />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontWeight: 700, fontSize: 16, mt: 3, boxShadow: 3 }} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Application'}
              </Button>
            </Box>
            {message && (
              <Fade in timeout={600}><div><Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mt: 2, textAlign: 'center' }}>{message}</Alert></div></Fade>
            )}
          </Paper>
        </Container>
      </Fade>
    </Box>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} /> {/* Updated to use AdminPage */}
        <Route path="/" element={<ApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
