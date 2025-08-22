import type { Metadata } from 'next';
import PageLayout from "@/components/layout/PageLayout";
import StorylinePage from '@/components/pages/StorylinePage';
import { createPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Plevia City - Câu chuyện kiến tạo';
  const description = 'Trong bối cảnh đô thị hóa ngày càng mạnh mẽ tại Gia Lai, nhu cầu về một khu đô thị hiện đại – văn minh – thông minh trở nên cấp thiết hơn bao giờ hết. Không chỉ là nơi để ở, người dân còn đang mong muốn tìm kiếm một không gian sống hội tụ cả công nghệ, tiện ích, thiên nhiên và cộng đồng.';
  return createPageMetadata(
    title,
    description,
    '/storyline',
    '/assets/storyline/banner_storyline.png'
  );
}

export default function StorylinePageComponent() {
  return (
    <PageLayout>
      <StorylinePage />
    </PageLayout>
  );
}
