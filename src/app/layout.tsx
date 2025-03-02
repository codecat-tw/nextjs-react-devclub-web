import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: "首頁 | Next.js / React 讀書會",
    template: "%s | Next.js / React 讀書會",
  },
  description: "全台唯一面向初學者的網頁開發讀書會"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
