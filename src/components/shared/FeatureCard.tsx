"use client";

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="h-full bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden group">
        <CardHeader className="items-center text-center p-6 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-12 h-12 text-primary mb-4" />
          </motion.div>
          <CardTitle className="font-headline text-xl text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <CardDescription className="text-muted-foreground text-base leading-relaxed">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}
