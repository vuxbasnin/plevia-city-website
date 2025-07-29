import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('Kết nối & Tiện ích');
}

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 