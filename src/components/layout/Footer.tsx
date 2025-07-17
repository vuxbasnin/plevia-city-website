
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSiteSettingsData } from '@/lib/firestoreService';
import type { SiteSettingsData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import DynamicLucideIcon from '../shared/DynamicLucideIcon';

const footerNavs = [
  {
    label: "Công Ty",
    items: [
      { href: "#", name: "Về Chúng Tôi" },
      { href: "#", name: "Tuyển Dụng" },
      { href: "#", name: "Blog" },
    ],
  },
  {
    label: "Hỗ Trợ",
    items: [
      { href: "#", name: "FAQ" },
      { href: "#", name: "Liên Hệ" },
      { href: "#", name: "Điều Khoản Dịch Vụ" },
      { href: "#", name: "Chính Sách Bảo Mật" },
    ],
  },
];

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);

  useEffect(() => {
    async function loadSiteSettings() {
      setIsLoadingSettings(true);
      try {
        const settings = await getSiteSettingsData();
        setSiteSettings(settings || null);
      } catch (error) {
        console.error("Error loading site settings for Footer:", error);
        setSiteSettings(null);
      }
      setIsLoadingSettings(false);
    }
    loadSiteSettings();
  }, []);

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col items-start">
            <Link href="/" passHref >
              <span className="flex items-center space-x-2 text-2xl font-headline font-bold text-primary mb-4 hover:opacity-80 transition-opacity">
                {isLoadingSettings ? (
                  <Skeleton className={cn("rounded", siteSettings?.logoUrl ? "w-8 h-8" : "w-7 h-7")} />
                ) : siteSettings?.logoUrl ? (
                  <NextImage
                    src={siteSettings?.logoUrl}
                    alt={`${siteSettings?.companyName || 'Site'} Logo`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <Briefcase className="w-7 h-7" />
                )}
                <span>{isLoadingSettings ? <Skeleton className="h-7 w-28" /> : siteSettings?.companyName}</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {siteSettings?.companyName} cung cấp không gian làm việc chung hiện đại, linh hoạt và đầy đủ tiện nghi, truyền cảm hứng cho sự sáng tạo và kết nối cộng đồng.
            </p>
          </div>

          {/* Navigation Links */}
          {footerNavs.map((nav, idx) => (
            <div key={idx} className="text-left">
              <h5 className="font-headline text-lg font-semibold text-foreground mb-5">{nav.label}</h5>
              <ul className="space-y-3">
                {nav.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link href={item.href} passHref >
                      <span className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm hover:underline">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Socials */}
          <div className="text-left">
            <h5 className="font-headline text-lg font-semibold text-foreground mb-5">Liên Hệ Với Chúng Tôi</h5>
            {isLoadingSettings ? (
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Skeleton className="h-5 w-full" /></li>
                <li><Skeleton className="h-5 w-3/4" /></li>
                <li><Skeleton className="h-5 w-4/5" /></li>
                <li><Skeleton className="h-5 w-1/2" /></li>
              </ul>
            ) : (
              <ul className="space-y-3 text-sm text-muted-foreground">
                {siteSettings?.contactAddress && (
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-primary shrink-0" />
                    <span>{siteSettings?.contactAddress}</span>
                  </li>
                )}
                {siteSettings?.contactEmail && (
                  <li className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                    <a href={`mailto:${siteSettings?.contactEmail}`} className="hover:text-primary hover:underline">{siteSettings?.contactEmail}</a>
                  </li>
                )}
                {siteSettings?.contactPhone && (
                  <li className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                    <a href={`tel:${siteSettings?.contactPhone.replace(/\s/g, '')}`} className="hover:text-primary hover:underline">{siteSettings?.contactPhone}</a>
                  </li>
                )}
              </ul>
            )}
            {(isLoadingSettings || (siteSettings?.socialLinks && siteSettings?.socialLinks.length > 0)) && (
              <div className="flex justify-start space-x-4 mt-6">
                {isLoadingSettings ? (
                  [...Array(3)].map((_, i) => <Skeleton key={i} className="w-9 h-9 rounded-full bg-secondary/50" />)
                ) : (
                  siteSettings?.socialLinks?.map((social) => (
                    social.url && (
                      <motion.a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 p-2 bg-secondary/50 hover:bg-primary/10 rounded-full"
                        aria-label={social.platformName}
                        title={social.platformName}
                      >
                        <DynamicLucideIcon name={social.iconName} className="w-5 h-5" />
                      </motion.a>
                    )
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {isLoadingSettings ? <Skeleton className="h-4 w-20 inline-block" /> : siteSettings?.companyName}. Đã đăng ký Bản quyền.
          </div>
        </div>
      </div>
    </footer>
  );
}

