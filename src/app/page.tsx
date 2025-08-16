import React from "react";
import { Metadata } from 'next';
import ClientHomePage from '@/components/shared/ClientHomePage';

// Generate metadata for home page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Plevia City - Tổ Hợp Liền Kề & Shophouse Đẳng Cấp | Khu Đô Thị Thông Minh Gia Lai',
    description: 'Plevia City là khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.',
    keywords: [
      'Plevia City', 
      'pleviacity', 
      'khu đô thị thông minh Gia Lai', 
      'dự án bất động sản Pleiku', 
      'căn hộ Gia Lai', 
      'biệt thự Pleiku', 
      'shophouse Gia Lai', 
      'đô thị thông minh', 
      'AI Gia Lai', 
      'bất động sản cao cấp',
      'pleviacity.vn',
      'dự án Plevia',
      'đầu tư bất động sản Gia Lai',
      'Pleiku real estate',
      'Gia Lai property',
      'smart city Vietnam'
    ],
    openGraph: {
      title: 'Plevia City - Tổ Hợp Liền Kề & Shophouse Đẳng Cấp',
      description: 'Plevia City là khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.',
      url: '/',
      siteName: 'Plevia City',
      locale: 'vi_VN',
      type: 'website',
      images: [
        {
          url: '/logo_seo_home_page.png',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Logo chính thức',
          type: 'image/png',
        },
        {
          url: '/assets/home/plevia_city.jpg',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Khu đô thị thông minh đầu tiên tại Gia Lai',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Plevia City - Tổ Hợp Liền Kề & Shophouse Đẳng Cấp',
      description: 'Plevia City là khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo được phát triển tại Gia Lai.',
      images: [
        '/logo_seo_home_page.png',
        '/assets/home/plevia_city.jpg'
      ],
    },
    alternates: {
      canonical: '/',
    },
  };
}

export default function HomePage() {
    return <ClientHomePage />;
}