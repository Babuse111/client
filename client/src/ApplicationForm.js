import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';

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
  guardian_email: '',
  id_card_photo_front: null,
  id_card_photo_back: null,
  personal_photo: null
};

export default function ApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0); // 0: Welcome, 1: Personal, 2: Guardian, 3: Review
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: false });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
    setFieldErrors({ ...fieldErrors, [name]: false });
  };

  // Validation for required fields
  const validateStep = () => {
    let requiredFields = [];
    if (step === 1) {
      requiredFields = [
        'year', 'full_names', 'id_number', 'student_number', 'institution', 'email', 'phone', 'home_address', 'gender', 'ethnicity', 'home_language', 'id_card_photo_front', 'id_card_photo_back', 'personal_photo'
      ];
    }
    if (step === 2) {
      requiredFields = [
        'guardian_name', 'guardian_relationship', 'guardian_phone', 'guardian_email'
      ];
    }
    if (step === 3) {
      requiredFields = [
        'year', 'full_names', 'id_number', 'student_number', 'institution', 'email', 'phone', 'home_address', 'gender', 'ethnicity', 'home_language', 'id_card_photo_front', 'id_card_photo_back', 'personal_photo',
        'guardian_name', 'guardian_relationship', 'guardian_phone', 'guardian_email'
      ];
    }

    let newFieldErrors = {};
    let hasError = false;
    requiredFields.forEach((field) => {
      if (!form[field] || (typeof form[field] === 'string' && form[field].trim() === '')) {
        newFieldErrors[field] = true;
        hasError = true;
      }
    });
    setFieldErrors(newFieldErrors);
    setError(hasError ? 'Please fill in all required fields.' : '');
    return !hasError;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
    }
  };
  const handleBack = () => {
    setError('');
    setFieldErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateStep()) return;
    setLoading(true);
    setMessage('');
    setTimeout(() => {
      setLoading(false);
      setMessage('Application submitted successfully!');
      setForm(initialForm);
      setStep(0);
      setFieldErrors({});
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
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>,
    // Step 1: Personal Details
    <Box key="personal">
      <Divider sx={{ mb: 2 }}>
        <Typography variant="overline" color="primary">Personal Details</Typography>
      </Divider>
      <TextField select label="Year of Application" name="year" value={form.year} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.year} helperText={fieldErrors.year && "Required"} >
        <MenuItem value="">Select Year</MenuItem>
        <MenuItem value="2025">2025</MenuItem>
        <MenuItem value="2026">2026</MenuItem>
        <MenuItem value="2027">2027</MenuItem>
      </TextField>
      <TextField label="Full Names" name="full_names" value={form.full_names} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.full_names} helperText={fieldErrors.full_names && "Required"} />
      <TextField label="ID Number" name="id_number" value={form.id_number} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.id_number} helperText={fieldErrors.id_number && "Required"} />
      <TextField label="Student Number" name="student_number" value={form.student_number} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.student_number} helperText={fieldErrors.student_number && "Required"} />
      <TextField select label="Institution" name="institution" value={form.institution} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.institution} helperText={fieldErrors.institution && "Required"} >
        <MenuItem value="">Select Institution</MenuItem>
        <MenuItem value="UMP">UMP</MenuItem>
        <MenuItem value="Ehlandzeni TVET Collage">Ehlandzeni TVET Collage</MenuItem>
        <MenuItem value="University of Mpumalanga">University of Mpumalanga</MenuItem>
        <MenuItem value="Tshwane University of Technology">Tshwane University of Technology</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      <TextField label="Email" type="email" name="email" value={form.email} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.email} helperText={fieldErrors.email && "Required"} />
      <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.phone} helperText={fieldErrors.phone && "Required"} />
      <TextField label="Home Address" name="home_address" value={form.home_address} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.home_address} helperText={fieldErrors.home_address && "Required"} />
      <TextField select label="Gender" name="gender" value={form.gender} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.gender} helperText={fieldErrors.gender && "Required"} >
        <MenuItem value="">Select Gender</MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </TextField>
      <TextField select label="Ethnicity" name="ethnicity" value={form.ethnicity} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.ethnicity} helperText={fieldErrors.ethnicity && "Required"} >
        <MenuItem value="">Select Ethnicity</MenuItem>
        <MenuItem value="African">African</MenuItem>
        <MenuItem value="Coloured">Coloured</MenuItem>
        <MenuItem value="Indian">Indian</MenuItem>
        <MenuItem value="White">White</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      <TextField select label="Home Language" name="home_language" value={form.home_language} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.home_language} helperText={fieldErrors.home_language && "Required"} >
        <MenuItem value="">Select Language</MenuItem>
        <MenuItem value="siSwati">siSwati</MenuItem>
        <MenuItem value="isiZulu">isiZulu</MenuItem>
        <MenuItem value="isiXhosa">isiXhosa</MenuItem>
        <MenuItem value="Xitsonga">Xitsonga</MenuItem>
        <MenuItem value="English">English</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      {/* File upload for ID card front */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
          Upload your ID card (front) <span style={{ color: 'red' }}>*</span>
        </Typography>
        <input
          type="file"
          accept="image/*"
          name="id_card_photo_front"
          onChange={handleFileChange}
          style={{
            marginBottom: 12,
            border: fieldErrors.id_card_photo_front ? '1px solid red' : undefined,
            padding: 4,
            borderRadius: 4
          }}
        />
        {fieldErrors.id_card_photo_front && (
          <Typography variant="caption" color="error">Required</Typography>
        )}
        {form.id_card_photo_front && <Typography variant="caption" color="success.main">Selected: {form.id_card_photo_front.name}</Typography>}
      </Box>
      {/* File upload for ID card back */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
          Upload your ID card (back) <span style={{ color: 'red' }}>*</span>
        </Typography>
        <input
          type="file"
          accept="image/*"
          name="id_card_photo_back"
          onChange={handleFileChange}
          style={{
            marginBottom: 12,
            border: fieldErrors.id_card_photo_back ? '1px solid red' : undefined,
            padding: 4,
            borderRadius: 4
          }}
        />
        {fieldErrors.id_card_photo_back && (
          <Typography variant="caption" color="error">Required</Typography>
        )}
        {form.id_card_photo_back && <Typography variant="caption" color="success.main">Selected: {form.id_card_photo_back.name}</Typography>}
      </Box>
      {/* File upload for personal photo */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
          Upload your personal photo <span style={{ color: 'red' }}>*</span>
        </Typography>
        <input
          type="file"
          accept="image/*"
          name="personal_photo"
          onChange={handleFileChange}
          style={{
            marginBottom: 12,
            border: fieldErrors.personal_photo ? '1px solid red' : undefined,
            padding: 4,
            borderRadius: 4
          }}
        />
        {fieldErrors.personal_photo && (
          <Typography variant="caption" color="error">Required</Typography>
        )}
        {form.personal_photo && <Typography variant="caption" color="success.main">Selected: {form.personal_photo.name}</Typography>}
      </Box>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
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
      <TextField label="Full Name" name="guardian_name" value={form.guardian_name} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.guardian_name} helperText={fieldErrors.guardian_name && "Required"} />
      <TextField label="Relationship" name="guardian_relationship" value={form.guardian_relationship} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.guardian_relationship} helperText={fieldErrors.guardian_relationship && "Required"} />
      <TextField label="Phone Number" name="guardian_phone" value={form.guardian_phone} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.guardian_phone} helperText={fieldErrors.guardian_phone && "Required"} />
      <TextField label="Email Address" type="email" name="guardian_email" value={form.guardian_email} onChange={handleChange} required fullWidth margin="normal"
        error={!!fieldErrors.guardian_email} helperText={fieldErrors.guardian_email && "Required"} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
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
        <li><b>ID Card Photo (Front):</b> {form.id_card_photo_front ? form.id_card_photo_front.name : <span style={{color:'red'}}>Not uploaded</span>}</li>
        <li><b>ID Card Photo (Back):</b> {form.id_card_photo_back ? form.id_card_photo_back.name : <span style={{color:'red'}}>Not uploaded</span>}</li>
        <li><b>Personal Photo:</b> {form.personal_photo ? form.personal_photo.name : <span style={{color:'red'}}>Not uploaded</span>}</li>
      </ul>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
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