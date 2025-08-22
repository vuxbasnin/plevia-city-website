import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import LifestylePage from '@/components/pages/LifestylePage';
import { createPageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Plevia City - Phong cách sống';
    const description = 'Plevia City không đơn thuần là nơi an cư, mà còn là biểu tượng cho phong cách sống hiện đại, thông minh nơi công nghệ trở thành nền tảng kiến tạo nên một không gian sống chuẩn mực thời đại số.';
    return createPageMetadata(
        title,
        description,
        '/lifestyle',
        '/assets/lifestyle/banner_lifestyle.png'
    );
}

export default function LifeStylePage() {
    return (
        <PageLayout>
            <LifestylePage />
        </PageLayout>
    );
} 