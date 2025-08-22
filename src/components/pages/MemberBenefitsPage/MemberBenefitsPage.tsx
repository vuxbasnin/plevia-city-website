import MemberBenefitsContent from "./MemberBenefitsContent";

export default function MemberBenefitsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Content - Always rendered on server for search engines */}
      <div className="sr-only">
        <h1>Plevia City - Quyền Lợi Thành Viên & Ưu Đãi Độc Quyền</h1>
        <p>Khám phá các quyền lợi đặc biệt dành cho thành viên Plevia City. Từ không gian làm việc hiện đại đến các dịch vụ ưu đãi độc quyền, trải nghiệm cuộc sống đẳng cấp tại khu đô thị thông minh Gia Lai.</p>
      </div>

      {/* SEO Fallback Content - Visible content for crawlers */}
      <noscript>
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Plevia City - Quyền Lợi Thành Viên & Ưu Đãi Độc Quyền
          </h1>
          <p className="text-lg mb-12 text-center max-w-4xl mx-auto text-gray-600">
            Khám phá các quyền lợi đặc biệt dành cho thành viên Plevia City. Từ không gian làm việc hiện đại 
            đến các dịch vụ ưu đãi độc quyền, trải nghiệm cuộc sống đẳng cấp tại khu đô thị thông minh Gia Lai.
          </p>
        </div>
      </noscript>
      
      {/* Interactive Client Components */}
      <MemberBenefitsContent />
    </div>
  );
}
