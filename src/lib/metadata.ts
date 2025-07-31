import type { Metadata } from 'next';

export function generatePageMetadata(pageTitle: string): Metadata {
  const baseTitle = "Plevia City";
  const fullTitle = `${baseTitle} - ${pageTitle}`;
  
  return {
    title: fullTitle,
    description: `Khám phá ${pageTitle.toLowerCase()} tại ${baseTitle} - Dự án bất động sản cao cấp tại Gia Lai`,
    icons: {
      icon: '/Logo_green_3.png', // Logo SVG
      shortcut: '/Logo_green_3.png',
      apple: '/Logo_green_3.png',
    },
  };
}

// Mapping các trang với tên hiển thị
export const PAGE_TITLES = {
  '/': 'Trang chủ',
  '/storyline': 'Câu chuyện kiến tạo',
  '/location': 'Kết nối & Tiện ích',
  '/lifestyle': 'Phong cách sống',
  '/news': 'Tin tức',
} as const;

export function getPageTitle(pathname: string): string {
  return PAGE_TITLES[pathname as keyof typeof PAGE_TITLES] || 'Trang chủ';
} 