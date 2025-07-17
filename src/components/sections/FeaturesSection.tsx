"use client";

import { motion } from 'framer-motion';
import FeatureCard from '@/components/shared/FeatureCard';
import { Zap, LayoutGrid, Palette, Target } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Blazing Fast Performance',
    description: 'Optimized for speed, ensuring your landing pages load in a blink.',
  },
  {
    icon: LayoutGrid,
    title: 'Fully Responsive Design',
    description: 'Beautifully adapts to all screen sizes, from mobile to desktop.',
  },
  {
    icon: Palette,
    title: 'Easily Customizable',
    description: 'Tailor every aspect of your page to match your brand identity perfectly.',
  },
  {
    icon: Target,
    title: 'Conversion Focused',
    description: 'Built with best practices to maximize your lead generation and sales.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">LandingFlow</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the powerful features that make LandingFlow the ideal choice for your next project.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
