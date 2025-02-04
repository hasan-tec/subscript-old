import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Dark mode
    primary: {
      main: '#0047ff', // blue
    },
    secondary: {
      main: '#9370DB', // Purple
    },
    background: {
      default: '#0A0A0A', // Dark background
      paper: '#1A1A1A', // Slightly darker for cards or paper components
    },
    text: {
      primary: '#ffffff', // Primary text color
      secondary: '#888888', // Secondary text color
    },
    highlight: {
      main: '#0047ff', // Highlight color for selected items
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Font family
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#ffffff', // H1 color
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.8rem',
      color: '#ffffff', // H4 color
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#ffffff', // H6 color
    },
    body1: {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontSize: '1rem',
      color: '#dddddd',
      lineHeight: 1.6,
    },  
    body2: {
      color: '#ffffff',
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.9rem',
      color: '#aaaaaa', // Caption text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          padding: '10px 20px',
          boxShadow: '0px 4px 12px rgba(0, 71, 255, 0.3)',
          color: '#ffffff', // Button text color
          '&:hover': {
            boxShadow: '0px 6px 16px rgba(0, 71, 255, 0.4)',
          },
        },
        contained: {
          backgroundColor: '#0047ff', // Contained button background color
          color: '#ffffff', // Contained button text color
          '&:hover': {
            backgroundColor: '#336eff', // Contained button hover background color
          },
        },
        outlined: {
          backgroundColor: '#ffffff', // Outlined button background color
          borderColor: '#0047ff', // Outlined button border color
          color: '#0047ff', // Outlined button text color
          '&:hover': {
            color: '#ffffff', // Outlined button hover text color
            borderColor: '#9370DB', // Outlined button hover border color
            backgroundColor: '#9370DB', // Outlined button hover background color
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: '16px', // Typography margin bottom
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: '#181818', // Modal background color
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#00bcd4', // Circular progress color
          animationDuration: '1.5s',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Rounded corners for Accordion
          marginBottom: '16px',
          backgroundColor: '#181818', // Accordion background color
          '&:before': {
            display: 'none', // Remove the default divider line
          },
          overflow: 'hidden',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          padding: '12px', // Default padding for Box
        },
        overflow: 'hidden',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fffff', // Hover border color
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9370DB', // Focused border color
          },
        },
        input: {
          color: '#ffffff', // Text color
        },
        notchedOutline: {
          borderColor: '#888888', // Default border color
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff', // Label color
          '&.Mui-focused': {
            color: '#ffffff', // Focused label color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#181818',
          color: '#ffffff', // Ensure card text color is white
          borderRadius: '12px',
          boxShadow: '#9370DB',
          transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
          '&:hover': {
            borderColor: '#0047ff',
            transform: 'scale(1.02)',
            boxShadow: '0px 4px 12px rgba(0, 71, 255, 0.2)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px',
          '&:last-child': {
            paddingBottom: '16px',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#888888', // Default link color
          '&:hover': {
            color: '#9370DB', // Hover color for links
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          textAlign: 'left', // Align text to the left
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          textAlign: 'left', // Align text to the left
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          textAlign: 'left', // Align default option to the left
        },
      },
    },
  },
});

export default theme;