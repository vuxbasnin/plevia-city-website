
"use client";

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSiteSettingsData } from '@/lib/firestoreService';
import type { SiteSettingsData } from '@/types/landingPageAdmin';
import { defaultSiteSettingsData } from '@/types/landingPageAdmin';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

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

  if (isLoading) {
    return (
      <div className={cn("fixed bottom-20 right-6 z-40", className)}>
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
      </div>
    );
  }

  const hasPhoneNumber = phoneNumber && phoneNumber.trim() !== "";

  if (!hasPhoneNumber) {
    return null; // Không hiển thị gì nếu không có số điện thoại
  }

  return (
    <div className={cn("fixed bottom-20 right-6 z-40", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
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
    </div>
  );
}

