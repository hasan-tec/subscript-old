import React, { useState } from 'react';
import { Box, Button, Typography, TextareaAutosize } from '@mui/material';

function FrameSelector({ frames, onSelect, onUpdateFrame }) {
    const [editingFrame, setEditingFrame] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    const handleEditFrame = (frame) => {
        setEditingFrame(frame.title);
        setEditedContent(frame.content);
    };

    const handleSaveEdit = (title) => {
        const updatedFrame = {
            title: title,
            content: editedContent,
        };

        console.log('Frame being saved:', updatedFrame);
        onUpdateFrame(updatedFrame);
        setEditingFrame(null);
        setEditedContent('');
    };

    const handleCancelEdit = () => {
        setEditingFrame(null);
        setEditedContent('');
    };

    if (!frames || Object.keys(frames).length === 0) {
        return <Typography>No frames available. Please generate frames first.</Typography>;
    }

    return (
        <Box className="frame-selector">
            {Object.entries(frames).map(([title, content], index) => {
                return (
                    <Box
                        key={index}
                        className="frame"
                        mb={2}
                        sx={{
                            width: '100%',
                            border: '1px solid',
                            borderColor: editingFrame === title ? 'primary.main' : 'grey.400',
                            borderRadius: '4px',
                            padding: '16px',
                        }}
                    >
                        <Typography variant="h6">{title.replace('_', ' ').toUpperCase()}</Typography>
                        {editingFrame === title ? (
                            <TextareaAutosize
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                minRows={10}
                                style={{ width: '100%', fontFamily: 'Roboto, Arial, sans-serif', fontSize: '1rem'  }}
                            />
                        ) : (
                            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{content}</pre>
                        )}
                        <Box mt={2}>
                            {editingFrame === title ? (
                                <>
                                    <Button variant="contained" onClick={() => handleSaveEdit(title)}>
                                        Save and Select Frame
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={handleCancelEdit} style={{ marginLeft: '8px' }}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="contained" onClick={() => onSelect({ title, content })}>
                                        Select Frame
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleEditFrame({ title, content })} style={{ marginLeft: '8px' }}>
                                        Edit Frame
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}

export default FrameSelector;