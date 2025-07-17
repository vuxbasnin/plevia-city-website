"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface PricingCardProps {
  planName: string;
  price: string;
  priceFrequency?: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  delay?: number;
}

export default function PricingCard({ 
  planName, 
  price, 
  priceFrequency = "/month", 
  description, 
  features, 
  ctaText, 
  isPopular = false,
  delay = 0 
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`h-full relative ${isPopular ? 'transform md:scale-105 z-10' : ''}`}
    >
      <Card className={`h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden ${isPopular ? 'border-primary border-2 bg-primary/5' : 'bg-card'}`}>
        {isPopular && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold rounded-full shadow-md">
            Most Popular
          </div>
        )}
        <CardHeader className="text-center p-6 pt-10">
          <CardTitle className="font-headline text-2xl text-foreground mb-2">{planName}</CardTitle>
          <p className="text-4xl font-bold text-primary mb-1">{price}</p>
          { price !== "Contact Us" && <p className="text-sm text-muted-foreground">{priceFrequency}</p> }
          <CardDescription className="text-muted-foreground mt-3">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="p-6 mt-auto">
          <Button size="lg" className={`w-full text-lg font-semibold rounded-lg shadow-md transition-transform duration-300 hover:scale-105 ${isPopular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-accent hover:bg-accent/90 text-accent-foreground'}`}>
            {ctaText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
