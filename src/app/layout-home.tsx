import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('Trang chủ');
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 