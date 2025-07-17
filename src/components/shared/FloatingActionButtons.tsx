
"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSiteSettingsData } from '@/lib/firestoreService';
import type { SiteSettingsData, SocialLinkItem } from '@/types/landingPageAdmin';
import { defaultSiteSettingsData } from '@/types/landingPageAdmin';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import DynamicLucideIcon from './DynamicLucideIcon';

interface FloatingActionButtonsProps {
  className?: string;
}

export default function FloatingActionButtons({ className }: FloatingActionButtonsProps) {
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getSiteSettingsData();
        setSettings(data || defaultSiteSettingsData);
      } catch (error) {
        console.error("Error fetching site settings for FABs:", error);
        setSettings(defaultSiteSettingsData); // Fallback
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const phoneNumber = settings?.contactPhone;
  const zaloLinkItem = settings?.socialLinks?.find(
    (link: SocialLinkItem) => link.url?.includes("zalo")
  );

  const fabItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, y: 15, transition: { duration: 0.2, ease: "easeIn" } }
  };

  if (isLoading) {
    return (
      <div className={cn("fixed bottom-20 right-6 z-40 flex flex-col-reverse items-end space-y-3 space-y-reverse", className)}>
        {/* Placeholder for 2 buttons */}
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
      </div>
    );
  }

  const hasPhoneNumber = phoneNumber && phoneNumber.trim() !== "";
  const hasZaloLink = zaloLinkItem && zaloLinkItem.url && zaloLinkItem.url.trim() !== "";

  if (!hasPhoneNumber && !hasZaloLink) {
    return null; // Don't render anything if no contact info is configured
  }

  return (
    <div className={cn("fixed bottom-20 right-6 z-40 flex flex-col-reverse items-end space-y-3 space-y-reverse", className)}>
      <AnimatePresence>
        {hasPhoneNumber && (
          <motion.div
            key="phone-fab"
            variants={fabItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Button
              onClick={() => {
                if (phoneNumber) window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
              }}
              size="icon"
              className="rounded-full shadow-lg bg-primary hover:bg-primary/80 text-primary-foreground h-12 w-12"
              aria-label="Gọi điện thoại"
              title={phoneNumber}
            >
              <Phone className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
        {hasZaloLink && (
          <motion.div
            key="zalo-fab"
            variants={fabItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Button
              asChild
              size="icon"
              className={cn("rounded-full shadow-lg bg-transparent hover:bg-transparent text-white h-12 w-12", {
                "bg-green-500 hover:bg-green-600": !zaloLinkItem.iconName
              })}
              aria-label="Nhắn tin Zalo"
              title={`Chat Zalo: ${zaloLinkItem?.platformName || 'Zalo'}`}
            >
              <a href={zaloLinkItem.url} target="_blank" rel="noopener noreferrer">
                {zaloLinkItem.iconName ? <DynamicLucideIcon name={zaloLinkItem.iconName} className="h-10 w-10" /> : <MessageSquare className="h-6 w-6" />}
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

