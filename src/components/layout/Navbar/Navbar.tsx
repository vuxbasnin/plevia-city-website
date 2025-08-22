
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
import { usePathname, useRouter } from 'next/navigation';
import './Navbar.css';
import { useSiteSettings } from '@/context/SiteSettingsContext';

// Navigation links based on the image
const navLinks: Array<{
  href: string;
  label: string;
  hasDropdown: boolean;
  isExternal?: boolean;
  openInNewTab?: boolean;
  dropdownItems?: Array<{ href: string; label: string }>;
}> = [
    {
      href: '/iot',
      label: 'Công nghệ vận hành AI',
      hasDropdown: false
    },
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
      hasDropdown: true,
      dropdownItems: [
        { href: '/lifestyle#house-models', label: 'Các mẫu nhà' },
        { href: '/lifestyle#furniture-models', label: 'Mẫu nội thất' }
      ]
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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle hydration
  useEffect(() => {
    // Set initial scroll state before hydration
    const initialScrollY = window.scrollY;
    const initialIsScrolled = initialScrollY > 20;
    setIsScrolled(initialIsScrolled);
    setLastScrollY(initialScrollY);
    
    // Mark as hydrated immediately to prevent mismatch
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 20;
      const isCurrentlyScrolled = currentScrollY > scrollThreshold;

      // Debug log (temporarily disabled)
      // console.log('Scroll Debug:', {
      //   currentScrollY,
      //   scrollThreshold,
      //   isCurrentlyScrolled,
      //   isScrolled,
      //   willUpdate: isCurrentlyScrolled !== isScrolled
      // });

      // Update scroll state immediately
      setIsScrolled(isCurrentlyScrolled);

      // Update scroll direction
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        const newScrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        setScrollDirection(newScrollDirection);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHydrated]); // Simplified dependencies



  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
    // Reset dropdown state when closing mobile menu
    setMobileDropdownOpen(null);
  };

  const handleMobileDropdownToggle = (linkHref: string) => {
    if (mobileDropdownOpen === linkHref) {
      // Nếu dropdown đang mở, navigate đến page và đóng menu
      setMobileDropdownOpen(null);
      handleLinkClick();
      router.push(linkHref);
    } else {
      // Nếu dropdown đang đóng, mở dropdown
      setMobileDropdownOpen(linkHref);
    }
  };

  const isHomepage = pathname === '/';
  // Navbar transparent khi ở đầu trang (không scroll) và không có mobile menu mở
  const isTransparentState = !isScrolled && !isMobileMenuOpen;

  // Debug log for navbar state (temporarily disabled)
  // console.log('Navbar State Debug:', {
  //   isScrolled,
  //   isMobileMenuOpen,
  //   isTransparentState,
  //   navbarClass: isTransparentState ? 'navbar-transparent' : 'navbar-solid'
  // });

  // Memoized values to prevent unnecessary recalculations
  const backgroundOpacity = React.useMemo(() => {
    if (isMobileMenuOpen) return 0.95;
    if (isScrolled) return 0.95;
    return 0;
  }, [isMobileMenuOpen, isScrolled]);

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

  // Don't render until hydrated to prevent hydration mismatch
  if (!isHydrated) {
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
            <Link href="/" passHref>
              <img
                src="/Logo_Standard_Final-7.png"
                alt="Logo"
                width={300}
                height={300}
                className="navbar-logo-img"
                style={{ objectFit: 'contain', display: 'block', marginLeft: 0, marginRight: 0, cursor: 'pointer' }}
              />
            </Link>
            <div className="navbar-mobile-toggle">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle menu"
                className="navbar-mobile-button"
              >
                <Menu className="navbar-mobile-icon" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
    );
  }

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
              src="/Logo_Standard_Final-7.png"
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
                isExternal={link.isExternal}
                openInNewTab={link.openInNewTab}
                hasDropdown={link.hasDropdown}
                dropdownItems={link.dropdownItems}
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
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                const isDropdownOpen = mobileDropdownOpen === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target={link.openInNewTab ? "_blank" : "_self"}
                        rel={link.openInNewTab ? "noopener noreferrer" : ""}
                        className={cn(
                          "navbar-mobile-link",
                          isActive && "navbar-mobile-link-active"
                        )}
                        onClick={handleLinkClick}
                      >
                        {link.label}
                      </a>
                    ) : link.hasDropdown ? (
                      // Dropdown link - only toggle dropdown, don't navigate
                      <span
                        className={cn(
                          "navbar-mobile-link",
                          isActive && "navbar-mobile-link-active"
                        )}
                        onClick={() => handleMobileDropdownToggle(link.href)}
                      >
                        {link.label}
                        <ChevronDown 
                          className={cn(
                            "navbar-mobile-dropdown-icon",
                            isDropdownOpen && "navbar-mobile-dropdown-icon-rotated"
                          )} 
                        />
                      </span>
                    ) : (
                      // Regular link - navigate and close menu
                      <Link href={link.href} passHref>
                        <span
                          className={cn(
                            "navbar-mobile-link",
                            isActive && "navbar-mobile-link-active"
                          )}
                          onClick={handleLinkClick}
                        >
                          {link.label}
                        </span>
                      </Link>
                    )}

                    {/* Mobile dropdown items - only show when dropdown is open */}
                    {link.hasDropdown && link.dropdownItems && isDropdownOpen && (
                      <AnimatePresence>
                        <motion.div 
                          className="navbar-mobile-dropdown"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {link.dropdownItems.map((dropdownItem, dropdownIndex) => {
                            const isDropdownActive = pathname === dropdownItem.href;
                            return (
                              <motion.div
                                key={dropdownItem.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: dropdownIndex * 0.05, duration: 0.3 }}
                              >
                                <span
                                  className={cn(
                                    "navbar-mobile-dropdown-item",
                                    isDropdownActive && "navbar-mobile-dropdown-item-active"
                                  )}
                                  onClick={() => {
                                    handleLinkClick();
                                    // Handle scroll for mobile
                                    if (dropdownItem.href.includes('#')) {
                                      const [path, sectionId] = dropdownItem.href.split('#');
                                      if (pathname === '/lifestyle' && sectionId) {
                                        const element = document.getElementById(sectionId);
                                        if (element) {
                                          element.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                          });
                                        }
                                      } else if (pathname !== '/lifestyle' && path === '/lifestyle') {
                                        router.push(dropdownItem.href);
                                      }
                                    }
                                  }}
                                >
                                  {dropdownItem.label}
                                </span>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
