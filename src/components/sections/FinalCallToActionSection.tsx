
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, MessageCircle } from 'lucide-react'; 
import { getFinalCtaSectionData } from '@/lib/firestoreService';
import type { FinalCtaSectionData } from '@/types/landingPageAdmin';
import { defaultFinalCtaSectionData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import ContactFormDialog from '@/components/shared/ContactFormDialog'; 

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function FinalCallToActionSection() {
  const [ctaData, setCtaData] = useState<FinalCtaSectionData>(defaultFinalCtaSectionData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getFinalCtaSectionData();
        setCtaData(data || defaultFinalCtaSectionData);
      } catch (error) {
        console.error("Error loading Final CTA section data:", error);
        setCtaData(defaultFinalCtaSectionData);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const cta1TriggerButton = (
    <Button
      size="xl"
      className="group bg-gradient-to-r from-white to-white/80 text-primary font-semibold rounded-full px-10 py-4 shadow-xl transition-all duration-300 w-full sm:w-auto transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:saturate-150"
    >
      <span className="inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
        {ctaData.cta1Text || "Đăng Ký Dùng Thử"}
        <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
      </span>
    </Button>
  );

  if (isLoading) {
    return (
      <section id="final-cta" className="py-20 sm:py-28 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Skeleton className="w-12 h-12 rounded-full mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-10 w-3/4 md:w-1/2 mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-10 bg-white/10" />
          <Skeleton className="h-5 w-3/4 md:w-1/2 mx-auto mb-2 bg-white/10" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Skeleton className="h-12 w-48 rounded-full bg-white/30" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="final-cta"
      className="scroll-mt-24 py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-0" />
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-[100px] opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow delay-300" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={itemVariants}>
          <Star className="w-12 h-12 text-yellow-400 drop-shadow-md animate-pulse mx-auto mb-6" fill="currentColor" />
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          {ctaData.headline}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
        >
          {ctaData.description}
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {ctaData.cta1Text && (
            <ContactFormDialog
              triggerButton={cta1TriggerButton}
              dialogTitle="Đăng ký dùng thử ngay"
              dialogDescription="Hãy để lại thông tin để được trải nghiệm không gian làm việc và các quyền lợi thành viên ưu việt của chúng tôi."
              submitButtonText="Gửi Đăng Ký Dùng Thử"
            />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
