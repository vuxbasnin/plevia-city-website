"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  isTransparent?: boolean;
  isExternal?: boolean;
  openInNewTab?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: Array<{ href: string; label: string }>;
}

// Hàm chia text thành 2 dòng
const splitTextIntoTwoLines = (text: string) => {
  const words = text.split(' ');
  if (words.length <= 2) {
    return { firstLine: text, secondLine: '' };
  }
  
  // Logic chia text thông minh hơn
  if (text.includes('&')) {
    // Nếu có dấu &, chia theo dấu &
    const parts = text.split('&');
    if (parts.length === 2) {
      return { firstLine: parts[0].trim(), secondLine: '& ' + parts[1].trim() };
    }
  }
  
  // Chia theo số từ - đảm bảo tối đa 2 dòng
  const midPoint = Math.ceil(words.length / 2);
  const firstLine = words.slice(0, midPoint).join(' ');
  const secondLine = words.slice(midPoint).join(' ');
  
  // Kiểm tra độ dài để đảm bảo không quá dài
  if (firstLine.length > 12 || secondLine.length > 12) {
    // Nếu quá dài, chia lại
    const shorterMidPoint = Math.ceil(words.length / 2.5);
    return {
      firstLine: words.slice(0, shorterMidPoint).join(' '),
      secondLine: words.slice(shorterMidPoint).join(' ')
    };
  }
  
  return { firstLine, secondLine };
};

export default function NavigationLink({ 
  href, 
  label, 
  className,
  onClick,
  isTransparent = false,
  isExternal = false,
  openInNewTab = false,
  hasDropdown = false,
  dropdownItems = []
}: NavigationLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { firstLine, secondLine } = splitTextIntoTwoLines(label);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle scroll to section when navigating from other pages
  useEffect(() => {
    if (pathname === '/lifestyle' && typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          // Delay scroll to ensure page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 500);
        }
      }
    }
  }, [pathname]);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    
    // Nếu là external link và cần mở tab mới, không cần preventDefault
    if (isExternal && openInNewTab) {
      return;
    }
  };

  const handleDropdownItemClick = (dropdownHref: string) => {
    setIsDropdownOpen(false);
    
    // Kiểm tra nếu dropdown href có anchor
    if (dropdownHref.includes('#')) {
      const [path, sectionId] = dropdownHref.split('#');
      
      // Nếu đang ở trang lifestyle và có section
      if (pathname === '/lifestyle' && sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          return;
        }
      } else if (pathname !== '/lifestyle' && path === '/lifestyle') {
        // Nếu đang ở trang khác, navigate đến lifestyle và scroll
        router.push(dropdownHref);
        return;
      }
    }
    
    // Nếu không phải section scroll, thực hiện navigation bình thường
    if (onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    if (hasDropdown) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasDropdown) {
      setIsDropdownOpen(false);
    }
  };

  const renderDropdown = () => {
    if (!hasDropdown || !dropdownItems.length) return null;

    return (
      <div 
        className={cn(
          "navbar-dropdown",
          isDropdownOpen ? "navbar-dropdown-open" : "navbar-dropdown-closed"
        )}
      >
        {dropdownItems.map((item, index) => (
          <Link key={item.href} href={item.href} passHref>
            <span 
              className={cn(
                "navbar-dropdown-item",
                pathname === item.href && "navbar-dropdown-item-active"
              )}
              onClick={() => handleDropdownItemClick(item.href)}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    );
  };

  if (isExternal) {
    return (
      <div className="navbar-link-wrapper">
        <a 
          href={href}
          target={openInNewTab ? "_blank" : "_self"}
          rel={openInNewTab ? "noopener noreferrer" : ""}
          className={cn(
            "navbar-link",
            isTransparent ? 'navbar-link-transparent' : 'navbar-link-solid',
            isActive && 'navbar-link-active',
            className
          )}
          onClick={handleClick}
        >
          <div className="navbar-link-content">
            <span className="navbar-link-main">
              {firstLine}
              {secondLine && <br />}
              {secondLine}
            </span>
            {hasDropdown && (
              <ChevronDown className={cn(
                "navbar-dropdown-icon",
                isDropdownOpen && "navbar-dropdown-icon-rotated"
              )} />
            )}
          </div>
        </a>
      </div>
    );
  }

  return (
    <div 
      className="navbar-link-wrapper"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href} passHref prefetch>
        <span 
          className={cn(
            "navbar-link",
            isTransparent ? 'navbar-link-transparent' : 'navbar-link-solid',
            isActive && 'navbar-link-active',
            hasDropdown && 'navbar-link-with-dropdown',
            className
          )}
          onClick={handleClick}
        >
          <div className="navbar-link-content">
            <span className="navbar-link-main">
              {firstLine}
              {secondLine && <br />}
              {secondLine}
            </span>
            {hasDropdown && (
              <ChevronDown className={cn(
                "navbar-dropdown-icon",
                isDropdownOpen && "navbar-dropdown-icon-rotated"
              )} />
            )}
          </div>
        </span>
      </Link>
      {renderDropdown()}
    </div>
  );
} 