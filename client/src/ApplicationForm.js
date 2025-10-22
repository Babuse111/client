import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

const ApplicationForm = () => {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  // Validation functions
  const validateIDNumber = (id) => {
    const idRegex = /^\d{13}$/;
    return idRegex.test(id);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateStudentNumber = (studentNum) => {
    const studentRegex = /^[A-Za-z0-9]{3,20}$/;
    return studentRegex.test(studentNum);
  };

  const validateNames = (name) => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    return nameRegex.test(name.trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFieldErrors((prev) => ({ ...prev, [name]: '' }));

    let processedValue = value;
    let fieldErr = '';

    switch (name) {
      case 'id_number':
        processedValue = value.replace(/\D/g, '').slice(0, 13);
        if (processedValue && !validateIDNumber(processedValue)) {
          if (processedValue.length < 13) {
            fieldErr = 'ID number must be 13 digits';
          }
        }
        break;

      case 'phone':
      case 'guardian_phone':
        processedValue = value.replace(/\D/g, '').slice(0, 10);
        if (processedValue && !validatePhone(processedValue)) {
          if (processedValue.length < 10) {
            fieldErr = 'Phone number must be 10 digits starting with 0';
          } else if (!processedValue.startsWith('0')) {
            fieldErr = 'Phone number must start with 0';
          }
        }
        break;

      case 'email':
      case 'guardian_email':
        if (processedValue && !validateEmail(processedValue)) {
          fieldErr = 'Please enter a valid email address';
        }
        break;

      case 'student_number':
        processedValue = value.replace(/[^A-Za-z0-9]/g, '').slice(0, 20);
        if (processedValue && !validateStudentNumber(processedValue)) {
          if (processedValue.length < 3) {
            fieldErr = 'Student number must be at least 3 characters';
          }
        }
        break;

      case 'full_names':
      case 'guardian_name':
        processedValue = value.replace(/[^A-Za-z\s]/g, '');
        if (processedValue && !validateNames(processedValue)) {
          fieldErr = 'Name must contain only letters and spaces';
        }
        break;

      default:
        break;
    }

    setForm({ ...form, [name]: processedValue });

    if (fieldErr) {
      setFieldErrors((prev) => ({ ...prev, [name]: fieldErr }));
    }
  };

  const validateStep = () => {
    const errors = {};

    if (step === 1) {
      const requiredFields = [
        'year', 'full_names', 'id_number', 'student_number', 'institution',
        'email', 'phone', 'home_address', 'gender', 'ethnicity', 'home_language'
      ];

      requiredFields.forEach((field) => {
        if (!form[field] || form[field].trim() === '') {
          errors[field] = 'This field is required';
        }
      });

      if (form.id_number && !validateIDNumber(form.id_number)) {
        errors.id_number = 'ID number must be exactly 13 digits';
      }

      if (form.email && !validateEmail(form.email)) {
        errors.email = 'Please enter a valid email address';
      }

      if (form.phone && !validatePhone(form.phone)) {
        errors.phone = 'Phone number must be 10 digits starting with 0';
      }

      if (form.student_number && !validateStudentNumber(form.student_number)) {
        errors.student_number = 'Student number must be 3-20 alphanumeric characters';
      }

      if (form.full_names && !validateNames(form.full_names)) {
        errors.full_names = 'Name must contain only letters and spaces';
      }
    }

    if (step === 2) {
      const requiredFields = ['guardian_name', 'guardian_relationship', 'guardian_phone', 'guardian_email'];

      requiredFields.forEach((field) => {
        if (!form[field] || form[field].trim() === '') {
          errors[field] = 'This field is required';
        }
      });

      if (form.guardian_email && !validateEmail(form.guardian_email)) {
        errors.guardian_email = 'Please enter a valid email address';
      }

      if (form.guardian_phone && !validatePhone(form.guardian_phone)) {
        errors.guardian_phone = 'Phone number must be 10 digits starting with 0';
      }

      if (form.guardian_name && !validateNames(form.guardian_name)) {
        errors.guardian_name = 'Name must contain only letters and spaces';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    setError('');

    if (!validateStep()) {
      setError('Please fix the errors above before continuing');
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setError('');
    setFieldErrors({});
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNewApplication = () => {
    setSubmitted(false);
    setApplicationId('');
    setError('');
    setForm(initialForm);
    setFieldErrors({});
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) {
      setError('Please fix all errors before submitting');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      // Use environment variable or configuration for API URL
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/apply`, {
        method: 'POST',
        body: formData
        // You might need headers depending on your backend
        // headers: {
        //   'Accept': 'application/json'
        // }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Response was OK, now we can safely parse it
      const result = await response.json();

      setLoading(false);
      setSubmitted(true);
      setApplicationId(result.application_id || 'KHY' + Date.now());
    } catch (err) {
      console.error('Submission error:', err);
      setLoading(false);
      
      if (err.message === 'Failed to fetch') {
        setError('Unable to connect to server. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'An error occurred while submitting your application. Please try again.');
      }
    }
  };

  const steps = ['Personal Details', 'Guardian Information', 'Review & Submit'];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Box>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  color: '#ea580c',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
              >
                🏠 Khayalethu Application
              </Typography>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  color: '#ea580c',
                  mb: 1
                }}
              >
                👤 Personal Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please provide your personal information
              </Typography>
            </Box>

            <TextField
              select
              label="Year of Application"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.year}
              helperText={fieldErrors.year}
            >
              <MenuItem value="">Select Year</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
              <MenuItem value="2027">2027</MenuItem>
            </TextField>

            <TextField
              label="Full Names"
              name="full_names"
              value={form.full_names}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.full_names}
              helperText={fieldErrors.full_names || 'Enter your full name (letters and spaces only)'}
              placeholder="e.g. John Smith"
            />

            <TextField
              label="ID Number"
              name="id_number"
              value={form.id_number}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.id_number}
              helperText={fieldErrors.id_number || 'Enter your 13-digit South African ID number'}
              placeholder="e.g. 9001015009087"
              inputProps={{ maxLength: 13 }}
            />

            <TextField
              label="Student Number"
              name="student_number"
              value={form.student_number}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.student_number}
              helperText={fieldErrors.student_number || 'Enter your student number'}
              placeholder="e.g. STU12345"
            />

            <TextField
              select
              label="Institution"
              name="institution"
              value={form.institution}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.institution}
              helperText={fieldErrors.institution}
            >
              <MenuItem value="">Select Institution</MenuItem>
              <MenuItem value="UMP">UMP</MenuItem>
              <MenuItem value="Ehlandzeni TVET Collage">Ehlandzeni TVET Collage</MenuItem>
              <MenuItem value="University of Mpumalanga">University of Mpumalanga</MenuItem>
              <MenuItem value="Tshwane University of Technology">Tshwane University of Technology</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.email}
              helperText={fieldErrors.email || 'Enter a valid email address'}
              placeholder="e.g. john@example.com"
            />

            <TextField
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.phone}
              helperText={fieldErrors.phone || 'Enter 10-digit phone number starting with 0'}
              placeholder="e.g. 0123456789"
              inputProps={{ maxLength: 10 }}
            />

            <TextField
              label="Home Address"
              name="home_address"
              value={form.home_address}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              multiline
              rows={2}
              error={!!fieldErrors.home_address}
              helperText={fieldErrors.home_address}
              placeholder="Enter your full home address"
            />

            <TextField
              select
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.gender}
              helperText={fieldErrors.gender}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>

            <TextField
              select
              label="Ethnicity"
              name="ethnicity"
              value={form.ethnicity}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.ethnicity}
              helperText={fieldErrors.ethnicity}
            >
              <MenuItem value="">Select Ethnicity</MenuItem>
              <MenuItem value="African">African</MenuItem>
              <MenuItem value="Coloured">Coloured</MenuItem>
              <MenuItem value="Indian">Indian</MenuItem>
              <MenuItem value="White">White</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              select
              label="Home Language"
              name="home_language"
              value={form.home_language}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.home_language}
              helperText={fieldErrors.home_language}
            >
              <MenuItem value="">Select Language</MenuItem>
              <MenuItem value="siSwati">siSwati</MenuItem>
              <MenuItem value="isiZulu">isiZulu</MenuItem>
              <MenuItem value="isiXhosa">isiXhosa</MenuItem>
              <MenuItem value="Xitsonga">Xitsonga</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1,
                  background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                  boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #c2610c 0%, #dc2626 100%)',
                    boxShadow: '0 6px 20px rgba(217, 119, 6, 0.6)'
                  }
                }}
              >
                Next →
              </Button>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  color: '#ea580c',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
              >
                👪 Guardian Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Parent or guardian contact details
              </Typography>
            </Box>

            <TextField
              label="Full Name"
              name="guardian_name"
              value={form.guardian_name}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.guardian_name}
              helperText={fieldErrors.guardian_name || "Enter guardian's full name"}
              placeholder="e.g. Mary Smith"
            />

            <TextField
              label="Relationship"
              name="guardian_relationship"
              value={form.guardian_relationship}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.guardian_relationship}
              helperText={fieldErrors.guardian_relationship}
              placeholder="e.g. Mother, Father, Guardian"
            />

            <TextField
              label="Phone Number"
              name="guardian_phone"
              value={form.guardian_phone}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.guardian_phone}
              helperText={fieldErrors.guardian_phone || 'Enter 10-digit phone number starting with 0'}
              placeholder="e.g. 0123456789"
              inputProps={{ maxLength: 10 }}
            />

            <TextField
              label="Email Address"
              type="email"
              name="guardian_email"
              value={form.guardian_email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!fieldErrors.guardian_email}
              helperText={fieldErrors.guardian_email || "Enter guardian's email address"}
              placeholder="e.g. mary@example.com"
            />

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  borderColor: '#ea580c',
                  color: '#ea580c',
                  '&:hover': {
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(234, 88, 12, 0.04)'
                  }
                }}
              >
                ← Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1,
                  background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                  boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #c2610c 0%, #dc2626 100%)',
                    boxShadow: '0 6px 20px rgba(217, 119, 6, 0.6)'
                  }
                }}
              >
                Next →
              </Button>
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ py: 2 }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  color: '#ea580c',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
              >
                ✅ Review & Submit
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Please review your information before submitting to Khayalethu
              </Typography>
            </Box>

            <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: '#fafafa' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ea580c', fontWeight: 600 }}>
                Personal Information
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <Typography><strong>Year:</strong> {form.year}</Typography>
                <Typography><strong>Full Names:</strong> {form.full_names}</Typography>
                <Typography><strong>ID Number:</strong> {form.id_number}</Typography>
                <Typography><strong>Student Number:</strong> {form.student_number}</Typography>
                <Typography><strong>Institution:</strong> {form.institution}</Typography>
                <Typography><strong>Email:</strong> {form.email}</Typography>
                <Typography><strong>Phone:</strong> {form.phone}</Typography>
                <Typography><strong>Gender:</strong> {form.gender}</Typography>
                <Typography><strong>Ethnicity:</strong> {form.ethnicity}</Typography>
                <Typography><strong>Home Language:</strong> {form.home_language}</Typography>
              </Box>
              <Typography sx={{ mt: 2 }}><strong>Home Address:</strong> {form.home_address}</Typography>
            </Paper>

            <Paper elevation={1} sx={{ p: 3, bgcolor: '#fafafa' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ea580c', fontWeight: 600 }}>
                Guardian Information
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <Typography><strong>Guardian Name:</strong> {form.guardian_name}</Typography>
                <Typography><strong>Relationship:</strong> {form.guardian_relationship}</Typography>
                <Typography><strong>Guardian Phone:</strong> {form.guardian_phone}</Typography>
                <Typography><strong>Guardian Email:</strong> {form.guardian_email}</Typography>
              </Box>
            </Paper>

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  borderColor: '#ea580c',
                  color: '#ea580c',
                  '&:hover': {
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(234, 88, 12, 0.04)'
                  }
                }}
              >
                ← Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                onClick={handleSubmit}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                  boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #c2610c 0%, #dc2626 100%)',
                    boxShadow: '0 6px 20px rgba(217, 119, 6, 0.6)'
                  },
                  '&:disabled': {
                    background: 'rgba(217, 119, 6, 0.3)',
                    color: 'white'
                  }
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#faf9f7', py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: '#22c55e', mb: 3 }} />
            <Typography variant="h4" gutterBottom sx={{ color: '#22c55e' }}>
              Application Submitted Successfully! 🎉
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Thank you for applying to Khayalethu Premium Student Accommodation
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <strong>Application ID:</strong> {applicationId}
            </Typography>
            <Button
              variant="contained"
              onClick={handleNewApplication}
              sx={{ mt: 3 }}
            >
              Submit Another Application
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#faf9f7', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ mb: 4 }}>
            <Stepper activeStep={step - 1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <form onSubmit={handleSubmit}>
            {renderStepContent()}
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ApplicationForm;
