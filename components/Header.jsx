import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Link, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

const GradientAppBar = styled(AppBar)(({ theme }) => ({
    background:'#0A0A0A',
    boxShadow: '0 0 6px 1px #9370DB', // Softer and more blended glow
    transition: 'background 0.3s ease, box-shadow 0.3s ease',
    zIndex: theme.zIndex.drawer + 1,
    '&.scrolled': {
      background: 'transparent',
      boxShadow: 'none',
    },
}));

const NavLink = styled(Link)({
  margin: '0 16px',
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    color: '#9370DB', // Use the hover color defined in the theme
  },
});

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #0047ff, #ff4081, #9c27b0)',
  backgroundSize: '200% 200%',
  animation: 'gradientAnimation 4s ease infinite',
  color: 'white',
  '@keyframes gradientAnimation': {
    '0%': {
      backgroundPosition: '0% 60%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 60%',
    },
  },
});

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem(ACCESS_TOKEN));
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsLoggedIn(false);
    navigate('/login', { replace: true });  // Ensure immediate navigation to login page
    window.location.reload();  // Refresh the page
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem(ACCESS_TOKEN));
  }, [localStorage.getItem(ACCESS_TOKEN)]);

  return (
    <>
      <GradientAppBar position="fixed" className={scrolled ? 'scrolled' : ''}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 700 }}>
            AI Story Generator (LOGO)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink component={RouterLink} to="/">
              Home
            </NavLink>
            {isLoggedIn ? (
              <NavLink component={RouterLink} to="#" onClick={handleLogout}>
                Logout
              </NavLink>
            ) : (
              <NavLink component={RouterLink} to="/login">
                Login
              </NavLink>
            )}
            <NavLink component={RouterLink} to={isLoggedIn ? "/generate-story" : "/login"}>
              <GradientButton>Create Stories</GradientButton>
            </NavLink>
          </Box>
        </Toolbar>
      </GradientAppBar>
      <Toolbar /> {/* This Toolbar component adds the necessary padding */}
    </>
  );
};

export default Header;