import type { Metadata } from 'next';
import { Rajdhani, Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const rajdhani = Rajdhani({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani'
});

const orbitron = Orbitron({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700', '900'],
  variable: '--font-orbitron'
});

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'Ayush Kumar | Digital Forensics & Cybersecurity',
  description: 'Applying scientific principles and analytical reasoning to interpret forensic evidence and investigate digital and physical crime.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${rajdhani.variable} ${orbitron.variable} ${jetbrains.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
