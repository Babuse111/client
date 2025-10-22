import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ApplicationForm from './ApplicationForm';
import RegistrationForm from './RegistrationForm';
import NotFound from './NotFound';

// Move facilities OUTSIDE the component
const facilities = [
  {
    label: 'High-Speed WiFi',
    description: 'Blazing fast internet for all your academic needs',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h.01M8.5 16.5c2-2 5-2 7 0M5 13.5c4-4 10-4 14 0M2 10.5c6-6 14-6 20 0"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    label: '24/7 Security',
    description: 'Round-the-clock protection and peace of mind',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
  },
  {
    label: 'Modern Laundry',
    description: 'State-of-the-art washing and drying facilities',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"
          stroke="white" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
        <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="white"
          strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7.5" cy="6.5" r="1" fill="white" />
        <circle cx="10.5" cy="6.5" r="1" fill="white" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    label: 'Study Spaces',
    description: 'Quiet, well-lit areas perfect for focused learning',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="8" r="1" fill="white" />
        <circle cx="7" cy="8" r="1" fill="white" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
  },
  {
    label: 'Backup Systems',
    description: 'Uninterrupted power and water supply guaranteed',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="19" r="2" stroke="white" strokeWidth="1.5" fill="white" opacity="0.3" />
        <circle cx="18" cy="5" r="2" stroke="white" strokeWidth="1.5" fill="white" opacity="0.3" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    label: 'Recreation Hub',
    description: 'Relaxation areas and entertainment facilities',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"
          stroke="white" strokeWidth="2" />
        <line x1="8" y1="21" x2="16" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="8" cy="10" r="2" stroke="white" strokeWidth="1.5" />
        <circle cx="16" cy="10" r="2" stroke="white" strokeWidth="1.5" />
        <path d="M12 13c1.5 1.5 3.5 1.5 5 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
  },
];

// Example HomePage component
function HomePage() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showText, setShowText] = useState(false);

  // Landing animation sequence
  useEffect(() => {
    // First show the background image
    const imageTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Then animate in the text elements
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1200);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(textTimer);
    };
  }, []);

  useEffect(() => {
    if (!autoSlide) return;
    const timer = setTimeout(() => {
      setSlide((prev) => (prev === 0 ? 1 : 0));
    }, 12000); // Even slower transition (12 seconds)
    return () => clearTimeout(timer);
  }, [slide, autoSlide]);

  return (
    <React.Fragment>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)', color: '#fff', py: 2, px: 0, borderRadius: '0 0 24px 24px', mb: 0 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Khayalethu Logo" style={{ width: 56, marginRight: 16 }} />
            <Box>
              <Typography variant="h5" fontWeight={900} letterSpacing={2} sx={{ textShadow: '0 2px 8px #0097a7' }}>
                Khayalethu
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
                Premium Student Accommodation
              </Typography>
            </Box>
          </Box>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              fontWeight: 700, 
              borderRadius: 3,
              background: 'rgba(255,255,255,0.95)',
              color: '#ea580c',
              border: '2px solid rgba(255,255,255,0.8)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                background: 'rgba(255,255,255,1)',
                color: '#dc2626',
                border: '2px solid #ea580c',
                boxShadow: '0 6px 25px rgba(234,88,12,0.3)',
                transform: 'translateY(-2px)'
              }
            }} 
            onClick={() => navigate('/apply')}
          >
            Apply for 2026
          </Button>
        </Container>
      </Box>

      {/* Carousel Slides */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', position: 'relative', px: { xs: 0, md: 4 }, bgcolor: '#faf9f7' }}>
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
            bgcolor: 'rgba(217,119,6,0.8)',
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
            bgcolor: 'rgba(217,119,6,0.8)',
            color: '#fff',
            boxShadow: 2,
            display: { xs: 'none', md: 'flex' }
          }}
          onClick={() => setSlide(slide === 1 ? 0 : 1)}
          aria-label="Next Slide"
        >
          {'>'}
        </Button>
        <Box sx={{ width: '100%', minHeight: '80vh', position: 'relative' }}>
          <Box
            sx={{
              width: '100%',
              minHeight: '80vh',
              display: slide === 0 ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f8f4f0 0%, #f1f1f1 100%)',
              transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              zIndex: 1,
              overflow: 'visible',
              py: { xs: 4, md: 8 },
              transform: slide === 0 ? 'translateX(0)' : 'translateX(-100vw)',
              borderTopRightRadius: { xs: 32, md: 32 },
              borderTopLeftRadius: { xs: 32, md: 32 }
            }}
          >
            {/* Background image with entrance animation */}
            <img
              src={process.env.PUBLIC_URL + '/frant_page_ back_image.png'}
              alt="Background"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
                opacity: isLoaded ? 0.45 : 0,
                filter: 'brightness(1.1)',
                pointerEvents: 'none',
                borderTopRightRadius: 32,
                borderTopLeftRadius: 32,
                transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1), filter 1.5s ease',
                transform: isLoaded ? 'scale(1)' : 'scale(1.05)'
              }}
            />
            {/* Content Container - No Background */}
            <Container maxWidth="lg" sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: { xs: 4, md: 8 },
              px: { xs: 2, md: 4 },
              zIndex: 2
            }}>
              <Box sx={{ flex: 2, minWidth: 0, textAlign: { xs: 'center', md: 'left' } }}>
                {/* Main headline - slides in from left */}
                <Typography variant="h3" fontWeight={900} sx={{ 
                  fontSize: { xs: 32, md: 56 },
                  background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                  opacity: showText ? 1 : 0,
                  transform: showText ? 'translateX(0px)' : 'translateX(-80px)',
                  transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
                }}>
                  Welcome to Khayalethu
                </Typography>
                
                {/* Subtitle - slides in from left with delay */}
                <Typography variant="h5" fontWeight={600} sx={{ 
                  mb: 3, 
                  fontSize: { xs: 20, md: 28 }, 
                  letterSpacing: 1,
                  color: '#ea580c',
                  opacity: showText ? 1 : 0,
                  transform: showText ? 'translateX(0px)' : 'translateX(-60px)',
                  transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
                }}>
                  Premium Student Living Experience
                </Typography>
                
                {/* Description - fades up */}
                <Typography variant="body1" sx={{ 
                  mb: 4, 
                  fontSize: { xs: 18, md: 22 }, 
                  color: '#374151', 
                  maxWidth: 650, 
                  lineHeight: 1.7,
                  opacity: showText ? 1 : 0,
                  transform: showText ? 'translateY(0px)' : 'translateY(40px)',
                  transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.9s'
                }}>
                  Where comfort meets community. Experience modern amenities, prime locations, and thoughtfully designed spaces that inspire success in your academic journey.
                </Typography>
                
                {/* CTA Button - slides up */}
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    fontWeight: 700, 
                    px: 6, 
                    py: 2,
                    fontSize: { xs: 18, md: 20 },
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                    boxShadow: '0 8px 32px rgba(217, 119, 6, 0.4)',
                    opacity: showText ? 1 : 0,
                    transform: showText ? 'translateY(0px)' : 'translateY(40px)',
                    transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.2s',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #c2610c 0%, #dc2626 100%)',
                      boxShadow: '0 12px 40px rgba(217, 119, 6, 0.6)',
                      transform: showText ? 'translateY(-4px)' : 'translateY(40px)',
                    }
                  }} 
                  onClick={() => { setSlide(1); setAutoSlide(false); }}
                >
                  🌟 Explore Khayalethu
                </Button>
              </Box>
              
              {/* Image - slides in from right */}
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minWidth: 0, 
                mt: { xs: 4, md: 0 },
                ml: { xs: 0, md: 4 },
                opacity: showText ? 1 : 0,
                transform: showText ? 'translateX(0px) scale(1)' : 'translateX(80px) scale(0.8)',
                transition: 'all 1.4s cubic-bezier(0.4, 0, 0.2, 1) 1.5s'
              }}>
                <Box sx={{
                  bgcolor: '#fff',
                  borderRadius: 6,
                  boxShadow: '0 20px 60px rgba(217,119,6,0.2)',
                  border: '4px solid #fff',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: 280, md: 380 },
                  height: { xs: 180, md: 240 },
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 25px 80px rgba(217,119,6,0.3)',
                  }
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
            </Container>
          </Box>
          <Box
            sx={{
              width: '100%',
              minHeight: '80vh',
              display: slide === 1 ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: slide === 1 ? 'translateX(0)' : 'translateX(100vw)',
              background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)',
              borderTopRightRadius: { xs: 32, md: 32 },
              borderTopLeftRadius: { xs: 32, md: 32 },
              py: { xs: 4, md: 6 },
              px: { xs: 2, md: 4 }
            }}
          >
            {/* Background Pattern */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(217,119,6,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(234,88,12,0.08) 0%, transparent 50%)',
              borderTopRightRadius: 32,
              borderTopLeftRadius: 32,
              zIndex: 0
            }} />

            {/* Header Section */}
            <Box sx={{ 
              textAlign: 'center', 
              mb: { xs: 4, md: 6 }, 
              zIndex: 2,
              opacity: slide === 1 ? 1 : 0,
              transform: slide === 1 ? 'translateY(0px)' : 'translateY(-30px)',
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
            }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 800, 
                mb: 2,
                background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: 28, md: 48 }
              }}>
                Premium Facilities & Amenities
              </Typography>
              <Typography variant="h6" sx={{ 
                color: '#92400e', 
                maxWidth: '700px', 
                mx: 'auto',
                lineHeight: 1.8,
                fontWeight: 500,
                fontSize: { xs: 16, md: 20 }
              }}>
                Experience luxury student living with world-class facilities designed for your success and comfort
              </Typography>
            </Box>

            {/* Facilities Grid */}
            <Container maxWidth="lg" sx={{ zIndex: 2 }}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {facilities.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.label}>
                    <Card sx={{
                      height: '100%',
                      borderRadius: 4,
                      border: '1px solid rgba(217,119,6,0.2)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      opacity: slide === 1 ? 1 : 0,
                      transform: slide === 1 ? 'translateY(0px)' : 'translateY(40px)',
                      transitionDelay: `${0.6 + (facilities.indexOf(item) * 0.1)}s`,
                      '&:hover': {
                        transform: slide === 1 ? 'translateY(-12px)' : 'translateY(40px)',
                        boxShadow: '0 20px 40px rgba(217,119,6,0.15)',
                        borderColor: 'rgba(217,119,6,0.3)'
                      }
                    }}>
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Box sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: item.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          boxShadow: '0 8px 24px rgba(217,119,6,0.3)'
                        }}>
                          <item.Icon />
                        </Box>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700, 
                          mb: 2,
                          color: '#92400e',
                          fontSize: { xs: 18, md: 20 }
                        }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#a8a29e', 
                          lineHeight: 1.6,
                          fontSize: { xs: 14, md: 15 }
                        }}>
                          {item.description}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Call to Action */}
              <Box sx={{ 
                textAlign: 'center', 
                mt: { xs: 4, md: 6 },
                opacity: slide === 1 ? 1 : 0,
                transform: slide === 1 ? 'translateY(0px)' : 'translateY(30px)',
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 1.2s'
              }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    fontWeight: 700, 
                    px: 6, 
                    py: 2,
                    fontSize: { xs: 16, md: 18 },
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                    boxShadow: '0 8px 32px rgba(217, 119, 6, 0.4)',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #c2610c 0%, #dc2626 100%)',
                      boxShadow: '0 12px 40px rgba(217, 119, 6, 0.6)',
                      transform: 'translateY(-2px)'
                    }
                  }} 
                  onClick={() => navigate('/apply')}
                >
                  🎓 Start Your Application
                </Button>
                <Typography variant="body2" sx={{ 
                  mt: 2, 
                  color: '#a8a29e',
                  fontSize: 14
                }}>
                  Join hundreds of students who call Khayalethu home
                </Typography>
              </Box>
            </Container>
          </Box>
          {/* Carousel Dots */}
          <Box sx={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2, zIndex: 10 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: slide === 0 ? '#ea580c' : '#ccc', transition: 'bgcolor 0.3s' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: slide === 1 ? '#ea580c' : '#ccc', transition: 'bgcolor 0.3s' }} />
          </Box>
        </Box>
      </Box>

      {/* Gallery Section - Restaurant Inspired */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, bgcolor: '#fef7ed', position: 'relative' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              mb: 2,
              background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: 28, md: 42 }
            }}>
              Experience Khayalethu
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#64748b', 
              maxWidth: '600px', 
              mx: 'auto',
              lineHeight: 1.8,
              fontWeight: 400,
              fontSize: { xs: 16, md: 18 }
            }}>
              Discover our premium accommodation experience through these moments
            </Typography>
          </Box>

          {/* Gallery Grid */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: { xs: 250, md: 350 }, 
                position: 'relative', 
                overflow: 'hidden',
                borderRadius: 3,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                transition: 'all 0.4s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                }
              }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image="/welcoming_page_student.png"
                  alt="Student Welcome Experience"
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                />
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white',
                  p: 3
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    Student Welcome
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    A warm welcome awaits every student
                  </Typography>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={{ xs: 2, md: 3 }} sx={{ height: '100%' }}>
                <Grid item xs={12}>
                  <Card sx={{ 
                    height: { xs: 120, md: 165 }, 
                    position: 'relative', 
                    overflow: 'hidden',
                    borderRadius: 3,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                    }
                  }}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image="/bathroom.jpg"
                      alt="Premium Facilities"
                      sx={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      color: 'white',
                      p: 2
                    }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 14 }}>
                        Premium Facilities
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ 
                    height: { xs: 120, md: 165 }, 
                    position: 'relative', 
                    overflow: 'hidden',
                    borderRadius: 3,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                    }
                  }}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image="/applaying_person.png"
                      alt="Application Process"
                      sx={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      color: 'white',
                      p: 2
                    }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 14 }}>
                        Easy Application
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
    ); // Close the return statement properly
} // Close HomePage function completely

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
