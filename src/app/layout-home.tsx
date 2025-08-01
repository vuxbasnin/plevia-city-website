import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    'Trang chủ',
    'Plevia City - Dự án bất động sản cao cấp tại Gia Lai với vị trí đắc địa, thiết kế hiện đại và tiện ích đẳng cấp. Khám phá căn hộ, biệt thự và shophouse tại dự án bất động sản hàng đầu Pleiku.'
  );
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 