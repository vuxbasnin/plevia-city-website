"use client";

import { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import BackToTopButton from '@/components/shared/BackToTopButton';
import FloatingActionButtons from '@/components/shared/FloatingActionButtons';

interface PageLayoutProps {
  children: ReactNode;
  showFloatingButtons?: boolean;
  showBackToTop?: boolean;
  className?: string;
}

export default function PageLayout({ 
  children, 
  showFloatingButtons = true, 
  showBackToTop = true,
  className = "relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
}: PageLayoutProps) {
  return (
    <div className={`${className} w-full max-w-full overflow-x-hidden`}>
      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
        <Navbar />
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
        {showFloatingButtons && <FloatingActionButtons />}
        {showBackToTop && <BackToTopButton />}
      </div>
    </div>
  );
} 