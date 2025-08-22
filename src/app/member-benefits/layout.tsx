import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata(
    'Plevia City - Quyền Lợi Thành Viên',
    'Khám phá các quyền lợi đặc biệt dành cho thành viên Plevia City. Trải nghiệm không gian làm việc hiện đại và các dịch vụ ưu đãi độc quyền.',
    '/member-benefits'
  );
}

export default function MemberBenefitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
