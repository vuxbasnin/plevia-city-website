"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCard from '@/components/shared/TestimonialCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "LandingFlow has revolutionized how we launch products. The speed and customization are unparalleled!",
    author: "Jane Doe",
    title: "CEO, Innovatech",
    avatarUrl: "https://placehold.co/100x100.png",
    companyLogoUrl: "https://placehold.co/120x40.png?text=Innovatech",
    rating: 5,
  },
  {
    quote: "The best landing page builder I've ever used. Our conversion rates have skyrocketed since switching to LandingFlow.",
    author: "John Smith",
    title: "Marketing Director, MarketBoost",
    avatarUrl: "https://placehold.co/100x101.png",
    companyLogoUrl: "https://placehold.co/120x40.png?text=MarketBoost",
    rating: 5,
  },
  {
    quote: "Incredibly intuitive and powerful. We created a stunning page in hours, not days.",
    author: "Alice Brown",
    title: "Founder, Startup Hub",
    avatarUrl: "https://placehold.co/100x102.png",
    rating: 4.5,
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hàm chuyển sang testimonial tiếp theo.
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Hàm chuyển về testimonial trước đó.
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };
  const [direction, setDirection] = useState(0);


  // Hàm chuyển testimonial theo hướng (trái/phải).
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) {
        nextTestimonial();
    } else {
        prevTestimonial();
    }
  };


  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Loved by Businesses <span className="text-primary">Worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their experience with LandingFlow.
          </p>
        </motion.div>
        
        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              <TestimonialCard {...testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-16 transform bg-card hover:bg-accent hover:text-accent-foreground rounded-full shadow-md"
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-16 transform bg-card hover:bg-accent hover:text-accent-foreground rounded-full shadow-md"
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? 'bg-primary' : 'bg-muted hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
      </div>
    </section>
  );
}
