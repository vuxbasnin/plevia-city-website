import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('Tin tức');
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 