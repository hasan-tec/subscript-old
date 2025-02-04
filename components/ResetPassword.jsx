import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiService from "../api";
import { ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Container, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import theme from '../theme';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const uid = query.get('uid');
    const token = query.get('token');

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await apiService.post('/api/password-reset/', { uid, token, new_password: newPassword });
            setMessage(res.data.message);
            navigate('/login');
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
                                Reset Password
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    id="newPassword"
                                    autoComplete="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="form-button"
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Reset Password'}
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

export default ResetPassword;