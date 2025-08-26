import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import AdminPage from './AdminDashboard';
import {
  Box,
  Fade,
  Container,
  Paper,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import khayaLogo from './logo-khayalethu.png';
import './App.css';

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
  const [step, setStep] = useState(0); // 0: Welcome, 1: Personal, 2: Uploads, 3: Guardian, 4: Review

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

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
  const res = await fetch('https://student-accomodation-g42p.onrender.com/api/apply', {
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
        setStep(0);
      } else {
        setMessage(data.error || 'Submission failed.');
      }
    } catch (err) {
      setMessage('Submission failed.');
    }
    setLoading(false);
  };

  // Step content
  const stepContent = [
    // Step 0: Welcome
    <Box key="welcome" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
      <img src={khayaLogo} alt="Khayalethu Logo" style={{ width: 120, marginBottom: 18, filter: 'drop-shadow(0 2px 8px #bfa14a66)' }} />
      <Typography variant="h4" align="center" color="primary" fontWeight={800} gutterBottom letterSpacing={1}>
        Welcome to Khayalethu Student Accommodation
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 3 }}>
        Secure your spot with a few easy steps. Click Next to begin your application.
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
    </Box>,
    // Step 2: Uploads
    <Box key="uploads">
      <Divider sx={{ mb: 2 }}>
        <Typography variant="overline" color="primary">Uploads</Typography>
      </Divider>
      <Button variant="outlined" component="label" fullWidth sx={{ my: 1, borderStyle: 'dashed', borderColor: '#bfa14a' }}>
        Upload Head-to-shoulder Photo
        <input type="file" name="photo" accept="image/*" hidden onChange={handleFileChange} required={step === 2} />
      </Button>
      <Button variant="outlined" component="label" fullWidth sx={{ my: 1, borderStyle: 'dashed', borderColor: '#bfa14a' }}>
        Upload ID Card 1st Side
        <input type="file" name="id_card_1" accept="image/*" hidden onChange={handleFileChange} required={step === 2} />
      </Button>
      <Button variant="outlined" component="label" fullWidth sx={{ my: 1, borderStyle: 'dashed', borderColor: '#bfa14a' }}>
        Upload ID Card 2nd Side
        <input type="file" name="id_card_2" accept="image/*" hidden onChange={handleFileChange} required={step === 2} />
      </Button>
    </Box>,
    // Step 3: Guardian/Parent Info
    <Box key="guardian">
      <Divider sx={{ mb: 2 }}>
        <Typography variant="overline" color="primary">Guardian/Parent Info</Typography>
      </Divider>
      <TextField label="Full Name" name="guardian_name" value={form.guardian_name} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Relationship" name="guardian_relationship" value={form.guardian_relationship} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Phone Number" name="guardian_phone" value={form.guardian_phone} onChange={handleChange} required fullWidth margin="normal" />
      <TextField label="Email Address" type="email" name="guardian_email" value={form.guardian_email} onChange={handleChange} required fullWidth margin="normal" />
    </Box>,
    // Step 4: Review & Submit
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
        <li><b>Photo:</b> {files.photo ? files.photo.name : 'Not uploaded'}</li>
        <li><b>ID Card 1:</b> {files.id_card_1 ? files.id_card_1.name : 'Not uploaded'}</li>
        <li><b>ID Card 2:</b> {files.id_card_2 ? files.id_card_2.name : 'Not uploaded'}</li>
      </ul>
    </Box>
  ];

  return (
    <>
      <div className="logo-bg-watermark" aria-hidden="true">
        <img src={khayaLogo} alt="Khayalethu Logo Watermark" draggable="false" />
      </div>
      <Box sx={{
        minHeight: '100vh',
        py: 4,
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <Fade in timeout={900}>
          <Container maxWidth="sm">
            <Paper elevation={6} sx={{ borderRadius: 5, p: { xs: 2, sm: 4 }, mt: 4, background: 'rgba(255,255,255,0.98)' }}>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {stepContent[step]}
                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  {step > 0 && step < 5 && (
                    <Button variant="outlined" color="primary" onClick={handleBack} disabled={loading} sx={{ minWidth: 100 }}>Back</Button>
                  )}
                  {step < stepContent.length - 1 && step > 0 && (
                    <Button variant="contained" color="primary" onClick={handleNext} sx={{ minWidth: 100, fontWeight: 700 }}>Next</Button>
                  )}
                  {step === stepContent.length - 1 && (
                    <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 120, fontWeight: 700 }} disabled={loading}>
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Application'}
                    </Button>
                  )}
                </Box>
              </form>
              {message && (
                <Fade in timeout={600}><div><Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mt: 2, textAlign: 'center' }}>{message}</Alert></div></Fade>
              )}
            </Paper>
          </Container>
        </Fade>
      </Box>
    </>
  );
}

// Wrapper component for HomePage to use useNavigate inside Router context
function HomeWithNav() {
  const navigate = useNavigate();
  return <HomePage onApply={() => navigate('/apply')} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/" element={<HomeWithNav />} />
      </Routes>
    </Router>
  );
}

export default App;
