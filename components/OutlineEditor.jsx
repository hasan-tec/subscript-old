import React, { useState } from 'react';
import { Box, Typography, Button, TextareaAutosize } from '@mui/material';

function OutlineEditor({ outline, onUseOutline, onUpdateOutline }) {
    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(outline);

    const handleSaveEdit = () => {
        onUpdateOutline(editedContent);
        onUseOutline();
        setEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedContent(outline);
        setEditing(false);
    };

    return (
        <Box className="outline-editor" sx={{ width: '100%', border: '1px solid grey', borderRadius: '4px', padding: '16px' }}>
            <Typography variant="h6">Outline</Typography>
            {editing ? (
                <TextareaAutosize
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    minRows={10}
                    style={{ width: '100%', fontFamily: 'Roboto, Arial, sans-serif', fontSize: '1rem' }}
                />
            ) : (
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '1rem' }}>
                    {outline}
                </pre>
            )}
            <Box mt={2}>
                {editing ? (
                    <>
                        <Button variant="contained" onClick={handleSaveEdit}>
                            Save and Use Outline
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancelEdit} style={{ marginLeft: '8px' }}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant="contained" onClick={onUseOutline}>
                            Use Outline
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => setEditing(true)} style={{ marginLeft: '8px' }}>
                            Edit Outline
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default OutlineEditor;