
"use client";

import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import SeatingOptionsSection from '@/components/sections/SeatingOptionsSection';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import MemberBenefitsSection from '@/components/sections/MemberBenefitsSection';
import CommunityCultureSection from '@/components/sections/CommunityCultureSection';
import FinalCallToActionSection from '@/components/sections/FinalCallToActionSection';
import Footer from '@/components/layout/Footer';
import BackToTopButton from '@/components/shared/BackToTopButton';
import FloatingActionButtons from '@/components/shared/FloatingActionButtons';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <SeatingOptionsSection />
          <AmenitiesSection />
          <MemberBenefitsSection />
          <CommunityCultureSection />
          <FinalCallToActionSection />
        </main>
        <Footer />
        <FloatingActionButtons />
        <BackToTopButton />
      </div>
    </div>
  );
}

