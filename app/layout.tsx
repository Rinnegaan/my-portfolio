import type { Metadata } from 'next';
import { Rajdhani, Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import BootAnimation from '@/components/ui/BootAnimation';
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
  keywords: [
    'Ayush Kumar', 
    'Digital Forensics', 
    'Cybersecurity', 
    'Forensic Science', 
    'Parul University', 
    'OSINT', 
    'TryHackMe', 
    'Information Security', 
    'Cyber Investigator'
  ],
  authors: [{ name: 'Ayush Kumar' }],
  creator: 'Ayush Kumar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ayush-portfolio.vercel.app', 
    title: 'Ayush Kumar | Digital Forensics & Cybersecurity',
    description: 'B.Sc. Forensic Science (Hons.) student specializing in digital forensics, OSINT, and cybercrime investigation.',
    siteName: 'Ayush Kumar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Kumar | Digital Forensics & Cybersecurity',
    description: 'Digital Forensics & Cybersecurity Portfolio by Ayush Kumar.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${rajdhani.variable} ${orbitron.variable} ${jetbrains.variable} font-sans antialiased`}>
        <BootAnimation />
        {children}
      </body>
    </html>
  );
}
