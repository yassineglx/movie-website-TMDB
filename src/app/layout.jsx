import { Inter } from 'next/font/google'
import { AuthProvider } from '../contexts/auth-context'
import { Header } from '../components/header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MovieHub',
  description: 'Discover and favorite your movies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

