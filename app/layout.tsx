import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material'
import { pokemonTheme } from '../theme/theme'
import Header from '../components/Header/Header'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { CardProvider } from '@/components/CardContext/CardContext'
import ClientProvider from '@/components/CardContext/ClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokemon App',
  description: 'Pokemon Card Battle Game',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={pokemonTheme}>
          <CssBaseline />
          <ClientProvider>
            <Header />
            <Box className="flex flex-1 h-screen">
              <Container>
                <Suspense fallback={<Loader />}>{children}</Suspense>
              </Container>
            </Box>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
