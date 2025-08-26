import React from 'react';
import { Box, Button, Container, Typography, Grid, Paper, Chip, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import OpacityIcon from '@mui/icons-material/Opacity';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SecurityIcon from '@mui/icons-material/Security';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import logo from './logo-khayalethu.png';
import logo1 from './logo-khayalethu.png';
import logo2 from './logo-khayalethu1.png';
import logoSvg from './logo.svg';

const images = [logo1, logo2, logoSvg];

const amenities = [
  { icon: <WifiIcon color="primary" />, label: 'Uncapped Wi-Fi' },
  { icon: <OpacityIcon color="primary" />, label: 'Water' },
  { icon: <LocalLaundryServiceIcon color="primary" />, label: 'Laundry' },
  { icon: <FlashOnIcon color="primary" />, label: 'Electricity' },
  { icon: <SecurityIcon color="primary" />, label: '24/7 Security' },
  { icon: <DirectionsBusIcon color="primary" />, label: 'Free Transport' },
];

export default function HomePage({ onApply }) {
  return (
    <Box sx={{ bgcolor: '#e0f7fa', minHeight: '100vh', pb: 6 }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#00bcd4', color: '#fff', py: 2, px: 0, borderRadius: '0 0 24px 24px', mb: 4 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Khayalethu Logo" style={{ width: 56, marginRight: 16 }} />
            <Typography variant="h5" fontWeight={900} letterSpacing={2} sx={{ textShadow: '0 2px 8px #0097a7' }}>
              Khayalethu Student Living
            </Typography>
          </Box>
          <Button variant="contained" color="warning" size="large" sx={{ fontWeight: 700, borderRadius: 3 }} onClick={onApply}>
            Apply Now
          </Button>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Image Grid */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {images.map((img, i) => (
                <Grid item xs={4} key={i}>
                  <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <img src={img} alt="Accommodation" style={{ width: '100%', height: 100, objectFit: 'cover' }} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Info Cards */}
          <Grid item xs={12} md={5}>
            <Paper elevation={4} sx={{ borderRadius: 4, mb: 2, bgcolor: '#6a1b9a', color: '#fff', p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Overview</Typography>
              <Typography>
                Our student accommodation is modern and fully furnished. Secure your spot in a private or shared room, enjoy great amenities, and join a vibrant student community!
              </Typography>
            </Paper>
            <Paper elevation={2} sx={{ borderRadius: 4, bgcolor: '#ffecb3', color: '#333', p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Included in the rental amount:</Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li><CheckCircleIcon color="success" fontSize="small" /> Uncapped Wi-Fi</li>
                <li><CheckCircleIcon color="success" fontSize="small" /> Water</li>
                <li><CheckCircleIcon color="success" fontSize="small" /> Laundry tokens included per month</li>
                <li><CheckCircleIcon color="success" fontSize="small" /> Electricity allowance included</li>
                <li><CheckCircleIcon color="success" fontSize="small" /> 24/7 Security</li>
                <li><CheckCircleIcon color="success" fontSize="small" /> Free transport to university</li>
              </ul>
            </Paper>
          </Grid>
        </Grid>

        {/* Amenities Section */}
        <Box sx={{ mt: 6, mb: 2 }}>
          <Divider sx={{ mb: 2 }}>
            <Typography variant="h5" color="primary" fontWeight={800}>
              Amenities
            </Typography>
          </Divider>
          <Grid container spacing={3} justifyContent="center">
            {amenities.map((am, i) => (
              <Grid item key={i}>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 3, minWidth: 120, textAlign: 'center', bgcolor: '#fff' }}>
                  <Box sx={{ mb: 1 }}>{am.icon}</Box>
                  <Typography fontWeight={700} color="primary.main">{am.label}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
