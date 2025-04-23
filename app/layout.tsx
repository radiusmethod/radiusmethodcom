import React from 'react';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getBasePath, withBasePath } from './utils/basePath';

const inter = Inter({ subsets: ['latin'] });

// Get the base path
const basePath = getBasePath();

export const metadata: Metadata = {
  title: 'Radius Method',
  description: 'The modern software factory for high-governance environments',
  icons: {
    icon: withBasePath('/images/favicon.png'),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-basepath={basePath}>
      <head>
        <link rel="icon" href={withBasePath('/images/favicon.png')} />
        {/* Script to set CSS variables for base path */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.style.setProperty('--base-path', '${basePath}');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="content">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
