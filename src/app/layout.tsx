import { Metadata } from "next";
import { cookies, headers } from 'next/headers';
import parser from 'ua-parser-js';
import ThemeRegistry from '@/components/ThemeRegistry';
import { DeviceType } from '@/lib/theme';
import { GlobalAlerts } from '@/components/GlobalAlerts';
import { AuthInitializer } from "@/lib/states/auth/AuthInitializer";
import useAuth from "@/lib/states/auth/useAuth";

export const metadata: Metadata = {
  title: 'Next Mui template',
  description: 'Questo è un template.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()

  const accessToken = cookieStore.get('accessToken')?.value ?? ''
  const refreshToken = cookieStore.get('refreshToken')?.value ?? ''

  useAuth.setState({
    tokens: {
      accessToken,
      refreshToken
    }
  })

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
            <AuthInitializer
              state={{
                tokens: {
                  accessToken,
                  refreshToken
                }
              }}
            />
            <GlobalAlerts/>
            {children}
          </main>
        </ThemeRegistry>
      </body>
    </html>
  )
}
