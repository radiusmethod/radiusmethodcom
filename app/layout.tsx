import React from 'react';
import './globals.css';
import Header from './components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crystal Tower by Radius Method',
  description: 'The Modern Software Factory for High-Governance Environments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="content">
          {children}
        </main>
      </body>
    </html>
  );
}
