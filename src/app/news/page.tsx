"use client";

import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import ListNews from '@/components/sections/ListNews/ListNews';
import NewsSectionExample from '@/components/sections/News/NewsSectionExample';
import TabExample from '@/components/ui/Tab/TabExample';
import ScrollReveal from '@/components/shared/ScrollReveal';

// Data test với 20 item tin tức
const testNewsData = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop',
    imageAlt: 'Plevia City - Xe convertible trên đường rừng thông',
    title: 'Plevia City, điều kỳ diệu độc bản từ thời gian',
    description: 'Thời gian là vật liệu kiến trúc quý giá nhất, và Plevia City được tạo nên từ vật liệu hiếm có này. 50 năm kể từ khi những cây thông non được trồng, nơi đây đã trở thành một kiệt tác của thiên nhiên và con người.'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=450&fit=crop',
    imageAlt: 'Phòng ngủ hiện đại với view rừng thông',
    title: 'Từ sống lâu đến sống khỏe: Cách thế hệ mới đang viết lại tiêu chuẩn sống đô thị',
    description: 'Giữa rừng thông, một mô hình sống khỏe đang được định hình, nơi thiên nhiên chữa lành, cộng đồng cùng đồng hành, và sức khỏe được chăm sóc như một phần của nhịp sống mỗi ngày.'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=450&fit=crop',
    imageAlt: 'Không gian làm việc cộng đồng',
    title: 'Coworking Space: Nơi kết nối ý tưởng và sáng tạo',
    description: 'Trong thời đại số hóa, không gian làm việc chung không chỉ là nơi để làm việc mà còn là nơi kết nối những con người có cùng đam mê và khát khao sáng tạo.'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực thư giãn với view thiên nhiên',
    title: 'Thiết kế không gian xanh: Xu hướng mới trong kiến trúc hiện đại',
    description: 'Việc tích hợp thiên nhiên vào không gian sống và làm việc không chỉ mang lại lợi ích về sức khỏe mà còn tạo nên một môi trường sống bền vững cho tương lai.'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=450&fit=crop',
    imageAlt: 'Phòng họp hiện đại với công nghệ cao',
    title: 'Công nghệ thông minh trong không gian làm việc',
    description: 'Từ hệ thống chiếu sáng tự động đến các thiết bị kết nối không dây, công nghệ đang thay đổi cách chúng ta làm việc và tương tác trong không gian chung.'
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực cafe và networking',
    title: 'Networking trong thời đại mới: Kết nối thực và ảo',
    description: 'Sự kết hợp giữa không gian vật lý và nền tảng số đang tạo ra những cơ hội networking chưa từng có, giúp các doanh nhân và chuyên gia mở rộng mạng lưới quan hệ.'
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực sáng tạo với bảng vẽ',
    title: 'Không gian sáng tạo: Nơi ý tưởng được nuôi dưỡng',
    description: 'Môi trường làm việc sáng tạo không chỉ cần công cụ hiện đại mà còn cần không gian thúc đẩy tư duy đổi mới và khuyến khích sự hợp tác giữa các thành viên.'
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực làm việc yên tĩnh',
    title: 'Work-life balance: Cân bằng giữa công việc và cuộc sống',
    description: 'Trong thời đại làm việc từ xa, việc tạo ra ranh giới rõ ràng giữa công việc và cuộc sống cá nhân trở nên quan trọng hơn bao giờ hết.'
  },
  {
    id: '9',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực thuyết trình và sự kiện',
    title: 'Sự kiện và workshop: Nơi chia sẻ kiến thức',
    description: 'Các sự kiện và workshop thường xuyên không chỉ mang lại kiến thức mới mà còn tạo cơ hội để các thành viên kết nối và học hỏi lẫn nhau.'
  },
  {
    id: '10',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực fitness và wellness',
    title: 'Wellness tại nơi làm việc: Sức khỏe là ưu tiên hàng đầu',
    description: 'Từ phòng gym đến các lớp yoga, việc chăm sóc sức khỏe thể chất và tinh thần đang trở thành một phần không thể thiếu của không gian làm việc hiện đại.'
  },
  {
    id: '11',
    imageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực ăn uống và thư giãn',
    title: 'Ẩm thực tại coworking: Nơi giao lưu văn hóa',
    description: 'Không gian ăn uống không chỉ là nơi thưởng thức bữa ăn mà còn là nơi giao lưu văn hóa, chia sẻ công thức và tạo nên những mối quan hệ mới.'
  },
  {
    id: '12',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực đọc sách và học tập',
    title: 'Thư viện số: Tri thức trong tầm tay',
    description: 'Với hàng nghìn đầu sách và tài liệu số, thư viện tại coworking space trở thành nguồn tri thức vô tận cho các thành viên.'
  },
  {
    id: '13',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực trẻ em và gia đình',
    title: 'Family-friendly workspace: Nơi làm việc thân thiện gia đình',
    description: 'Không gian làm việc thân thiện với gia đình không chỉ hỗ trợ các bậc cha mẹ mà còn tạo môi trường học tập sớm cho trẻ em.'
  },
  {
    id: '14',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực ngoài trời và terrace',
    title: 'Làm việc ngoài trời: Kết nối với thiên nhiên',
    description: 'Với không gian ngoài trời rộng rãi, các thành viên có thể tận hưởng không khí trong lành và cảm hứng từ thiên nhiên trong khi làm việc.'
  },
  {
    id: '15',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực startup và incubator',
    title: 'Startup ecosystem: Nuôi dưỡng những ý tưởng mới',
    description: 'Môi trường startup không chỉ cung cấp không gian làm việc mà còn tạo ra hệ sinh thái hỗ trợ các doanh nghiệp mới phát triển.'
  },
  {
    id: '16',
    imageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực mentoring và coaching',
    title: 'Mentoring program: Hướng dẫn từ chuyên gia',
    description: 'Chương trình mentoring kết nối các thành viên mới với những chuyên gia giàu kinh nghiệm, tạo cơ hội học hỏi và phát triển sự nghiệp.'
  },
  {
    id: '17',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực nghệ thuật và triển lãm',
    title: 'Art space: Nơi sáng tạo nghệ thuật',
    description: 'Không gian nghệ thuật không chỉ trưng bày tác phẩm mà còn là nơi khuyến khích sự sáng tạo và biểu đạt nghệ thuật của các thành viên.'
  },
  {
    id: '18',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực hội thảo và đào tạo',
    title: 'Training center: Nâng cao kỹ năng chuyên môn',
    description: 'Trung tâm đào tạo cung cấp các khóa học và chương trình phát triển kỹ năng, giúp các thành viên không ngừng cải thiện năng lực.'
  },
  {
    id: '19',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực thương mại và retail',
    title: 'Retail space: Kết nối doanh nghiệp và khách hàng',
    description: 'Không gian thương mại tạo cơ hội cho các doanh nghiệp trưng bày sản phẩm và kết nối trực tiếp với khách hàng tiềm năng.'
  },
  {
    id: '20',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=450&fit=crop',
    imageAlt: 'Khu vực rooftop và view toàn cảnh',
    title: 'Rooftop garden: Thiên đường xanh trên cao',
    description: 'Vườn trên mái không chỉ là không gian thư giãn mà còn góp phần tạo ra môi trường sống bền vững và giảm thiểu tác động của đô thị hóa.'
  }
];

export default function NewsPage() {
  return (
    <PageLayout>
      <ScrollReveal>
        <ImageHeader/>
      </ScrollReveal>
      <ScrollReveal>
        <ListNews newsItems={testNewsData} />
      </ScrollReveal>
    </PageLayout>
  );
} 