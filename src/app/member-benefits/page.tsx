
"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer';
import { MessageSquare, Award, Sparkles } from 'lucide-react';
import NextImage from 'next/image';
import { getMemberBenefitsSectionData, getMemberBenefitsPageSettingsData } from '@/lib/firestoreService';
import { type BenefitItem, defaultMemberBenefitsSectionData, type MemberBenefitsPageSettingsData, defaultMemberBenefitsPageSettingsData } from '@/types/landingPageAdmin';
import ContactFormDialog from '@/components/shared/ContactFormDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BackToTopButton from '@/components/shared/BackToTopButton';
import FloatingActionButtons from '@/components/shared/FloatingActionButtons';
import DynamicLucideIcon from '@/components/shared/DynamicLucideIcon';


const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const listItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    },
  }),
};


export default function MemberBenefitsPage() {
  const [benefits, setBenefits] = useState<BenefitItem[]>(defaultMemberBenefitsSectionData.items);
  const [pageSettings, setPageSettings] = useState<MemberBenefitsPageSettingsData>(defaultMemberBenefitsPageSettingsData);
  const [isLoadingBenefits, setIsLoadingBenefits] = useState(true);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);

  useEffect(() => {
    let isActive = true;
    async function loadBenefits() {
      if (!isActive) return;
      setIsLoadingBenefits(true);
      try {
        const data = await getMemberBenefitsSectionData();
        if (isActive) setBenefits(data?.items || defaultMemberBenefitsSectionData.items);
      } catch (error) {
        console.error("Error loading member benefits data for page:", error);
        if (isActive) setBenefits(defaultMemberBenefitsSectionData.items);
      }
      if (isActive) setIsLoadingBenefits(false);
    }

    async function loadPageSettings() {
      if (!isActive) return;
      setIsLoadingSettings(true);
      try {
        const settings = await getMemberBenefitsPageSettingsData();
        if (isActive) setPageSettings(settings || defaultMemberBenefitsPageSettingsData);
      } catch (error) {
        console.error("Error loading member benefits page settings:", error);
        if (isActive) setPageSettings(defaultMemberBenefitsPageSettingsData);
      }
      if (isActive) setIsLoadingSettings(false);
    }

    loadBenefits();
    loadPageSettings();

    return () => { isActive = false; };
  }, []);

  const isLoading = isLoadingBenefits || isLoadingSettings;

  const heroButton = (
    <Button
      size="lg"
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      <MessageSquare className="mr-2 w-5 h-5" />
      {isLoadingSettings ? <Skeleton className="h-6 w-36 inline-block" /> : pageSettings.heroCtaButtonText}
    </Button>
  );

  const finalCtaButton = (
    <Button
      size="xl"
      className="group bg-gradient-to-r from-white to-white/80 text-primary font-semibold rounded-full px-10 py-4 shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:saturate-150"
    >
      <MessageSquare className="mr-2 w-5 h-5" />
      {isLoadingSettings ? <Skeleton className="h-7 w-40 inline-block" /> : pageSettings.finalCtaButtonText}
    </Button>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          {/* Hero Skeleton */}
          <section className="bg-indigo-50 py-16 text-center px-6">
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-16 w-16 mx-auto mb-6 rounded-full bg-indigo-200" />
              <Skeleton className="h-12 w-3/4 mx-auto mb-4 bg-indigo-200" />
              <Skeleton className="h-6 w-full mx-auto mb-8 bg-indigo-100" />
              <Skeleton className="h-12 w-56 mx-auto rounded-xl bg-indigo-300" />
            </div>
          </section>
          {/* Benefits Accordion Skeleton */}
          <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {[...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="bg-card rounded-xl shadow-sm overflow-hidden mb-6"
                  >
                    <AccordionItem value={`skeleton-item-${index}`} className="border-none">
                      <AccordionTrigger className="flex items-start justify-between p-4 w-full text-left gap-4 hover:bg-gray-50 transition-colors group data-[state=open]:rounded-b-none data-[state=closed]:rounded-b-lg">
                        <div className="flex items-start gap-4">
                          <Skeleton className="w-8 h-8 rounded-full mt-1" />
                          <div>
                            <Skeleton className="h-6 w-48 mb-1" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-0">
                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t items-start">
                          <Skeleton className="h-24 w-full" /> {/* Detailed description skeleton */}
                          <Skeleton className="h-40 w-full rounded-md" /> {/* Image skeleton */}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </section>
          {/* Final CTA Skeleton */}
          <section className="bg-indigo-600 text-white py-20 text-center px-6 sm:px-0">
            <Skeleton className="h-10 w-1/2 mx-auto mb-4 bg-indigo-400" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-8 bg-indigo-300" />
            <Skeleton className="h-14 w-60 mx-auto rounded-xl bg-white/50" />
            <Skeleton className="h-4 w-1/3 mx-auto mt-4 bg-indigo-200" />
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 pt-16 sm:pt-20">
        {/* Hero Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-indigo-50 py-16 text-center px-6 sm:py-20 lg:py-28"
        >
          <div className="max-w-3xl mx-auto">
            <Award className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {pageSettings.heroTitle.includes("Teddy Space") ? (
                <>
                  {pageSettings.heroTitle.split("Teddy Space")[0]}
                  <span className="text-indigo-600">Teddy Space</span>
                  {pageSettings.heroTitle.split("Teddy Space")[1]}
                </>
              ) : (
                pageSettings.heroTitle
              )}
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-700 mb-10 leading-relaxed">
              {pageSettings.heroDescription}
            </p>
            <ContactFormDialog
              triggerButton={heroButton}
              dialogTitle="Đăng ký dùng thử ngay"
              dialogDescription="Hãy để lại thông tin để được trải nghiệm không gian làm việc và quyền lợi thành viên ưu việt."
              submitButtonText="Gửi Đăng Ký"
            />
          </div>
        </motion.section>

        {/* Benefits Accordion Section */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id || index}
                  custom={index}
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-card rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden mb-6"
                >
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="flex items-start justify-between p-4 w-full text-left gap-4 hover:bg-gray-50 transition-colors group data-[state=open]:rounded-b-none data-[state=closed]:rounded-b-lg">
                      <div className="flex items-start gap-4">
                        <DynamicLucideIcon
                          name={benefit.icon}
                          className="w-8 h-8 text-indigo-600 mt-1 group-hover:scale-105 transition-transform object-contain"
                        />
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-indigo-700">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{benefit.shortDescription}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-0">
                      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t items-start">
                        <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {benefit.detailedDescription}
                        </div>
                        {benefit.imageUrl && (
                          <div className="relative aspect-video rounded-lg overflow-hidden shadow-md mt-4 md:mt-0">
                            <NextImage
                              src={benefit.imageUrl}
                              alt={benefit.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                              data-ai-hint="benefit detail"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://placehold.co/400x300.png?text=${encodeURIComponent(benefit.title || 'Lỗi')}`;
                              }}
                            />
                          </div>
                        )}
                        {!benefit.imageUrl && (
                          <div className="relative aspect-video rounded-lg bg-muted flex items-center justify-center shadow-inner mt-4 md:mt-0">
                            <Sparkles className="w-12 h-12 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="scroll-mt-24 py-20 sm:py-28 px-6 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            {pageSettings.finalCtaHeadline}
          </h2>
          <p className="text-indigo-100 mb-8 text-lg max-w-xl mx-auto leading-relaxed">
            {pageSettings.finalCtaDescription}
          </p>
          <ContactFormDialog
            triggerButton={finalCtaButton}
            dialogTitle="Đăng ký dùng thử ngay"
            dialogDescription="Hãy để lại thông tin để được trải nghiệm không gian làm việc và các quyền lợi thành viên ưu việt của chúng tôi."
            submitButtonText="Gửi Đăng Ký"
          />
          <p className="mt-6 text-sm text-indigo-200">Không cần thẻ tín dụng – Hủy bất kỳ lúc nào.</p>
        </motion.section>
      </main>
      <Footer />
      <FloatingActionButtons />
      <BackToTopButton />
    </div>
  );
}




