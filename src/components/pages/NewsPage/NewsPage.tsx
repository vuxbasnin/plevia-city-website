import NewsContent from "./NewsContent";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Content - Always rendered on server for search engines */}
      <div className="sr-only">
        <h1>Plevia City - Tin Tức & Cập Nhật Dự Án Gia Lai</h1>
        <p>Cập nhật tin tức mới nhất về dự án Plevia City Gia Lai. Khám phá tiến độ xây dựng, sự kiện đặc biệt, và những thông tin quan trọng về khu đô thị thông minh đầu tiên tại Tây Nguyên.</p>
      </div>

      {/* SEO Fallback Content - Visible content for crawlers */}
      <noscript>
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Plevia City - Tin Tức & Cập Nhật Dự Án Gia Lai
          </h1>
          <p className="text-lg mb-12 text-center max-w-4xl mx-auto text-gray-600">
            Cập nhật tin tức mới nhất về dự án Plevia City Gia Lai. Khám phá tiến độ xây dựng, 
            sự kiện đặc biệt, và những thông tin quan trọng về khu đô thị thông minh đầu tiên tại Tây Nguyên.
          </p>
        </div>
      </noscript>
      
      {/* Interactive Client Components */}
      <NewsContent />
    </div>
  );
}
