import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import IoTPage from "@/components/pages/IoTPage";
import { createPageMetadata } from "@/lib/metadata";

// Static SEO data for IoT page
const IOT_SEO_DATA = {
  title: 'Plevia City - Công Nghệ IoT & AI Vận Hành Khu Đô Thị Thông Minh Gia Lai',
  description: 'Khám phá công nghệ IoT và AI tiên tiến tại Plevia City Gia Lai. Hệ thống quản lý thông minh, tự động hóa toàn diện, và kết nối vạn vật cho khu đô thị hiện đại nhất Tây Nguyên.',
  keywords: [
    'Plevia City IoT',
    'khu đô thị thông minh Gia Lai',
    'công nghệ AI Gia Lai',
    'IoT đô thị thông minh',
    'hệ thống quản lý thông minh',
    'tự động hóa đô thị',
    'kết nối vạn vật Gia Lai',
    'công nghệ 4.0 Tây Nguyên',
    'đô thị số hóa',
    'smart city Gia Lai',
    'AI quản lý đô thị',
    'hạ tầng thông minh'
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata(
    IOT_SEO_DATA.title,
    IOT_SEO_DATA.description,
    "https://pleviacity.vn/iot",
    "https://pleviacity.vn/assets/home/plevia_city.jpg",
    {
      keywords: IOT_SEO_DATA.keywords,
      other: {
        'apple-mobile-web-app-title': 'Plevia City IoT',
        'application-name': 'Plevia City IoT',
      },
    }
  );
}

export default function IoTPageComponent() {
  return (
    <PageLayout>
      <IoTPage />
    </PageLayout>
  );
}
