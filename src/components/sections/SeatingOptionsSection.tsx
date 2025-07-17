
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SeatingOptionCard from '@/components/shared/SeatingOptionCard';
import { getSeatingSectionData } from '@/lib/firestoreService';
import type { SeatingOptionItem } from '@/types/landingPageAdmin';
import { defaultSeatingSectionData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';

export default function SeatingOptionsSection() {
  const [seatingOptions, setSeatingOptions] = useState<SeatingOptionItem[]>(defaultSeatingSectionData.options);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getSeatingSectionData();
        setSeatingOptions(data?.options || defaultSeatingSectionData.options);
      } catch (error) {
        console.error("Error loading seating options data:", error);
        setSeatingOptions(defaultSeatingSectionData.options); // Fallback to default on error
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  return (
    <section id="seating-options" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Lựa Chọn <span className="text-primary">Vị Trí Ngồi</span> Hoàn Hảo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cung cấp đa dạng các lựa chọn không gian làm việc được thiết kế để phù hợp với mọi nhu cầu và phong cách làm việc của bạn.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col shadow-lg rounded-xl overflow-hidden">
                <Skeleton className="w-full h-60" />
                <div className="p-6">
                  <Skeleton className="h-8 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : seatingOptions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seatingOptions.map((option, index) => (
              <SeatingOptionCard
                key={option.id || index} // Use option.id if available, otherwise fallback to index
                title={option.title}
                description={option.description}
                imageUrl={option.imageUrl}
                imageAlt={option.title} // Using title as alt text
                imageHint={`${option.title.toLowerCase().replace(/\s+/g, '-')} workspace`} // Generating a hint
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">
            Hiện tại chưa có thông tin về các loại vị trí ngồi. Vui lòng quay lại sau!
          </p>
        )}
      </div>
    </section>
  );
}
