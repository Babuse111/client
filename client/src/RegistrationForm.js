import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Divider, MenuItem, Alert, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

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


function RegistrationForm() {
  const location = useLocation();
  const defaultYear = location.state && location.state.year ? location.state.year : '';
  const [form, setForm] = useState({ ...initialForm, year: defaultYear });
  const [step, setStep] = useState(1); // Start at Personal Details
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      setStep(1);
    }, 1500);
  };

  const stepContent = [
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
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
    <Box key="review" sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Divider sx={{ mb: 2, width: '100%' }}>
        <Typography variant="overline" color="primary">Review & Submit</Typography>
      </Divider>
      <Typography variant="body1" sx={{ mb: 2 }}>Please review your information before submitting.</Typography>
      <ul style={{ fontSize: 16, lineHeight: 1.7, textAlign: 'left', width: '100%', maxWidth: 400 }}>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, width: '100%', maxWidth: 400 }}>
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
    <Box sx={{ minHeight: '100vh', background: '#f5f8f7', display: 'flex', flexDirection: 'column' }}>
      {/* Top Blue Bar with Logo and Title (matches HomePage) */}
      <Box sx={{ bgcolor: '#00bcd4', color: '#fff', py: 2, px: 0, borderRadius: '0 0 24px 24px', mb: 0, boxShadow: 2 }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}> 
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" style={{ width: 56, marginRight: 16 }} />
            <Typography variant="h5" fontWeight={900} letterSpacing={2} sx={{ textShadow: '0 2px 8px #0097a7' }}>
              Khayalethu Student Living
            </Typography>
          </Box>
          <Button variant="contained" color="warning" size="large" sx={{ fontWeight: 700, borderRadius: 3 }} onClick={() => navigate(0)}>
            APPLY FOR 2026
          </Button>
        </Box>
      </Box>
  <Box sx={{ width: '90%', maxWidth: 1200, bgcolor: 'white', borderRadius: 3, boxShadow: 3, overflow: 'hidden', display: 'flex', minHeight: 600, mx: 'auto', mt: 4 }}>
        {/* Left Side - Image and Slogan */}
        <Box sx={{ flex: 1, bgcolor: '#16232e', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
          <img
            src={
              step === 1
                ? process.env.PUBLIC_URL + '/applaying_person.png'
                : step === 2
                ? process.env.PUBLIC_URL + '/done_application1.png'
                : process.env.PUBLIC_URL + '/done_application.png'
            }
            alt="Application Step"
            style={{ width: '100%', maxWidth: 350, borderRadius: 12, marginBottom: 32 }}
          />
          <Typography variant="h3" sx={{ color: '#00e6ff', fontWeight: 400, mb: 2, textAlign: 'left', width: '100%' }}>
            The rest<br />of your<br />life starts here
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 300, mt: 2, textAlign: 'left', width: '100%' }}>
            thrive<br />STUDENT LIVING
          </Typography>
        </Box>
        {/* Right Side - Application Form */}
        <Box sx={{ flex: 2, p: { xs: 2, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#16232e' }}>
            Application Form
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: '#6c757d' }}>
            Please fill in your details to apply.
          </Typography>
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <form onSubmit={handleSubmit}>
              {stepContent[step - 1]}
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RegistrationForm;
