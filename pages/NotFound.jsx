import { Box, Typography } from '@mui/material';

function NotFound() {
    return (
        <Box textAlign="center" py={10}>
            <Typography variant="h2" color="error">404 Not Found</Typography>
            <Typography variant="h6" color="textSecondary">
                Sorry, the page you're looking for is not found!
            </Typography>
        </Box>
    );
}

export default NotFound;