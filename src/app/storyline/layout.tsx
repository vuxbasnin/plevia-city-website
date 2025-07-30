import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('Câu chuyện kiến tạo');
}

export default function StorylineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 