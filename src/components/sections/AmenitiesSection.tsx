
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAmenitiesSectionData } from '@/lib/firestoreService';
import type { AmenityItem as AdminAmenityItem } from '@/types/landingPageAdmin'; // Use admin type
import { defaultAmenitiesSectionData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import DynamicLucideIcon from '@/components/shared/DynamicLucideIcon';


interface AmenityItem {
  id: string;
  icon: string; // Icon name as string or URL
  name: string;
  description: string;
}

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

export default function AmenitiesSection() {
  const [amenities, setAmenities] = useState<AmenityItem[]>(defaultAmenitiesSectionData.items);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getAmenitiesSectionData();
        // Ensure items is an array, even if data or data.items is null/undefined
        setAmenities(data?.items || defaultAmenitiesSectionData.items);
      } catch (error) {
        console.error("Error loading amenities data:", error);
        setAmenities(defaultAmenitiesSectionData.items); // Fallback to default
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  return (
    <section id="amenities" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary">Dịch Vụ</span> & Tiện Ích Vượt Trội
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tận hưởng các dịch vụ cao cấp và tiện nghi hiện đại được thiết kế để hỗ trợ tối đa cho công việc và sự thoải mái của bạn tại WorkspaceCo.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : amenities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.id || amenity.name} // Use id if available
                custom={index}
                variants={listItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-card p-6 rounded-xl border transition-all duration-300 ease-in-out hover:-translate-y-1 group"
              >
                <div className="flex items-center mb-4 text-primary">
                  <DynamicLucideIcon name={amenity.icon} className="w-10 h-10 mr-4 transition-transform duration-300 group-hover:scale-110 object-contain" />
                  <h3 className="font-headline text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {amenity.name}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">
            Hiện tại chưa có thông tin về dịch vụ và tiện ích. Vui lòng quay lại sau!
          </p>
        )}
      </div>
    </section>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-card p-6 rounded-xl border">
      <div className="flex items-center mb-4">
        <Skeleton className="w-10 h-10 mr-4 rounded-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}


