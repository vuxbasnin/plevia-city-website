
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Briefcase, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NextImage from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import ContactFormDialog from '@/components/shared/ContactFormDialog';
import NavigationLink from '@/components/shared/NavigationLink';
import { usePathname } from 'next/navigation';
import './Navbar.css';
import { useSiteSettings } from '@/context/SiteSettingsContext';

// Navigation links based on the image
const navLinks = [
  {
    href: '/storyline',
    label: 'Câu chuyện kiến tạo',
    hasDropdown: false
  },
  { 
    href: '/location', 
    label: 'Kết nối & Tiện ích',
    hasDropdown: false 
  },
  { 
    href: '/lifestyle',
    label: 'Phong cách sống',
    hasDropdown: false 
  },
  { 
    href: '/news', 
    label: 'Tin tức',
    hasDropdown: false 
  }
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { siteSettings, isLoading: isLoadingSettings } = useSiteSettings();
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



  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const isHomepage = pathname === '/';
  const isTransparentState = !isScrolled && !isMobileMenuOpen;

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
          {/* Logo Section - SVG mới */}
          <Link href="/" passHref>
            <img
              src="/Logo_Standard_Final-14.svg"
              alt="Logo"
              width={300}
              height={300}
              className="navbar-logo-img"
              style={{ objectFit: 'contain', display: 'block', marginLeft: 0, marginRight: 0, cursor: 'pointer' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-desktop-menu">
            {navLinks.map((link, idx) => (
              <NavigationLink
                key={link.href}
                href={link.href}
                label={link.label}
                isTransparent={isTransparentState}
                onClick={handleLinkClick}
                className={idx === 0 ? 'navbar-nav-first' : ''}
              />
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
