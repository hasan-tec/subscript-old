import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

function HookSelector({ hooks, onSelect, selectedHook, onConfirm }) {
    return (
        <Box padding="12px">
            <Typography variant="h5" marginBottom="16px">
                Hook
            </Typography>
            {hooks.filter(hook => hook === selectedHook).map((hook, index) => (
                <Card
                    key={index}
                    onClick={() => onSelect(hook)}
                    style={{
                        border: `2px solid ${'#9370DB'}`,
                        backgroundColor: '#1c1c1c',
                        borderRadius: '12px',
                        padding: '8px', // Decreased padding
                        cursor: 'pointer',
                        boxShadow: '#red',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        transform: 'scale(1.05)',
                        width: '100%',
                        marginBottom: '16px',
                        color: '#ffffff' // Ensure the correct color for text
                    }}
                >
                    <CardContent>
                    <Typography 
                        sx={{ 
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            fontFamily: 'Roboto, Arial, sans-serif', 
                            fontSize: '1.1rem', // Larger font size for the first frame
                            color: '#ffffff' // Ensure the correct color for text
                        }}
                    >
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                            {hook}
                        </pre>
                    </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={onConfirm} 
                            style={{ marginTop: '16px' }}
                        >
                            Confirm Hook
                        </Button>
                    </CardContent>
                </Card>
            ))}
            <Typography variant="h6" marginBottom="16px">
                ...or select one of these hooks
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {hooks.filter(hook => hook !== selectedHook).map((hook, index) => (
                    <Card
                        key={index}
                        onClick={() => onSelect(hook)}
                        style={{
                            border: '1px solid #888888',
                            backgroundColor: '#1c1c1c',
                            borderRadius: '12px',
                            padding: '8px', // Decreased padding
                            cursor: 'pointer',
                            boxShadow: 'none',
                            transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                            transform: 'scale(1)',
                            width: 'calc(50% - 12px)',
                        }}
                    >
                        <CardContent>
                            <Typography 
                                sx={{ 
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                    fontFamily: 'Roboto, Arial, sans-serif', 
                                    fontSize: '0.9rem', // Smaller font size for other frames
                                    color: '#ffffff' 
                                }}
                            >
                                {hook}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default HookSelector;