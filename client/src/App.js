import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ApplicationForm from './ApplicationForm';
import RegistrationForm from './RegistrationForm';
// Example HomePage component
function HomePage() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  useEffect(() => {
    if (!autoSlide) return;
    const timer = setTimeout(() => {
      setSlide((prev) => (prev === 0 ? 1 : 0));
    }, 7000); // Slower transition (7 seconds)
    return () => clearTimeout(timer);
  }, [slide, autoSlide]);

  return (
    <Box sx={{ bgcolor: '#e0f7fa', minHeight: '100vh', transition: 'background 0.5s' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#00bcd4', color: '#fff', py: 2, px: 0, borderRadius: '0 0 24px 24px', mb: 0 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" style={{ width: 56, marginRight: 16 }} />
            <Typography variant="h5" fontWeight={900} letterSpacing={2} sx={{ textShadow: '0 2px 8px #0097a7' }}>
              Khayalethu Student Living
            </Typography>
          </Box>
          <Button variant="contained" color="warning" size="large" sx={{ fontWeight: 700, borderRadius: 3 }} onClick={() => navigate('/register', { state: { year: '2026' } })}>
            Apply for 2026
          </Button>
        </Container>
      </Box>

      {/* Carousel Slides */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', position: 'relative', overflow: 'hidden', px: { xs: 0, md: 4 } }}>
        {/* Left Arrow Navigator */}
        <Button
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            minWidth: 0,
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'rgba(0,188,212,0.7)',
            color: '#fff',
            boxShadow: 2,
            display: { xs: 'none', md: 'flex' }
          }}
          onClick={() => setSlide(slide === 0 ? 1 : 0)}
          aria-label="Previous Slide"
        >
          {'<'}
        </Button>
        {/* Right Arrow Navigator */}
        <Button
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            minWidth: 0,
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'rgba(0,188,212,0.7)',
            color: '#fff',
            boxShadow: 2,
            display: { xs: 'none', md: 'flex' }
          }}
          onClick={() => setSlide(slide === 1 ? 0 : 1)}
          aria-label="Next Slide"
        >
          {'>'}
        </Button>
        {slide === 0 ? (
          // First Slide: Welcoming Page with Image
          <Box 
            sx={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center', 
              bgcolor: '#00bcd4',
              transition: 'all 0.5s',
              position: 'relative',
              overflow: 'hidden',
              py: { xs: 4, md: 8 }
            }}
          >
            {/* Background image */}
            <img 
              src={process.env.PUBLIC_URL + '/frant_page_ back_image.png'} 
              alt="Background" 
              style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                objectFit: 'cover', 
                zIndex: 0, 
                opacity: 0.38, // clearer background
                filter: 'brightness(1)',
                pointerEvents: 'none' 
              }} 
            />
            <Box sx={{
              width: { xs: '95%', md: '80%' },
              maxWidth: 1200,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: 'rgba(255,255,255,0.10)',
              borderRadius: 16,
              boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
              p: { xs: 2, md: 4 },
              mt: { xs: 2, md: 6 },
              zIndex: 2
            }}>
              <Box sx={{ flex: 2, minWidth: 0 }}>
                {/* Banner headline */}
                <Box sx={{ bgcolor: '#fff', borderRadius: 2, px: 3, py: 1, mb: 2, display: 'inline-block', boxShadow: '0 2px 12px rgba(0,188,212,0.10)' }}>
                  <Typography variant="h4" fontWeight={900} color="#00bcd4" sx={{ fontSize: { xs: 22, md: 32 } }}>
                    Welcome to Khayalethu Student Living
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700} color="#ffe082" sx={{ mb: 1, fontSize: { xs: 18, md: 26 } }}>
                  Live, Learn, Connect
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: 15, md: 20 }, color: '#fff', maxWidth: 600 }}>
                  Your home away from home. Discover a vibrant student community, modern amenities, and a welcoming atmosphere.
                </Typography>
                <Button variant="contained" color="warning" size="large" sx={{ fontWeight: 700, px: 4, fontSize: 18, borderRadius: 2, boxShadow: '0 2px 8px #0097a7' }} onClick={() => { setSlide(1); setAutoSlide(false); }}>
                  Explore Clau-Clau
                </Button>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, mt: { xs: 3, md: 0 } }}>
                <Box sx={{
                  bgcolor: '#fff',
                  borderRadius: 6,
                  boxShadow: '0 8px 32px rgba(0,188,212,0.18)',
                  border: '4px solid #fff',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: 220, md: 320 },
                  height: { xs: 140, md: 200 }
                }}>
                  <img
                    src={process.env.PUBLIC_URL + '/welcoming_page_student.png'}
                    alt="Welcoming Student"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 4
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          // Second Slide: Clau-Clau Accommodation
          <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'stretch', justifyContent: 'center', transition: 'all 0.5s' }}>
            {/* Left: Image with overlay */}
            <Box sx={{ flex: 1, position: 'relative', minHeight: { xs: 250, md: 500 }, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderTopLeftRadius: 32, borderBottomLeftRadius: 32 }}>
              <img
                src={process.env.PUBLIC_URL + '/bathroom.jpg'}
                alt="Clau-Clau Accommodation"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)', borderTopLeftRadius: 32, borderBottomLeftRadius: 32 }}
              />
              <Box sx={{ position: 'absolute', top: { xs: 16, md: 48 }, left: { xs: 16, md: 48 }, bgcolor: 'rgba(0,188,212,0.85)', px: { xs: 2, md: 4 }, py: { xs: 1, md: 3 }, borderRadius: 2, maxWidth: { xs: '80%', md: '60%' } }}>
                <Typography variant="h3" fontWeight={900} color="#fff" sx={{ fontSize: { xs: 28, md: 40 } }}>
                  Student Accommodation
                </Typography>
                <Typography variant="h4" fontWeight={700} color="#ffe082" sx={{ fontSize: { xs: 22, md: 32 } }}>
                  Clau-Clau
                </Typography>
              </Box>
            </Box>
            {/* Right: Info Card */}
            <Box sx={{ flex: 1, bgcolor: '#6a1b9a', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: { xs: 3, md: 6 }, borderTopRightRadius: 32, borderBottomRightRadius: 32 }}>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 2, color: '#00bcd4', fontSize: { xs: 24, md: 32 } }}>
                Where You'll Thrive!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: 16, md: 20 }, textAlign: 'center' }}>
                What we offer:
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 4, maxWidth: 320 }}>
                {[
                  { label: 'Wifi', icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#00bcd4"/><path d="M6.5 13.5C8.5 11.5 15.5 11.5 17.5 13.5" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M9.5 16.5C10.5 15.5 13.5 15.5 14.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="19" r="1" fill="white"/></svg> },
                  { label: '24/hr Security', icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#00bcd4"/><rect x="8" y="10" width="8" height="6" rx="3" stroke="white" strokeWidth="2" fill="none"/><path d="M12 10V8" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="white"/></svg> },
                  { label: 'Laundry Facilities', icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#00bcd4"/><rect x="8" y="8" width="8" height="8" rx="2" stroke="white" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="2" stroke="white" strokeWidth="2" fill="none"/><path d="M10 16h4" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
                  { label: 'CCTV', icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#00bcd4"/><rect x="9" y="11" width="6" height="2" rx="1" stroke="white" strokeWidth="2" fill="none"/><circle cx="12" cy="14" r="1" fill="white"/><path d="M8 9l8 0" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
                  { label: 'Backup Water', icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#00bcd4"/><path d="M12 7C14 10 17 13 12 17C7 13 10 10 12 7Z" stroke="white" strokeWidth="2" fill="none"/></svg> },
                  { label: 'Backup Power', icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#00bcd4"/><rect x="10" y="8" width="4" height="8" rx="2" stroke="white" strokeWidth="2" fill="none"/><path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
                  { label: 'Study Hub', icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#00bcd4"/><rect x="8" y="10" width="8" height="4" rx="2" stroke="white" strokeWidth="2" fill="none"/><path d="M12 10V8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
                  { label: 'Swimming Pool', icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#00bcd4"/><path d="M6 16c2 2 10 2 12 0" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M8 12c1.5 1.5 7.5 1.5 9 0" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M9 8c1 1 5 1 6 0" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/></svg> }
                ].map((item, idx) => (
                  <Box key={idx} sx={{ bgcolor: '#00bcd4', color: '#fff', borderRadius: 3, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 2 }}>
                    <Box sx={{ mb: 1 }}>{item.icon}</Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'center', fontSize: { xs: 18, md: 22 } }}>{item.label}</Typography>
                  </Box>
                ))}
              </Box>
              <Button variant="contained" color="warning" size="large" sx={{ fontWeight: 700, px: 5, fontSize: 18 }} onClick={() => navigate('/register')}>
                Apply Now
              </Button>
            </Box>
          </Box>
        )}
        {/* Carousel Dots */}
        <Box sx={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: slide === 0 ? '#00bcd4' : '#ccc', transition: 'bgcolor 0.3s' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: slide === 1 ? '#00bcd4' : '#ccc', transition: 'bgcolor 0.3s' }} />
        </Box>
      </Box>
    </Box>
  );
}


function NotFound() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" color="error">404 - Page Not Found</Typography>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
