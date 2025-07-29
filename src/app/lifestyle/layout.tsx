import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('Phong cách sống');
}

export default function LifestyleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 