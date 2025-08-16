import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    'Phong cách sống',
    'Plevia City không đơn thuần là nơi an cư, mà còn là biểu tượng cho phong cách sống hiện đại, thông minh nơi công nghệ trở thành nền tảng kiến tạo nên một không gian sống chuẩn mực thời đại số.'
  );
}

export default function LifestyleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 