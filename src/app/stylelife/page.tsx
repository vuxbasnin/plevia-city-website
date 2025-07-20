"use client";

import PageLayout from '@/components/layout/PageLayout';
import CommunityCultureSection from '@/components/sections/CommunityCultureSection';
import MemberBenefitsSection from '@/components/sections/MemberBenefitsSection';

export default function StyleLifePage() {
  return (
    <PageLayout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Phong Cách Sống</h1>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Khám Phá Lối Sống Hiện Đại</h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700 mb-6">
                Tại đây, chúng tôi không chỉ cung cấp không gian sống mà còn mang đến một phong cách sống 
                hoàn toàn mới với những tiện ích hiện đại và cộng đồng năng động.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg mb-2">Cộng Đồng Năng Động</h3>
                  <p className="text-gray-600">
                    Tham gia vào một cộng đồng đa dạng với những người có cùng sở thích và mục tiêu.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg mb-2">Tiện Ích Cao Cấp</h3>
                  <p className="text-gray-600">
                    Tận hưởng các tiện ích hiện đại được thiết kế để nâng cao chất lượng cuộc sống.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <CommunityCultureSection />
          <MemberBenefitsSection />
        </div>
      </div>
    </PageLayout>
  );
} 