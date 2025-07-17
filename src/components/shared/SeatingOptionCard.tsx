
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface SeatingOptionCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageHint: string;
  index: number;
}

export default function SeatingOptionCard({ title, description, imageUrl, imageAlt, imageHint, index }: SeatingOptionCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: index * 0.15 } // Slightly faster delay
    }
  };

  const effectiveImageUrl = imageUrl || "https://placehold.co/400x300.png?text=No+Image";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -5 }} // Removed boxShadow from here
      className="h-full group"
    >
      <Card className="h-full flex flex-col transition-shadow duration-300 rounded-xl overflow-hidden bg-card border">
        <div className="relative w-full h-60 overflow-hidden">
          <Image
            src={effectiveImageUrl}
            alt={imageAlt || title || "Seating option image"}
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            data-ai-hint={imageHint}
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x300.png?text=Image+Error"; }}
            priority={index < 3} // Add priority for first few images for LCP
          />
        </div>
        <CardHeader className="p-6">
          <CardTitle className="font-headline text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-6 pt-0">
          <CardDescription className="text-muted-foreground text-sm lg:text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

