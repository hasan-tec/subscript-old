import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Snackbar } from '@mui/material';
import apiService from '../api';

function TranscriptTool() {
    const [videoUrl, setVideoUrl] = useState('');
    const [transcript, setTranscript] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        // Initialize the driver when the component mounts
        apiService.post('/api/tools/init-driver/');
        return () => {
            // Close the driver when the component unmounts
            apiService.post('/api/tools/close-driver/');
        };
    }, []);

    const handleFetchTranscript = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await apiService.post('/api/tools/transcript/', { video_url: videoUrl });
            setTranscript(response.data.transcript);
        } catch (error) {
            setError('Failed to fetch transcript. Please check the video URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyTranscript = () => {
        navigator.clipboard.writeText(transcript);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <Box margin="20px" sx={{ width: '100%' }}>
            <Typography variant="h4" marginBottom="16px">YouTube Transcript Tool</Typography>
            <TextField
                label="YouTube Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Box display="flex" alignItems="center" marginTop="16px">
                <Button
                    variant="contained"
                    onClick={handleFetchTranscript}
                    disabled={loading}
                >
                    {loading ? 'Fetching Transcript...' : 'Get Transcript'}
                </Button>
                {transcript && (
                    <Button
                        variant="outlined"
                        onClick={handleCopyTranscript}
                        style={{ marginLeft: '16px' }}
                    >
                        Copy Transcript
                    </Button>
                )}
            </Box>
            {error && (
                <Typography color="error" marginTop="16px">{error}</Typography>
            )}
            {transcript && (
                <Box marginTop="16px">
                    <Typography variant="h6">Transcript</Typography>
                    <Box sx={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px', width: '33%' }}>
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{transcript}</pre>
                    </Box>
                </Box>
            )}
            <Snackbar
                open={copySuccess}
                message="Transcript copied successfully!"
                autoHideDuration={2000}
            />
        </Box>
    );
}

export default TranscriptTool;