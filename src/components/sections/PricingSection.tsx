"use client";

import { motion } from 'framer-motion';
import PricingCard from '@/components/shared/PricingCard';

const pricingPlans = [
  {
    planName: 'Basic',
    price: '$19',
    description: 'Perfect for individuals and small projects.',
    features: [
      '1 Landing Page',
      'Basic Analytics',
      'Email Support',
      '10,000 Monthly Visits',
    ],
    ctaText: 'Choose Basic',
  },
  {
    planName: 'Pro',
    price: '$49',
    description: 'Ideal for growing businesses and professionals.',
    features: [
      '10 Landing Pages',
      'Advanced Analytics',
      'Priority Email Support',
      'A/B Testing',
      '100,000 Monthly Visits',
    ],
    ctaText: 'Choose Pro',
    isPopular: true,
  },
  {
    planName: 'Enterprise',
    price: 'Contact Us',
    description: 'Tailored solutions for large organizations.',
    features: [
      'Unlimited Landing Pages',
      'Custom Analytics & Reporting',
      'Dedicated Account Manager',
      'Custom Integrations',
      'Unlimited Monthly Visits',
    ],
    ctaText: 'Get a Quote',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Flexible <span className="text-primary">Pricing Plans</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan that fits your needs. No hidden fees, transparent pricing.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={plan.planName} 
              {...plan} 
              delay={index * 0.15}
            />
          ))}
        </div>
        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12 text-muted-foreground"
        >
            Need a custom solution? <a href="mailto:sales@landingflow.com" className="text-primary hover:underline">Contact our sales team</a>.
        </motion.p>
      </div>
    </section>
  );
}
