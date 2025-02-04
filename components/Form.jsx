import { useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Container, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import theme from '../theme';
import '../styles/index.css';

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await apiService.post(route, { username, password });
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };
    const name = method === 'login' ? 'Login' : 'Register';

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <Card>
                    <CardContent>
                        <div className="form-container">
                            <Typography component="h1" variant="h5">
                                {name}
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
                                    className="form-button"
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : name}
                                </Button>
                            </form>
                            {method === 'login' && (
                                <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                </Typography>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
}

export default Form;