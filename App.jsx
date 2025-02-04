import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import GenerateStory from './pages/GenerateStory';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Transcript from './pages/Transcript';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function Logout() {
  React.useEffect(() => {
    localStorage.clear();
    // Dispatch a storage event to notify other components
    window.dispatchEvent(new Event('storage'));
  }, []);

  // Ensure the user is correctly redirected to the login page
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Container sx={{ flex: 1, padding: '16px', overflow: 'hidden' }}>
            <Routes>
              <Route path="/youtube-transcript-generator" element={<Transcript />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/logout" element={<Logout />} />
                      <Route path="/generate-story" element={<GenerateStory />} />
                      <Route path="*" element={<NotFound />} />
                      <Route path="/register" element={<RegisterAndLogout />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;