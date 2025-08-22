import StorylineContent from "./StorylineContent";

export default function StorylinePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Content - Always rendered on server for search engines */}
      <div className="sr-only">
        <h1>Plevia City - Câu Chuyện Kiến Tạo Khu Đô Thị Thông Minh Gia Lai</h1>
        <p>Khám phá hành trình kiến tạo Plevia City - khu đô thị thông minh đầu tiên tại Gia Lai. Từ ý tưởng đến hiện thực, từ mơ ước đến thành công, câu chuyện về sự phát triển bền vững và tầm nhìn tương lai.</p>
      </div>

      {/* SEO Fallback Content - Visible content for crawlers */}
      <noscript>
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Plevia City - Câu Chuyện Kiến Tạo Khu Đô Thị Thông Minh Gia Lai
          </h1>
          <p className="text-lg mb-12 text-center max-w-4xl mx-auto text-gray-600">
            Khám phá hành trình kiến tạo Plevia City - khu đô thị thông minh đầu tiên tại Gia Lai. 
            Từ ý tưởng đến hiện thực, từ mơ ước đến thành công, câu chuyện về sự phát triển bền vững và tầm nhìn tương lai.
          </p>
        </div>
      </noscript>
      
      {/* Interactive Client Components */}
      <div className="storyline-page-wrapper">
        <StorylineContent />
      </div>
    </div>
  );
}
