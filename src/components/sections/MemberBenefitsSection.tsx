
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getMemberBenefitsSectionData } from '@/lib/firestoreService';
import type { BenefitItem as AdminBenefitItem } from '@/types/landingPageAdmin'; // Using admin type
import { defaultMemberBenefitsSectionData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import DynamicLucideIcon from '@/components/shared/DynamicLucideIcon';
import Link from 'next/link'; 
import { Button } from '@/components/ui/button'; 
import { ArrowRight } from 'lucide-react'; 


// This interface matches the structure from landingPageAdmin.ts
interface BenefitItem {
  id: string;
  icon: string; // Icon name as string or URL
  title: string;
  shortDescription: string; // Changed from description
  detailedDescription: string; // Added
  imageUrl?: string; // imageUrl is optional as per schema
}

const benefitItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    },
  }),
};

export default function MemberBenefitsSection() {
  const [benefits, setBenefits] = useState<BenefitItem[]>(defaultMemberBenefitsSectionData.items as BenefitItem[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getMemberBenefitsSectionData();
        setBenefits((data?.items as BenefitItem[]) || (defaultMemberBenefitsSectionData.items as BenefitItem[]));
      } catch (error) {
        console.error("Error loading member benefits data:", error);
        setBenefits(defaultMemberBenefitsSectionData.items as BenefitItem[]); // Fallback to default
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  return (
    <section id="member-benefits" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Những <span className="text-primary">Quyền Lợi</span> Đặc Biệt Cho Thành Viên
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trở thành thành viên của WorkspaceCo không chỉ là có một chỗ làm việc lý tưởng, mà còn là gia nhập một cộng đồng năng động với nhiều lợi ích độc quyền và cơ hội phát triển.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(benefits.length > 0 ? benefits.length : 3)].map((_, index) => ( 
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : benefits.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id || benefit.title} 
                custom={index}
                variants={benefitItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-card p-6 rounded-xl border text-center transition-all duration-300 ease-in-out hover:-translate-y-1 group"
              >
                <div className="flex justify-center mb-5">
                  <DynamicLucideIcon name={benefit.icon} className="w-12 h-12 text-primary transition-transform duration-300 group-hover:scale-110 object-contain" />
                </div>
                <h3 className="font-headline text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.shortDescription}</p>
              </motion.div>
            ))}
          </div>
        ) : (
           <p className="text-center text-muted-foreground text-lg">
            Hiện tại chưa có thông tin về quyền lợi thành viên. Vui lòng quay lại sau!
          </p>
        )}

        {!isLoading && benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mt-12 lg:mt-16"
          >
            <Link href="/member-benefits" passHref>
              <Button
                size="lg"
                variant="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group rounded-lg px-8 py-3 text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Khám Phá Tất Cả Quyền Lợi
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-card p-6 rounded-xl border text-center">
      <div className="flex justify-center mb-5">
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6 mx-auto" />
    </div>
  );
}


