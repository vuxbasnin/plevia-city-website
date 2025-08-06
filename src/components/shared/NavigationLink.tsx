"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  isTransparent?: boolean;
  isExternal?: boolean;
  openInNewTab?: boolean;
}

export default function NavigationLink({ 
  href, 
  label, 
  className,
  onClick,
  isTransparent = false,
  isExternal = false,
  openInNewTab = false
}: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    
    // Nếu là external link và cần mở tab mới, không cần preventDefault
    if (isExternal && openInNewTab) {
      return;
    }
    
    // Nếu có onClick handler, không cần preventDefault vì Link sẽ xử lý
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
              {label}
            </span>
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className="navbar-link-wrapper">
      <Link href={href} passHref prefetch>
        <span 
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
              {label}
            </span>
          </div>
        </span>
      </Link>
    </div>
  );
} 