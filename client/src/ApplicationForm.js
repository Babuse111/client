import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const initialForm = {
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
};

export default function ApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0); // 0: Welcome, 1: Personal, 2: Guardian, 3: Review
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage('Application submitted successfully!');
      setForm(initialForm);
      setStep(0);
    }, 1500);
  };

  const stepContent = [
    // Step 0: Welcome
    <Box key="welcome" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
      <Typography variant="h4" align="center" color="primary" fontWeight={800} gutterBottom>
        Welcome to the Application Form
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 3 }}>
        Click Next to begin your application.
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={handleNext} sx={{ mt: 2, fontWeight: 700, px: 5 }}>Next</Button>
    </Box>,
    // Step 1: Personal Details
    <Box key="personal">
      <Divider sx={{ mb: 2 }}>
        <Typography variant="overline" color="primary">Personal Details</Typography>
      </Divider>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleBack}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
      </Box>
    </Box>,
    // Step 2: Guardian/Parent Info
    <Box key="guardian">
      <Divider sx={{ mb: 2 }}>
        <Typography variant="overline" color="primary">Guardian/Parent Info</Typography>
      </Divider>
      <TextField label="Full Name" name="guardian_name" value={form.guardian_name} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Relationship" name="guardian_relationship" value={form.guardian_relationship} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Phone Number" name="guardian_phone" value={form.guardian_phone} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Email Address" type="email" name="guardian_email" value={form.guardian_email} onChange={handleChange} required fullWidth margin="normal" />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleBack}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
      </Box>
    </Box>,
    // Step 3: Review & Submit
    <Box key="review" sx={{ py: 2 }}>
      <Divider sx={{ mb: 2 }}>
        <Typography variant="overline" color="primary">Review & Submit</Typography>
      </Divider>
      <Typography variant="body1" sx={{ mb: 2 }}>Please review your information before submitting.</Typography>
      <ul style={{ fontSize: 16, lineHeight: 1.7 }}>
        <li><b>Year:</b> {form.year}</li>
        <li><b>Full Names:</b> {form.full_names}</li>
        <li><b>ID Number:</b> {form.id_number}</li>
        <li><b>Student Number:</b> {form.student_number}</li>
        <li><b>Institution:</b> {form.institution}</li>
        <li><b>Email:</b> {form.email}</li>
        <li><b>Phone:</b> {form.phone}</li>
        <li><b>Home Address:</b> {form.home_address}</li>
        <li><b>Gender:</b> {form.gender}</li>
        <li><b>Ethnicity:</b> {form.ethnicity}</li>
        <li><b>Home Language:</b> {form.home_language}</li>
        <li><b>Guardian Name:</b> {form.guardian_name}</li>
        <li><b>Guardian Relationship:</b> {form.guardian_relationship}</li>
        <li><b>Guardian Phone:</b> {form.guardian_phone}</li>
        <li><b>Guardian Email:</b> {form.guardian_email}</li>
      </ul>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleBack}>Back</Button>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Application'}
        </Button>
      </Box>
      {message && (
        <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mt: 2, textAlign: 'center' }}>{message}</Alert>
      )}
    </Box>
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={6} sx={{ borderRadius: 5, p: { xs: 2, sm: 4 }, mt: 4, background: 'rgba(255,255,255,0.98)' }}>
        <form onSubmit={handleSubmit}>
          {stepContent[step]}
        </form>
      </Paper>
    </Container>
  );
}
