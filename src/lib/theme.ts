import { Inter } from 'next/font/google'
import mediaQuery from 'css-mediaquery';
import { createTheme } from '@mui/material';

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

export const getTheme = (deviceType: DeviceType) => createTheme({
  palette: {},
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiUseMediaQuery: {
      defaultProps: { ssrMatchMedia: ssrMatchMedia(deviceType) }
    },
  }
})