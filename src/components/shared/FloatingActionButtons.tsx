
"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Facebook, Youtube } from 'lucide-react';
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

  // Các link mạng xã hội cố định
  const socialLinks = [
    {
      id: 'facebook',
      platformName: 'Facebook',
      iconName: 'Facebook',
      url: 'https://www.facebook.com/pleviacity',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'zalo',
      platformName: 'Zalo',
      iconName: 'MessageSquare',
      url: 'https://zalo.me/1501497019270466512',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'youtube',
      platformName: 'YouTube',
      iconName: 'Youtube',
      url: 'https://www.youtube.com/@pleviacity',
      color: 'bg-red-600 hover:bg-red-700'
    }
  ];

  const fabItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, y: 15, transition: { duration: 0.2, ease: "easeIn" } }
  };

  if (isLoading) {
    return (
      <div className={cn("fixed bottom-20 right-6 z-40 flex flex-col-reverse items-end space-y-3 space-y-reverse", className)}>
        {/* Placeholder for 4 buttons */}
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
      </div>
    );
  }

  const hasPhoneNumber = phoneNumber && phoneNumber.trim() !== "";

  return (
    <div className={cn("fixed bottom-20 right-6 z-40 flex flex-col-reverse items-end space-y-3 space-y-reverse", className)}>
      <AnimatePresence>
        {/* Nút điện thoại */}
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

        {/* Nút Facebook */}
        <motion.div
          key="facebook-fab"
          variants={fabItemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Button
            asChild
            size="icon"
            className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white h-12 w-12"
            aria-label="Facebook Plevia City"
            title="Facebook Plevia City"
          >
            <a href="https://www.facebook.com/pleviacity" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-6 w-6" />
            </a>
          </Button>
        </motion.div>

                 {/* Nút Zalo */}
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
             className="rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white h-12 w-12"
             aria-label="Chat Zalo"
             title="Chat Zalo"
           >
             <a href="https://zalo.me/1501497019270466512" target="_blank" rel="noopener noreferrer">
               <span className="text-lg font-bold">Z</span>
             </a>
           </Button>
         </motion.div>

        {/* Nút YouTube */}
        <motion.div
          key="youtube-fab"
          variants={fabItemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Button
            asChild
            size="icon"
            className="rounded-full shadow-lg bg-red-600 hover:bg-red-700 text-white h-12 w-12"
            aria-label="YouTube Plevia City"
            title="YouTube Plevia City"
          >
            <a href="https://www.youtube.com/@pleviacity" target="_blank" rel="noopener noreferrer">
              <Youtube className="h-6 w-6" />
            </a>
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

