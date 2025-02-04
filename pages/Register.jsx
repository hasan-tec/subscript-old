import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Link, Box, Card, CardContent, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import apiService from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
        const token = localStorage.getItem('token'); // Haal het superuser-token op
        await apiService.post(
            '/api/user/register/',
            { username, email, password },
        );
        navigate('/login');
    } catch (error) {
        alert("Error: " + error.response?.data?.detail || error.message);
    } finally {
        setLoading(false);
    }
};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Card>
          <CardContent>
            <Box>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Register'}
                </Button>
                <Box mt={2}>
                  <Link href="/login" sx={{color: 'text.secondary', textDecoration: 'none'}}>
                    {"Already have an account? Login"}
                  </Link>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Register;