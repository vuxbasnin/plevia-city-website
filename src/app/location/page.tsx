import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import LocationPage from "@/components/pages/LocationPage";
import { createPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Plevia City - Kết nối & tiện ích';
  const description = 'Sở hữu vị trí đắc địa ngay cửa ngõ trung tâm Pleiku, Plevia City là biểu tượng mới của phong cách sống thịnh vượng, kết nối toàn diện. Tọa lạc tại giao điểm chiến lược đường Lý Nam Đế – Quốc lộ 14, dự án liền kề hàng loạt trục huyết mạch như Lê Duẩn, Hùng Vương, Hàn Mặc Tử… giúp cư dân di chuyển nhanh chóng tới bệnh viện, trường học, trung tâm thương mại, khu du lịch và các tiện ích hiện hữu chỉ trong vài phút. Từ Plevia City, bạn dễ dàng tiếp cận mọi nhu cầu sống, từ y tế, giáo dục, vui chơi giải trí đến mua sắm và thương mại. Tất cả chỉ cách 1–10 phút di chuyển.';
  return createPageMetadata(
    title,
    description,
    '/location',
    '/assets/location/banner_location.png'
  );
}

export default function LocationPageComponent() {
    return (
        <PageLayout>
            <LocationPage />
        </PageLayout>
    );
} 