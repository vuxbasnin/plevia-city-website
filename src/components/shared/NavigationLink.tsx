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
}

export default function NavigationLink({ 
  href, 
  label, 
  className,
  onClick,
  isTransparent = false 
}: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

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
          onClick={onClick}
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