import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import LifestyleContent from './LifestyleContent';

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Plevia City - Phong cách sống';
    const description = 'Plevia City không đơn thuần là nơi an cư, mà còn là biểu tượng cho phong cách sống hiện đại, thông minh nơi công nghệ trở thành nền tảng kiến tạo nên một không gian sống chuẩn mực thời đại số.';
    return {
        title,
        description,
        alternates: { canonical: '/lifestyle' },
        openGraph: {
            title,
            description,
            url: '/lifestyle',
            type: 'website',
            images: [
                {
                    url: '/assets/lifestyle/banner_lifestyle.png',
                    width: 1200,
                    height: 630,
                    alt: 'Plevia City - Phong cách sống',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [
                {
                    url: '/assets/lifestyle/banner_lifestyle.png',
                    alt: 'Plevia City - Phong cách sống',
                },
            ],
        },
    };
}

export default function LifeStylePage() {
    return (
        <PageLayout>
            <LifestyleContent />
        </PageLayout>
    );
} 