"use client";

import PageLayout from '@/components/layout/PageLayout';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import SeatingOptionsSection from '@/components/sections/SeatingOptionsSection';

export default function LocationPage() {
  return (
    <PageLayout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Vị Trí & Tiện Ích</h1>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Vị Trí Chiến Lược</h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700 mb-6">
                Dự án của chúng tôi được đặt tại vị trí chiến lược, thuận tiện cho việc di chuyển 
                và tiếp cận các tiện ích xung quanh.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg mb-2">Giao Thông</h3>
                  <p className="text-gray-600">Gần các tuyến đường chính, thuận tiện di chuyển</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg mb-2">Tiện Ích</h3>
                  <p className="text-gray-600">Trường học, bệnh viện, trung tâm thương mại</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg mb-2">Môi Trường</h3>
                  <p className="text-gray-600">Không gian xanh, không khí trong lành</p>
                </div>
              </div>
            </div>
          </div>
          <AmenitiesSection />
          <SeatingOptionsSection />
        </div>
      </div>
    </PageLayout>
  );
} 