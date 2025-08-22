"use client";

import { useEffect, useState } from "react";
import { getMemberBenefitsSectionData } from "@/lib/firestoreService";
import FeaturesSection from "@/components/sections/FeaturesSection";

export default function MemberBenefitsContent() {
  const [benefitsData, setBenefitsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const data = await getMemberBenefitsSectionData();
        setBenefitsData(data);
      } catch (error) {
        console.error("Error fetching member benefits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin quyền lợi...</p>
        </div>
      </div>
    );
  }

  if (!benefitsData) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quyền Lợi Thành Viên Plevia City
          </h2>
          <p className="text-gray-600">
            Khám phá các quyền lợi đặc biệt dành cho thành viên của chúng tôi.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="member-benefits-content">
      <FeaturesSection
        title={benefitsData.title}
        description={benefitsData.description}
        features={benefitsData.features}
      />
    </div>
  );
}
