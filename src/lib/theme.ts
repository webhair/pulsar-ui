import { alpha, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import mediaQuery from 'css-mediaquery';
import { Inter } from 'next/font/google';

export type DeviceType = 'mobile' | 'desktop';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '600', '700']
})

const ssrMatchMedia = (deviceType: DeviceType) => (query: string) => ({
  matches: mediaQuery.match(query, {
    width: deviceType === 'mobile' ? '0px' : '1024px',
  }),
});

const transparent1 = alpha(grey[500], 0.2);
const transparent2 = alpha(grey[500], 0.14);
const transparent3 = alpha(grey[500], 0.12);

export const getTheme = (deviceType: DeviceType) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#021e2b'
      },
      background: {
        default: '#ffffff',
        paper: '#FBFCFE'
      },
      divider: '#CDD7E1'
    },
    shape: {
      borderRadius: 6
    },
    shadows: [
      'none',
      `0px 2px 1px -1px ${transparent1},0px 1px 1px 0px ${transparent2},0px 1px 3px 0px ${transparent3}`,
      `0px 3px 1px -2px ${transparent1},0px 2px 2px 0px ${transparent2},0px 1px 5px 0px ${transparent3}`,
      `0px 3px 3px -2px ${transparent1},0px 3px 4px 0px ${transparent2},0px 1px 8px 0px ${transparent3}`,
      `0px 2px 4px -1px ${transparent1},0px 4px 5px 0px ${transparent2},0px 1px 10px 0px ${transparent3}`,
      `0px 3px 5px -1px ${transparent1},0px 5px 8px 0px ${transparent2},0px 1px 14px 0px ${transparent3}`,
      `0px 3px 5px -1px ${transparent1},0px 6px 10px 0px ${transparent2},0px 1px 18px 0px ${transparent3}`,
      `0px 4px 5px -2px ${transparent1},0px 7px 10px 1px ${transparent2},0px 2px 16px 1px ${transparent3}`,
      `0px 5px 5px -3px ${transparent1},0px 8px 10px 1px ${transparent2},0px 3px 14px 2px ${transparent3}`,
      `0px 5px 6px -3px ${transparent1},0px 9px 12px 1px ${transparent2},0px 3px 16px 2px ${transparent3}`,
      `0px 6px 6px -3px ${transparent1},0px 10px 14px 1px ${transparent2},0px 4px 18px 3px ${transparent3}`,
      `0px 6px 7px -4px ${transparent1},0px 11px 15px 1px ${transparent2},0px 4px 20px 3px ${transparent3}`,
      `0px 7px 8px -4px ${transparent1},0px 12px 17px 2px ${transparent2},0px 5px 22px 4px ${transparent3}`,
      `0px 7px 8px -4px ${transparent1},0px 13px 19px 2px ${transparent2},0px 5px 24px 4px ${transparent3}`,
      `0px 7px 9px -4px ${transparent1},0px 14px 21px 2px ${transparent2},0px 5px 26px 4px ${transparent3}`,
      `0px 8px 9px -5px ${transparent1},0px 15px 22px 2px ${transparent2},0px 6px 28px 5px ${transparent3}`,
      `0px 8px 10px -5px ${transparent1},0px 16px 24px 2px ${transparent2},0px 6px 30px 5px ${transparent3}`,
      `0px 8px 11px -5px ${transparent1},0px 17px 26px 2px ${transparent2},0px 6px 32px 5px ${transparent3}`,
      `0px 9px 11px -5px ${transparent1},0px 18px 28px 2px ${transparent2},0px 7px 34px 6px ${transparent3}`,
      `0px 9px 12px -6px ${transparent1},0px 19px 29px 2px ${transparent2},0px 7px 36px 6px ${transparent3}`,
      `0px 10px 13px -6px ${transparent1},0px 20px 31px 3px ${transparent2},0px 8px 38px 7px ${transparent3}`,
      `0px 10px 13px -6px ${transparent1},0px 21px 33px 3px ${transparent2},0px 8px 40px 7px ${transparent3}`,
      `0px 10px 14px -6px ${transparent1},0px 22px 35px 3px ${transparent2},0px 8px 42px 7px ${transparent3}`,
      `0px 11px 14px -7px ${transparent1},0px 23px 36px 3px ${transparent2},0px 9px 44px 8px ${transparent3}`,
      `0px 11px 15px -7px ${transparent1},0px 24px 38px 3px ${transparent2},0px 9px 46px 8px ${transparent3}`,
    ],
    typography: {
      fontFamily: inter.style.fontFamily,
    },
  });

  theme.components = {
    MuiUseMediaQuery: {
      defaultProps: { ssrMatchMedia: ssrMatchMedia(deviceType) }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px ${theme.palette.divider} solid`,
        }
      },
      defaultProps: {
        elevation: 2,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: `1px ${theme.palette.divider} solid`,
          boxShadow: '0px 1px 2px 0px rgba(21, 21, 21, 0.08)'
        }
      }
    },
    MuiListItem: {
      defaultProps: {
        disablePadding: true,
      },
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(1),
          overflow: 'hidden',
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 500,
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingBlock: theme.spacing(0.25),
          paddingInline: theme.spacing(1)
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: theme.palette.background.paper,
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: theme.spacing(1, '!important'),
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderTop: 'none',
          width: 240,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden'
        }
      }
    }
  }

  return theme;
}
