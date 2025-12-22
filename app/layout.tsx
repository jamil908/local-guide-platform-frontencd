import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LocalGuide - Discover Authentic Experiences',
  description: 'Connect with local experts for personalized tours and authentic travel experiences',
  keywords: 'travel, tours, local guides, experiences, tourism',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}
      suppressHydrationWarning={true}>
        <Providers>
<AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow bg-gray-900 min-h-screen">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
        </Providers>
        
      </body>
    </html>
  );
}