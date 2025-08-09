import FurnitureSection from '@/components/sections/FurnitureSection';
import LibImageFurnitureHome from '@/components/sections/LibImageFurnitureHome';
import LibImageFurnitureLifestyle from '@/components/sections/LibImageFurnitureLifestyle';

export default function FurnitureDemoPage() {
  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">Demo Các Component Nội Thất</h1>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">1. FurnitureSection (Grid Layout)</h2>
        <FurnitureSection />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">2. LibImageFurnitureHome (Home Style)</h2>
        <LibImageFurnitureHome />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">3. LibImageFurnitureLifestyle (Lifestyle Style)</h2>
        <LibImageFurnitureLifestyle />
      </div>
    </div>
  );
}
