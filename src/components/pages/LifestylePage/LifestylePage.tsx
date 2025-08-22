import LifestyleContent from "./LifestyleContent";

export default function LifestylePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Content - Always rendered on server for search engines */}
      <div className="sr-only">
        <h1>Plevia City - Phong Cách Sống Hiện Đại & Thông Minh</h1>
        <p>Khám phá phong cách sống đẳng cấp tại Plevia City Gia Lai. Nơi hội tụ giữa công nghệ thông minh, tiện ích hiện đại và không gian sống xanh, tạo nên một cộng đồng cư dân văn minh và thịnh vượng.</p>
      </div>

      {/* SEO Fallback Content - Visible content for crawlers */}
      <noscript>
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Plevia City - Phong Cách Sống Hiện Đại & Thông Minh
          </h1>
          <p className="text-lg mb-12 text-center max-w-4xl mx-auto text-gray-600">
            Khám phá phong cách sống đẳng cấp tại Plevia City Gia Lai. Nơi hội tụ giữa công nghệ thông minh, 
            tiện ích hiện đại và không gian sống xanh, tạo nên một cộng đồng cư dân văn minh và thịnh vượng.
          </p>
        </div>
      </noscript>
      
      {/* Interactive Client Components */}
      <div className="lifestyle-page-wrapper">
        <LifestyleContent />
      </div>
    </div>
  );
}
