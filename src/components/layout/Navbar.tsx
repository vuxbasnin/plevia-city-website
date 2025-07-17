
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Briefcase, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NextImage from 'next/image';
import { getSiteSettingsData } from '@/lib/firestoreService';
import type { SiteSettingsData } from '@/types/landingPageAdmin';
import { defaultSiteSettingsData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import ContactFormDialog from '@/components/shared/ContactFormDialog';
import { usePathname } from 'next/navigation'; // Import usePathname

const navLinks = [
  { href: '/#seating-options', label: 'Vị Trí Ngồi' },
  { href: '/#amenities', label: 'Dịch Vụ' },
  { href: '/#member-benefits', label: 'Quyền Lợi' },
  { href: '/#community-culture', label: 'Văn Hóa' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>(defaultSiteSettingsData);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const pathname = usePathname(); // Get current pathname

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    async function loadSiteSettings() {
      setIsLoadingSettings(true);
      try {
        const settings = await getSiteSettingsData();
        setSiteSettings(settings || defaultSiteSettingsData);
      } catch (error) {
        console.error("Error loading site settings for Navbar:", error);
        setSiteSettings(defaultSiteSettingsData);
      }
      setIsLoadingSettings(false);
    }
    loadSiteSettings();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const isHomepage = pathname === '/';
  const isTransparentState = isHomepage && !isScrolled && !isMobileMenuOpen;

  const navContainerClasses = cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isTransparentState
          ? 'bg-transparent border-transparent'
          : 'bg-card/95 backdrop-blur-sm shadow-md border-border'
  );

  const navLinkClasses = cn(
    "font-medium transition-colors duration-300 text-sm lg:text-base",
    isTransparentState
      ? "text-primary-foreground hover:text-primary-foreground/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]"
      : "text-foreground hover:text-primary"
  );

  const logoTextClasses = cn(
    "transition-colors duration-300",
    isTransparentState ? "text-primary-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]" : "text-primary"
  );

  const logoIconContainerClasses = cn(
    "transition-all duration-300 flex items-center justify-center",
    isScrolled || !isHomepage ? "scale-90" : "scale-100", 
    siteSettings.logoUrl ? "w-auto h-8 lg:h-10" : "w-7 h-7 lg:w-8 lg:h-8" 
  );
  
  const logoIconClasses = cn(
     "transition-all duration-300",
     isTransparentState ? "text-primary-foreground" : "text-primary"
  );


  const mobileMenuIconClasses = cn(
    "h-6 w-6 transition-colors duration-300",
    isTransparentState ? "text-primary-foreground" : "text-primary"
  );

  const ctaButton = (
    <Button
      size="lg"
      className="group bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 text-base lg:text-lg rounded-xl shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Đăng ký dùng thử"
    >
      <span className="inline-flex items-center gap-2">
        Đăng Ký Dùng Thử
        <MessageCircle className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Button>
  );
   const ctaButtonMobile = (
    <Button
      className="w-full group bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 text-base rounded-xl shadow-md transition-all duration-300 hover:scale-105"
      onClick={handleLinkClick}
    >
      <span className="inline-flex items-center justify-center gap-2">
        Đăng Ký Dùng Thử
        <MessageCircle className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Button>
  );


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={navContainerClasses}
      role="navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" passHref >
            <span className={cn("flex items-center space-x-2 text-2xl lg:text-3xl font-headline font-bold hover:opacity-80", logoTextClasses)}>
              <div className={logoIconContainerClasses}>
                {isLoadingSettings ? (
                  <Skeleton className={cn("rounded", siteSettings.logoUrl ? "w-24 h-8 lg:h-10" : "w-7 h-7 lg:w-8 lg:h-8")} />
                ) : siteSettings.logoUrl ? (
                  <NextImage
                    src={siteSettings.logoUrl}
                    alt={`${siteSettings.companyName || 'Site'} Logo`}
                    width={120} 
                    height={40} 
                    className="object-contain h-full w-auto" 
                    priority
                  />
                ) : (
                  <Briefcase className={cn(logoIconClasses, "w-full h-full")} />
                )}
              </div>
              <span>{isLoadingSettings ? <Skeleton className="h-7 w-32" /> : siteSettings.companyName}</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4 sm:space-x-6 lg:space-x-10">
            {isHomepage && navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link href={link.href} passHref >
                  <span className={navLinkClasses} onClick={handleLinkClick}>
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ContactFormDialog 
                triggerButton={ctaButton} 
                dialogTitle="Đăng ký dùng thử ngay"
                dialogDescription="Để lại thông tin của bạn để được tư vấn và trải nghiệm không gian làm việc của chúng tôi."
                submitButtonText="Gửi Đăng Ký"
              />
            </motion.div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className={mobileMenuIconClasses} /> : <Menu className={mobileMenuIconClasses} />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-card pb-4 border-t border-border"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-4 pt-4">
            {isHomepage && navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link href={link.href} passHref >
                  <span
                    className="text-foreground hover:text-primary transition-colors duration-300 py-2 text-center font-medium block"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isHomepage ? 0.05 * navLinks.length : 0.05 }}
            >
              <ContactFormDialog 
                triggerButton={ctaButtonMobile} 
                dialogTitle="Đăng ký dùng thử ngay"
                dialogDescription="Để lại thông tin của bạn để được tư vấn và trải nghiệm không gian làm việc của chúng tôi."
                submitButtonText="Gửi Đăng Ký"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
