import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

const FooterContainer = styled('footer')(({ theme }) => ({
    backgroundColor: '#181818', 
    padding: theme.spacing(6, 0),
    boxShadow: '0 0 6px 1px #9370DB', // Add box shadow similar to the header
    marginTop: 'auto',
}));

const Section = styled(Grid)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const Footer = () => {
    return (
        <FooterContainer>
            <Container>
                <Grid container spacing={4}>
                    <Section item xs={12} sm={4}>
                        <Typography variant="h6">Tools</Typography>
                        <ul>
                            <li><Link component={RouterLink} to="/youtube-transcript-generator">YouTube Transcript Generator</Link></li>
                            <li><Link component={RouterLink} to="/tool2">Tool 2</Link></li>
                            <li><Link component={RouterLink} to="/tool3">Tool 3</Link></li>
                        </ul>
                    </Section>
                    <Section item xs={12} sm={4}>
                        <Typography variant="h6">Company</Typography>
                        <ul>
                            <li><Link component={RouterLink} to="/about">About Us</Link></li>
                            <li><Link component={RouterLink} to="/careers">Careers</Link></li>
                            <li><Link component={RouterLink} to="/contact">Contact</Link></li>
                        </ul>
                    </Section>
                    <Section item xs={12} sm={4}>
                        <Typography variant="h6">Guides</Typography>
                        <ul>
                            <li><Link component={RouterLink} to="/guide1">Guide 1</Link></li>
                            <li><Link component={RouterLink} to="/guide2">Guide 2</Link></li>
                            <li><Link component={RouterLink} to="/guide3">Guide 3</Link></li>
                        </ul>
                    </Section>
                </Grid>
            </Container>
        </FooterContainer>
    );
}

export default Footer;
