import { Metadata } from "next";
import { headers } from 'next/headers';
import parser from 'ua-parser-js';
import ThemeRegistry from '@/components/ThemeRegistry';
import { DeviceType } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Next Mui template',
  description: 'Questo è un template.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const userAgent = headers().get('User-Agent')
  const deviceType = parser(userAgent ?? '').device.type ?? 'desktop'

  return (
    <html lang="it">
      <body>
        <ThemeRegistry
          deviceType={deviceType as DeviceType}
          options={{ key: 'mui' }}
        >
          <main>
            {children}
          </main>
        </ThemeRegistry>
      </body>
    </html>
  )
}
