import React from "react";
import IoTClientComponents from "@/components/pages/IoTPage/IoTClientComponents";
import { iotSections } from "@/components/pages/IoTPage/data";
import type { BasePageProps } from "@/types/pageComponents";

export default function IoTPage({ className }: BasePageProps = {}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Interactive Client Components */}
      <IoTClientComponents sections={iotSections} />
    </div>
  );
}
