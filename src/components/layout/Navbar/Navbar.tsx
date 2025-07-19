
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Briefcase, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NextImage from 'next/image';
import { getSiteSettingsData } from '@/lib/firestoreService';
import type { SiteSettingsData } from '@/types/landingPageAdmin';
import { defaultSiteSettingsData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import ContactFormDialog from '@/components/shared/ContactFormDialog';
import { usePathname } from 'next/navigation';
import './Navbar.css';

// Navigation links based on the image
const navLinks = [
  { 
    href: '/#project', 
    label: 'Về dự án',
    hasDropdown: false 
  },
  { 
    href: '/#location', 
    label: 'Vị trí, tiện ích',
    hasDropdown: false 
  },
  { 
    href: '/#stylelife', 
    label: 'Phong cách sống',
    hasDropdown: false 
  },
  { 
    href: '/#news', 
    label: 'Tin tức',
    hasDropdown: false 
  }
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>(defaultSiteSettingsData);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const newScrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
          
          // Update scroll direction with debounce
          if (Math.abs(currentScrollY - lastScrollY) > 5) {
            setScrollDirection(newScrollDirection);
          }
          
          // Smooth scroll state update
          const scrollThreshold = 20;
          const isCurrentlyScrolled = currentScrollY > scrollThreshold;
          
          // Only update if state actually changed to prevent unnecessary re-renders
          if (isCurrentlyScrolled !== isScrolled) {
            setIsScrolled(isCurrentlyScrolled);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]); // Removed isScrolled from dependencies

  // Separate useEffect for loading settings
  useEffect(() => {
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
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const isHomepage = pathname === '/';
  const isTransparentState = isHomepage && !isScrolled && !isMobileMenuOpen;

  // Memoized values to prevent unnecessary recalculations
  const backgroundOpacity = React.useMemo(() => {
    if (!isHomepage || isMobileMenuOpen) return 0.95;
    if (isScrolled) return 0.95;
    return 0;
  }, [isHomepage, isMobileMenuOpen, isScrolled]);

  const logoEffects = React.useMemo(() => {
    if (isTransparentState) {
      return {
        scale: 1,
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
      };
    }
    return {
      scale: 0.95,
      filter: 'none',
    };
  }, [isTransparentState]);

  const textEffects = React.useMemo(() => {
    if (isTransparentState) {
      return {
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
      };
    }
    return {
      textShadow: 'none',
    };
  }, [isTransparentState]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`navbar ${isTransparentState ? 'navbar-transparent' : 'navbar-solid'}`}
      role="navigation"
    >
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo Section */}
          <Link href="/" passHref>
            <motion.span 
              className={`navbar-logo ${isTransparentState ? 'navbar-logo-transparent' : 'navbar-logo-solid'}`}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isLoadingSettings ? (
                <Skeleton className="navbar-logo-skeleton" />
              ) : siteSettings.logoUrl ? (
                <NextImage
                  src={siteSettings.logoUrl}
                  alt={`${siteSettings.companyName || 'Site'} Logo`}
                  width={40} 
                  height={40} 
                  className="navbar-logo-image" 
                  priority
                />
              ) : (
                <Briefcase className="navbar-logo-fallback" />
              )}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-desktop-menu">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
                className="navbar-link-wrapper"
              >
                <Link href={link.href} passHref>
                  <motion.span 
                    className={`navbar-link ${isTransparentState ? 'navbar-link-transparent' : 'navbar-link-solid'}`}
                    transition={{ duration: 0.3 }}
                    onClick={handleLinkClick}
                  >
                    <div className="navbar-link-content">
                      <span className="navbar-link-main">
                        {link.label}
                      </span>
                      {link.hasDropdown && (
                        <ChevronDown className="navbar-link-dropdown" />
                      )}
                    </div>
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="navbar-mobile-toggle">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className="navbar-mobile-button"
            >
              {isMobileMenuOpen ? <X className="navbar-mobile-icon" /> : <Menu className="navbar-mobile-icon" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="navbar-mobile-menu"
          >
            <div className="navbar-mobile-container">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link href={link.href} passHref>
                    <span
                      className="navbar-mobile-link"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
