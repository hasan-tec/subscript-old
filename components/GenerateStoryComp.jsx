import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FrameSelector from './FrameSelector';
import OutlineEditor from './OutlineEditor';
import HookSelector from './HookSelector';
import apiService from '../api';
import '../styles/index.css';

function GenerateStoryComp() {
    const [topic, setTopic] = useState('');
    const [audience, setAudience] = useState('');
    const [exampleStory, setExampleStory] = useState('');
    const [wordcount, setWordcount] = useState(500);
    const [frames, setFrames] = useState(null);
    const [selectedFrame, setSelectedFrame] = useState(null);
    const [outline, setOutline] = useState(null);
    const [hooks, setHooks] = useState([]);
    const [selectedHook, setSelectedHook] = useState(null);
    const [fullStory, setFullStory] = useState(null);
    const [finalStory, setFinalStory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expandedStep, setExpandedStep] = useState('step1');
    const [loadingMessage, setLoadingMessage] = useState('Loading');
    const [loadingAccordion, setLoadingAccordion] = useState(null);
    const [confirmedHook, setConfirmedHook] = useState(null);
    const [outlineVisible, setOutlineVisible] = useState(false);
    const [youtubeLink, setYoutubeLink] = useState('');  
    const [previousYoutubeLink, setPreviousYoutubeLink] = useState('');
    const [transcriptText, setTranscriptText] = useState('');
    const [storyId, setStoryId] = useState(null);
    const [personstoryview, setPersonStoryView] = useState('Third person');


    const loadingBorderStyle = {
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 0 0 4px transparent', // Initial shadow to prevent content shift
        animation: 'loadingBorder 10s linear infinite', // Linear zorgt voor een vloeiende overgang
    };

    const accordionStyle = {
        borderRadius: '12px',
        '&:first-of-type': {
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
        },
        '&:last-of-type': {
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
        },
        '&:before': {
            display: 'none',
        },
    };

    useEffect(() => {
        // Initialize the driver when the component mounts
        apiService.post('/api/tools/init-driver/');
        return () => {
            // Close the driver when the component unmounts
            apiService.post('/api/tools/close-driver/');
        };
    }, []);

    useEffect(() => {
        if (loading) {
            let messages = [];
            switch (loadingAccordion) {
                case 'step1':
                    messages = ['Generating Frames', 'David vs Goliath', 'Overcoming the Monster', 'Rebirth'];
                    break;
                case 'step3':
                    messages = ['Generating Outline', 'Using Artificial Creativity'];
                    break;
                case 'step4':
                    messages = ['Generating Hooks', 'Generating another Hook'];
                    break;
                case 'step6':
                    messages = ['Generating Final Story', "Don't Rush Creativity"];
                    break;
                default:
                    messages = ['Loading'];
            }
            setLoadingMessage(messages[0]); // Set initial message
            const interval = setInterval(() => {
                setLoadingMessage((prev) => {
                    const currentIndex = messages.indexOf(prev);
                    return messages[(currentIndex + 1) % messages.length];
                });
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [loading, loadingAccordion]);

    const handleExpandStep = (step) => (_, isExpanded) => {
        setExpandedStep(isExpanded ? step : false);
    };

    const handleGenerateFrames = async () => {
        setLoading(true);
        setLoadingAccordion('step1');
        try {
            let transcript = transcriptText;
            if (youtubeLink && youtubeLink !== previousYoutubeLink) {
                const transcriptResponse = await apiService.post('/api/tools/transcript/', { video_url: youtubeLink });
                transcript = transcriptResponse.data.transcript;
                setTranscriptText(transcript);
                setPreviousYoutubeLink(youtubeLink);
            }
    
            const payload = { 
                topic, 
                audience, 
                example_story: transcript || exampleStory,
                personstoryview,
            };
            const response = await apiService.post('/api/verhalen/frames/', payload);
            setFrames(response.data.frames);
            setStoryId(response.data.story_id);
            setExpandedStep('step2'); // Automatically open step 2
        } catch (error) {
            console.error('Error generating frames:', error);
            alert('Failed to generate frames.');
        } finally {
            setLoading(false);
            setLoadingAccordion(null);
        }
    };

    const handleGenerateOutline = async (frame) => {
        try {
            const payload = {
                selected_frame: frame.content,
                topic,
                audience,
                example_story: exampleStory,
                story_id: storyId,
                personstoryview
            };
            const response = await apiService.post('/api/verhalen/outline/', payload); // Start API-aanroep
            setOutline(response.data.outline); // Stel de ontvangen outline in
        } catch (error) {
            console.error('Error generating outline:', error);
            alert('Failed to generate outline.');
        } finally {
            setLoading(false); // Zet loading status terug naar false
            setLoadingAccordion(null); // Reset loading accordion
            setOutlineVisible(true); // Zet outlineVisible op true
        }
    };
    
    const generateOutlineButton = () => {
        if (!outline) {
            setLoading(true);
            setLoadingAccordion('step3');
        }
    };
    
    const handleGenerateHooks = async () => {
        if (!outline) {
            alert('Please generate and edit the outline first!');
            return;
        }
        try {
            const payload = { selected_frame: selectedFrame.content, outline, story_id: storyId, };
            const response = await apiService.post('/api/verhalen/hooks/', payload);
            setHooks(response.data.hooks);
            setSelectedHook(response.data.hooks[0]);
        } catch (error) {
            console.error('Error generating hooks:', error);
            alert('Failed to generate hooks.');
        } finally {
            setLoading(false);
            setLoadingAccordion(null);
        }
    };

    const generateHooksButton = () => {
        if (hooks.length === 0) {
            setLoading(true);
            setLoadingAccordion('step4');
        }
    };

    const handleUpdateFrame = (updatedFrame) => {
        setFrames((prevFrames) => ({
            ...prevFrames,
            [updatedFrame.title]: updatedFrame.content,
        }));
        setSelectedFrame(updatedFrame);
        setOutline(null);
    };

    const handleGenerateStoryInBackground = async () => {
        try {
            const payload = {
                frame: selectedFrame.content,
                outline: outline,
                title: "Generated Story",
                wordcount: wordcount,
                story_id: storyId
            };
            const response = await apiService.post('/api/verhalen/generate/', payload);
            
            // Save the generated story in state as text
            const storyText = await response.data;
            setFullStory(storyText);
        } catch (error) {
            console.error('Error generating story in background:', error.response?.data || error.message);
            alert('An error occurred while generating the story in the background.');
        }
    };
    const handleGenerateStory = () => {
        setLoading(true);
        setLoadingAccordion('step6');
        }

    useEffect(() => {
        const sendStoryToBackend = async () => {
            if (loadingAccordion === 'step6' && fullStory) {
                try {
                    const payload = {
                        hook: confirmedHook,
                        story: fullStory,
                        story_id: storyId,  
                        title: "Generated Story",
                    };
                    const response = await apiService.post('/api/verhalen/full_story/', payload, {
                        responseType: 'blob',
                    });
    
                    const blob = new Blob([response.data], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${selectedFrame.title} - ${topic}.txt`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
    
                    setFinalStory("Story downloaded successfully.");
                } catch (error) {
                    console.error('Error generating story:', error.response?.data || error.message);
                    alert('An error occurred while generating the story.');
                } finally {
                    setLoading(false);
                    setLoadingAccordion(null);
                }
            }
        };
    
        sendStoryToBackend();
    }, [fullStory, loadingAccordion, confirmedHook, selectedFrame, topic]);
    
    
    const handleConfirmHook = () => {
        setConfirmedHook(selectedHook);
        setExpandedStep('step6');
    };

    const buttonStyle = {
        width: '200px', // Adjust this width based on the largest loading text
    };

    const generatingButtonStyle = {
        backgroundColor: '#9370DB',
        color: '#ffffff',
        width: '200px',
    };

    return (
        <Box margin="20px" sx={{ width: '100%' }}>
            <Accordion expanded={expandedStep === 'step1'} onChange={handleExpandStep('step1')} sx={loadingAccordion === 'step1' ? loadingBorderStyle : accordionStyle}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">{frames ? topic : 'Generate Frames'}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleGenerateFrames();
                        }}
                    >
                        <Box mb={4}>
                            <TextField
                                label="Topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                required
                                fullWidth
                            />
                        </Box>
                        <Box mb={4}>
                            <TextField
                                label="Audience"
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                required
                                fullWidth
                            />
                        </Box>
                        <Box mb={4}>
                            <TextField
                                label="Example Story (Enter YouTube link)"
                                value={youtubeLink}
                                onChange={(e) => setYoutubeLink(e.target.value)}
                                fullWidth
                            />
                        </Box>
                        <Box mb={4}>
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <InputLabel id="personstoryview-label">Story Point of View</InputLabel>
                                <Select
                                    labelId="personstoryview-label"
                                    id="personstoryview"
                                    value={personstoryview}
                                    onChange={(e) => setPersonStoryView(e.target.value)}
                                    label="Story View"
                                >
                                    <MenuItem value="First person">First person</MenuItem>
                                    <MenuItem value="Third person">Third person</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mb={4}>
                            <TextField
                                label="Word Count"
                                type="number"
                                value={wordcount}
                                onChange={(e) => setWordcount(e.target.value)}
                                inputProps={{ min: 100 }}
                                required
                                fullWidth
                            />
                        </Box>
                        <Button type="submit" variant="contained" disabled={loading} style={loading ? generatingButtonStyle : buttonStyle}>
                            {loading ? loadingMessage : 'Generate Frames'}
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>

            {frames && (
                <Accordion expanded={expandedStep === 'step2'} onChange={handleExpandStep('step2')} sx={loadingAccordion === 'step2' ? loadingBorderStyle : accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h4">{selectedFrame ? selectedFrame.title : 'Select a frame'}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body1" marginBottom="16px" textAlign="left">
                            Select a frame to generate an outline and hooks for your story. <br />
                            If you want to change the names of the characters or the setting for example, you can edit the frame before generating the outline.
                        </Typography>  
                        <FrameSelector
                            frames={frames}
                            onSelect={(frame) => {
                                setSelectedFrame(frame);
                                setOutline(null);
                                setHooks([]);
                                setSelectedHook(null);
                                setExpandedStep('step3');
                                handleGenerateOutline(frame);
                                setOutlineVisible(false);
                                setFullStory(null);
                            }}
                            onUpdateFrame={handleUpdateFrame}
                        />
                    </AccordionDetails>
                </Accordion>
            )}

            {selectedFrame && (
                <Accordion expanded={expandedStep === 'step3'} onChange={handleExpandStep('step3')} sx={loadingAccordion === 'step3' ? loadingBorderStyle : accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h4">{outlineVisible ? 'Outline generated' : 'Generate outline'}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {outlineVisible === false && (
                            <>
                                <Typography variant="body1" marginBottom="16px" textAlign="left">
                                    An outline is a summary of the story you want to tell. It helps you to structure your story and keep track of the main events.<br />
                                    We will generate an outline based on the selected frame and the information you provided. <br />
                                    Artificial creativity will be used to generate a compelling outline.
                                </Typography>
                                <Button onClick={generateOutlineButton} variant="contained" disabled={loading} style={loading ? generatingButtonStyle : buttonStyle}>
                                    {loading ? loadingMessage : 'Generate Outline'}
                                </Button>
                            </>
                        )}
                        {outlineVisible === true && (
                            <>
                                <Typography variant="body1" marginBottom="16px" textAlign="left">
                                    Here is the outline for your story. Read the outline and adjust it to your wishes.
                                </Typography>
                                <OutlineEditor
                                    outline={outline}
                                    onUseOutline={() => {
                                        handleGenerateHooks()
                                        setExpandedStep('step4');
                                        setFullStory(null);
                                        handleGenerateStoryInBackground();
                                    }}
                                    onUpdateOutline={(editedOutline) => {
                                        setOutline(editedOutline);
                                        setHooks([]);
                                        setSelectedHook(null);
                                        //handleGenerateStoryInBackground();
                                    }}
                                />
                            </>
                        )}
                    </AccordionDetails>
                </Accordion>
            )}

            {outlineVisible === true && (
                <Accordion expanded={expandedStep === 'step4'} onChange={handleExpandStep('step4')} sx={loadingAccordion === 'step4' ? loadingBorderStyle : accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h4">
                            {hooks.length === 0 ? 'Generate Hooks' : confirmedHook ? confirmedHook.split(' ').slice(0, 6).join(' ') + '...' : '5 Hooks Generated'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {hooks.length === 0 ? (
                            <>
                                <Typography variant="body1" marginBottom="16px" textAlign="left">
                                    Hooks are used to grab the attention of the listener and pull them into the story.
                                </Typography>
                                <Button onClick={generateHooksButton} variant="contained" disabled={loading} style={loading ? generatingButtonStyle : buttonStyle}>
                                    {loading ? loadingMessage : 'Generate Hooks'}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Typography variant="body1" marginBottom="16px" textAlign="left">
                                    We've selected what we find to be the best hook based on our research, but we give you 4 other options to choose from. <br />They are ranked by number.
                                </Typography>
                                <HookSelector
                                    hooks={hooks}
                                    onSelect={setSelectedHook}
                                    selectedHook={selectedHook}
                                    onConfirm={handleConfirmHook}
                                />
                            </>
                        )}
                    </AccordionDetails>
                </Accordion>
            )}

            {selectedHook && (
                <Accordion expanded={expandedStep === 'step6'} onChange={handleExpandStep('step6')} sx={loadingAccordion === 'step6' ? loadingBorderStyle : accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h4">Generate Final Story</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box textAlign="center">
                            <Typography mb={4}>We are using Articial Creativity to create a consistent and compelling story.</Typography>
                            <Button
                                variant="contained"
                                onClick={handleGenerateStory}
                                disabled={loading}
                                style={loading ? generatingButtonStyle : buttonStyle}
                            >
                                {loading ? loadingMessage : 'Generate Story'}
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            )}
            {finalStory && (
                <Box sx={loadingAccordion === 'step7' ? loadingBorderStyle : {}}>
                    <Typography variant="h4">Generated Story</Typography>
                    <Box>
                        <pre>{finalStory}</pre> {/* Ensure <pre> is not inside <Typography> */}
                    </Box>    
                </Box>
            )}
        </Box>
    );
}

export default GenerateStoryComp;
