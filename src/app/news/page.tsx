"use client";

import PageLayout from '@/components/layout/PageLayout';
import NewsSectionExample from '@/components/sections/News/NewsSectionExample';
import TabExample from '@/components/ui/Tab/TabExample';

export default function NewsPage() {
  return (
    <PageLayout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Tin Tức & Sự Kiện</h1>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Cập Nhật Mới Nhất</h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700 mb-6">
                Khám phá những tin tức mới nhất về dự án, sự kiện đặc biệt và những cập nhật 
                quan trọng từ chúng tôi.
              </p>
            </div>
          </div>
          <NewsSectionExample />
          <TabExample />
        </div>
      </div>
    </PageLayout>
  );
} 