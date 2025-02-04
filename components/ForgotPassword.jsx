import { useState } from "react";
import apiService from "../api";
import { ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Container, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import theme from '../theme';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await apiService.post('/api/password-reset-request/', { email });
            setMessage(res.data.message);
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <Card>
                    <CardContent>
                        <div className="form-container">
                            <Typography component="h1" variant="h5">
                                Forgot Password
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="form-button"
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
                                </Button>
                            </form>
                            {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
                        </div>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
}

export default ForgotPassword;