"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  avatarUrl: string;
  rating?: number;
  companyLogoUrl?: string;
}

export default function TestimonialCard({ quote, author, title, avatarUrl, rating = 5, companyLogoUrl }: TestimonialCardProps) {
  return (
    <Card className="bg-card shadow-lg rounded-xl overflow-hidden h-full flex flex-col">
      <CardContent className="p-6 sm:p-8 flex-grow flex flex-col items-center text-center">
        {rating > 0 && (
          <div className="flex mb-4">
            {Array(Math.floor(rating)).fill(0).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-accent fill-accent" />
            ))}
            {rating % 1 !== 0 && (
               <Star key="half" className="w-5 h-5 text-accent" style={{ clipPath: 'inset(0 50% 0 0)'}} />
            )}
          </div>
        )}
        <p className="text-muted-foreground italic text-lg mb-6 leading-relaxed">&ldquo;{quote}&rdquo;</p>
        <div className="mt-auto flex flex-col items-center">
          <Image 
            src={avatarUrl} 
            alt={author} 
            width={72} 
            height={72} 
            className="rounded-full mb-4 border-2 border-primary p-0.5"
            data-ai-hint="person portrait" 
          />
          <h4 className="font-headline text-lg font-semibold text-foreground">{author}</h4>
          <p className="text-sm text-primary">{title}</p>
          {companyLogoUrl && (
            <Image
              src={companyLogoUrl}
              alt={`${title} logo`}
              width={100}
              height={40}
              className="mt-4 object-contain opacity-75"
              data-ai-hint="company logo"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
