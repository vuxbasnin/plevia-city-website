import { z } from "zod";
import type { Timestamp } from "firebase/firestore"; // Keep for saving, but not for client prop type

// Base item for lists, ensuring an ID
export interface BaseItem {
  id: string;
}

const httpsUrlOrEmptyOrBlobRefinement = (val: string) =>
  val === "" ||
  val.startsWith("https://") ||
  val.startsWith("blob:") ||
  val.startsWith("http://"); // Allow http for icons too
const httpsUrlOrEmptyOrBlobMessage =
  "URL hình ảnh/video/icon phải là URL hợp lệ (http(s)://), file tạm (blob:), hoặc để trống nếu chờ upload.";
const httpsUrlOrEmptyRefinement = (val: string) =>
  val === "" || val.startsWith("https://") || val.startsWith("http://");
const httpsUrlOrEmptyMessage =
  "URL phải là URL hợp lệ (http(s)://) hoặc để trống.";

// Social Link Item
export const socialLinkItemSchema = z.object({
  id: z.string(),
  platformName: z
    .string()
    .min(1, "Tên nền tảng không được để trống.")
    .max(30, "Tên nền tảng không quá 30 ký tự."),
  iconName: z
    .string()
    .min(1, "Tên icon (Lucide) hoặc URL ảnh không được để trống.")
    .max(255, "Tên icon hoặc URL không quá 255 ký tự."), // Increased length for URLs
  url: z
    .string()
    .url({
      message: "URL không hợp lệ. Phải bắt đầu bằng http:// hoặc https://",
    })
    .min(1, "URL không được để trống."),
});
export type SocialLinkItem = z.infer<typeof socialLinkItemSchema>;

// Site Settings
export const siteSettingsFormSchema = z.object({
  siteTitle: z
    .string()
    .min(1, "Tiêu đề trang không được để trống.")
    .max(70, "Tiêu đề trang không quá 70 ký tự."),
  siteDescription: z
    .string()
    .min(1, "Mô tả trang không được để trống.")
    .max(160, "Mô tả trang không quá 160 ký tự."),
  logoUrl: z
    .string()
    .refine(httpsUrlOrEmptyOrBlobRefinement, {
      message: httpsUrlOrEmptyOrBlobMessage,
    })
    .optional()
    .default(""),
  faviconUrl: z
    .string()
    .refine(httpsUrlOrEmptyOrBlobRefinement, {
      message: httpsUrlOrEmptyOrBlobMessage,
    })
    .optional()
    .default(""),
  contactPhone: z
    .string()
    .max(20, "Số điện thoại không quá 20 ký tự.")
    .optional()
    .default(""),
  contactEmail: z
    .string()
    .email({ message: "Email liên hệ không hợp lệ." })
    .or(z.literal(""))
    .optional()
    .default(""),
  contactAddress: z
    .string()
    .max(200, "Địa chỉ không quá 200 ký tự.")
    .optional()
    .default(""),
  companyName: z
    .string()
    .min(1, "Tên công ty không được để trống.")
    .max(50, "Tên công ty không quá 50 ký tự.")
    .default("Plevia City"),
  socialLinks: z.array(socialLinkItemSchema).optional().default([]),
});
export type SiteSettingsData = z.infer<typeof siteSettingsFormSchema>;

// Hero Section (Main Page)
export const heroFormSchema = z.object({
  headline: z
    .string()
    .min(1, "Tiêu đề không được để trống.")
    .max(100, "Tiêu đề không quá 100 ký tự."),
  subheadline: z
    .string()
    .min(1, "Mô tả phụ không được để trống.")
    .max(200, "Mô tả phụ không quá 200 ký tự."),
  ctaText: z
    .string()
    .min(1, "Nút CTA không được để trống.")
    .max(30, "Nút CTA không quá 30 ký tự."),
  ctaLink: z.string().url("Link CTA không hợp lệ."),
  imageUrl: z
    .string()
    .refine(httpsUrlOrEmptyOrBlobRefinement, {
      message: httpsUrlOrEmptyOrBlobMessage,
    })
    .optional()
    .default(""),
});
export type HeroSectionData = z.infer<typeof heroFormSchema>;

// Seating Options Section
export const seatingOptionItemSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Tên loại chỗ ngồi không được để trống.")
    .max(50, "Tên loại chỗ ngồi không quá 50 ký tự."),
  description: z
    .string()
    .min(1, "Mô tả không được để trống.")
    .max(150, "Mô tả không quá 150 ký tự."),
  imageUrl: z
    .string()
    .refine(httpsUrlOrEmptyOrBlobRefinement, {
      message: httpsUrlOrEmptyOrBlobMessage,
    })
    .optional()
    .default(""),
});
export type SeatingOptionItem = z.infer<typeof seatingOptionItemSchema>;

export interface SeatingSectionData {
  options: SeatingOptionItem[];
}

// Amenities Section
export const amenityItemSchema = z.object({
  id: z.string(),
  icon: z
    .string()
    .min(1, "Tên icon (Lucide) hoặc URL ảnh không được để trống.")
    .max(255, "Tên icon hoặc URL không quá 255 ký tự."),
  name: z
    .string()
    .min(1, "Tên dịch vụ không được để trống.")
    .max(50, "Tên dịch vụ không quá 50 ký tự."),
  description: z
    .string()
    .min(1, "Mô tả không được để trống.")
    .max(150, "Mô tả không quá 150 ký tự."),
});
export type AmenityItem = z.infer<typeof amenityItemSchema>;

export interface AmenitiesSectionData {
  items: AmenityItem[];
}

// Member Benefits Section (Items managed here, Page settings are separate)
export const benefitItemSchema = z.object({
  id: z.string(),
  icon: z
    .string()
    .min(1, "Tên icon (Lucide) hoặc URL ảnh không được để trống.")
    .max(255, "Tên icon hoặc URL không quá 255 ký tự."),
  title: z
    .string()
    .min(1, "Tiêu đề quyền lợi không được để trống.")
    .max(50, "Tiêu đề không quá 50 ký tự."),
  shortDescription: z
    .string()
    .min(1, "Mô tả ngắn không được để trống.")
    .max(150, "Mô tả ngắn không quá 150 ký tự."),
  detailedDescription: z
    .string()
    .min(1, "Mô tả chi tiết không được để trống.")
    .max(500, "Mô tả chi tiết không quá 500 ký tự."),
  imageUrl: z
    .string()
    .refine(httpsUrlOrEmptyOrBlobRefinement, {
      message: httpsUrlOrEmptyOrBlobMessage,
    })
    .optional()
    .default(""),
});
export type BenefitItem = z.infer<typeof benefitItemSchema>;

export interface MemberBenefitsSectionData {
  items: BenefitItem[];
}

// Member Benefits Page Settings (NEW)
export const memberBenefitsPageSettingsSchema = z.object({
  heroTitle: z
    .string()
    .min(1, "Tiêu đề Hero không được để trống.")
    .max(150, "Tiêu đề Hero không quá 150 ký tự."),
  heroDescription: z
    .string()
    .min(1, "Mô tả Hero không được để trống.")
    .max(300, "Mô tả Hero không quá 300 ký tự."),
  heroCtaButtonText: z
    .string()
    .min(1, "Chữ nút Hero CTA không được để trống.")
    .max(40, "Chữ nút Hero CTA không quá 40 ký tự."),
  finalCtaHeadline: z
    .string()
    .min(1, "Tiêu đề CTA cuối trang không được để trống.")
    .max(150, "Tiêu đề CTA cuối trang không quá 150 ký tự."),
  finalCtaDescription: z
    .string()
    .min(1, "Mô tả CTA cuối trang không được để trống.")
    .max(300, "Mô tả CTA cuối trang không quá 300 ký tự."),
  finalCtaButtonText: z
    .string()
    .min(1, "Chữ nút CTA cuối trang không được để trống.")
    .max(40, "Chữ nút CTA cuối trang không quá 40 ký tự."),
});
export type MemberBenefitsPageSettingsData = z.infer<
  typeof memberBenefitsPageSettingsSchema
>;

// Community Culture Section
export const cultureImageSchema = z.object({
  id: z.string(),
  imageUrl: z
    .string()
    .refine(httpsUrlOrEmptyOrBlobRefinement, {
      message: httpsUrlOrEmptyOrBlobMessage,
    })
    .optional()
    .default(""),
  description: z
    .string()
    .min(1, "Mô tả ảnh không được để trống.")
    .max(100, "Mô tả ảnh không quá 100 ký tự."),
});
export type CultureImageItem = z.infer<typeof cultureImageSchema>;

export const cultureFeatureSchema = z.object({
  id: z.string(),
  icon: z
    .string()
    .min(1, "Tên icon (Lucide) hoặc URL ảnh không được để trống.")
    .max(255, "Tên icon hoặc URL không quá 255 ký tự."),
  title: z
    .string()
    .min(1, "Tiêu đề đặc điểm không được để trống.")
    .max(50, "Tiêu đề không quá 50 ký tự."),
  description: z
    .string()
    .min(1, "Mô tả không được để trống.")
    .max(100, "Mô tả không quá 100 ký tự."),
});
export type CultureFeatureItem = z.infer<typeof cultureFeatureSchema>;

export const communityCultureFormSchema = z.object({
  mainText: z
    .string()
    .min(1, "Nội dung chính không được để trống.")
    .max(500, "Nội dung chính không quá 500 ký tự."),
  quote: z
    .string()
    .min(1, "Trích dẫn không được để trống.")
    .max(200, "Trích dẫn không quá 200 ký tự."),
  quoteAuthor: z
    .string()
    .min(1, "Tên tác giả trích dẫn không được để trống.")
    .max(50, "Tên tác giả không quá 50 ký tự."),
  gallery: z.array(cultureImageSchema),
  features: z.array(cultureFeatureSchema),
  videoUrl: z
    .string()
    .refine(httpsUrlOrEmptyOrBlobRefinement, {
      message: httpsUrlOrEmptyOrBlobMessage,
    })
    .optional()
    .or(z.literal("")),
});
export type CommunityCultureSectionData = z.infer<
  typeof communityCultureFormSchema
>;

// Final CTA Section (Main Page)
export const finalCtaFormSchema = z.object({
  headline: z
    .string()
    .min(1, "Tiêu đề không được để trống.")
    .max(100, "Tiêu đề không quá 100 ký tự."),
  description: z
    .string()
    .min(1, "Mô tả không được để trống.")
    .max(200, "Mô tả không quá 200 ký tự."),
  cta1Text: z
    .string()
    .min(1, "Nút CTA 1 không được để trống.")
    .max(30, "Nút CTA 1 không quá 30 ký tự."),
  cta1Link: z.string().url("Link CTA 1 không hợp lệ.").or(z.literal("#")),
  cta2Text: z
    .string()
    .min(1, "Nút CTA 2 không được để trống.")
    .max(30, "Nút CTA 2 không quá 30 ký tự."),
  cta2Link: z.string().url("Link CTA 2 không hợp lệ.").or(z.literal("#")),
});
export type FinalCtaSectionData = z.infer<typeof finalCtaFormSchema>;

// Trial Signups (from Contact Form)
export const trialSignupStatuses = [
  "pending",
  "contacted",
  "resolved",
  "archived",
] as const;
export type TrialSignupStatus = (typeof trialSignupStatuses)[number];

export interface TrialSignupData {
  id: string;
  fullName: string;
  email: string;
  message?: string;
  createdAt: Date;
  status: TrialSignupStatus;
}

// Connect Signups (from FormInfo)
export const connectSignupStatuses = [
  "pending",
  "contacted",
  "resolved",
  "archived",
  "deleted",
] as const;
export type ConnectSignupStatus = (typeof connectSignupStatuses)[number];

export interface ConnectSignupData {
  id: string;
  fullName: string;
  email: string;
  message?: string;
  createdAt: Date;
  status: ConnectSignupStatus;
  source?: string;
}

// Tour Booking
export const tourBookingTimeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
] as const;
export type TourBookingTimeSlot = (typeof tourBookingTimeSlots)[number];

export const tourBookingFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự.")
    .max(100, "Họ tên không quá 100 ký tự."),
  email: z.string().email("Địa chỉ email không hợp lệ."),
  phone: z
    .string()
    .max(20, "Số điện thoại không quá 20 ký tự.")
    .optional()
    .default(""),
  preferredDate: z.date({ required_error: "Ngày tham quan là bắt buộc." }),
  preferredTime: z.enum(tourBookingTimeSlots, {
    required_error: "Giờ tham quan là bắt buộc.",
  }),
  numberOfPeople: z
    .number()
    .min(1, "Số lượng người phải ít nhất là 1.")
    .max(50, "Số lượng người không quá 50."),
  notes: z
    .string()
    .max(500, "Ghi chú không quá 500 ký tự.")
    .optional()
    .default(""),
});
export type TourBookingFormData = z.infer<typeof tourBookingFormSchema>;

export const tourBookingStatuses = [
  "pending_confirmation",
  "confirmed",
  "cancelled_by_user",
  "cancelled_by_admin",
  "completed",
  "no_show",
] as const;
export type TourBookingStatus = (typeof tourBookingStatuses)[number];

export interface TourBookingData {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  preferredDate: Date;
  preferredTime: TourBookingTimeSlot;
  numberOfPeople: number;
  notes?: string;
  createdAt: Date;
  status: TourBookingStatus;
}

// News/Article Management Types
export interface NewsArticle {
  id: string;
  title: string;
  content: EditorJSOutput;
  author: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  coverImageUrl?: string;
  summary: string;
  tags: string[];
  isPublished: boolean;
  slug?: string;
}

// Editor.js Output Structure
export interface EditorJSOutput {
  time: number;
  blocks: EditorJSBlock[];
  version: string;
}

export interface EditorJSBlock {
  id?: string;
  type: string;
  data: any;
}

// Common Editor.js Block Types
export interface EditorJSHeaderBlock {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface EditorJSParagraphBlock {
  text: string;
}

export interface EditorJSImageBlock {
  file: {
    url: string;
    name?: string;
    size?: number;
  };
  caption?: string;
  withBorder?: boolean;
  stretched?: boolean;
  withBackground?: boolean;
}

export interface EditorJSListBlock {
  style: 'ordered' | 'unordered';
  items: string[];
}

export interface EditorJSQuoteBlock {
  text: string;
  caption?: string;
  alignment?: 'left' | 'center';
}

export interface EditorJSCodeBlock {
  code: string;
  language?: string;
}

// News Form Schema
export const newsArticleFormSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  content: z.object({
    time: z.number(),
    blocks: z.array(z.object({
      id: z.string().optional(),
      type: z.string(),
      data: z.any()
    })),
    version: z.string()
  }),
  author: z.string().min(1, "Tác giả không được để trống"),
  summary: z.string().min(1, "Tóm tắt không được để trống"),
  tags: z.array(z.string()),
  isPublished: z.boolean(),
  coverImageUrl: z.string().optional(),
  slug: z.string().optional()
});

export type NewsArticleFormData = z.infer<typeof newsArticleFormSchema>;

// Default News Article Data
export const defaultNewsArticleData: NewsArticleFormData = {
  title: "",
  content: {
    time: Date.now(),
    blocks: [
      {
        id: "default-paragraph",
        type: "paragraph",
        data: {
          text: "Bắt đầu viết bài viết của bạn ở đây..."
        }
      }
    ],
    version: "2.30.8"
  },
  author: "",
  summary: "",
  tags: [],
  isPublished: false,
  coverImageUrl: "",
  slug: ""
};

// Default structures
export const defaultSiteSettingsData: SiteSettingsData = {
  siteTitle: "Plevia City - Khu đô thị thông minh đầu tiên tại Gia Lai",
  siteDescription:
    "Plevia City là khu đô thị thông minh đầu tiên có ứng dụng 'Trí tuệ nhân tạo' được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.",
  logoUrl: "",
  faviconUrl: "",
  contactPhone: "(+84) 123 456 789",
  contactEmail: "info@pleviacity.vn",
  contactAddress: "Phường Hội Phú, Thành phố Pleiku, Tỉnh Gia Lai",
  companyName: "Plevia City",
  socialLinks: [],
};

export const defaultHeroSectionData: HeroSectionData = {
  headline: "Không Gian Làm Việc Lý Tưởng Của Bạn",
  subheadline:
    "Khám phá môi trường làm việc chung đầy cảm hứng, kết nối và sáng tạo được thiết kế dành riêng cho bạn.",
  ctaText: "Tìm Hiểu Ngay",
  ctaLink: "#seating-options",
  imageUrl: "https://placehold.co/1200x800.png?text=Hero+Image",
};

export const defaultSeatingSectionData: SeatingSectionData = {
  options: [
    {
      id: "1",
      title: "Bàn Làm Việc Linh Hoạt",
      description:
        "Chọn một chỗ ngồi ngẫu nhiên trong khu vực chung. Hoàn hảo cho sự tự do và kết nối.",
      imageUrl: "https://placehold.co/400x300.png?text=Bàn+Linh+Hoạt",
    },
    {
      id: "2",
      title: "Bàn Làm Việc Cố Định",
      description:
        "Không gian riêng của bạn, luôn sẵn sàng mỗi ngày. Tùy chỉnh theo phong cách cá nhân.",
      imageUrl: "https://placehold.co/400x300.png?text=Bàn+Cố+Định",
    },
    {
      id: "3",
      title: "Văn Phòng Riêng Tư",
      description:
        "Giải pháp tối ưu cho đội nhóm, bảo mật và đầy đủ tiện nghi chuyên nghiệp.",
      imageUrl: "https://placehold.co/400x300.png?text=Văn+Phòng+Riêng",
    },
  ],
};

export const defaultAmenitiesSectionData: AmenitiesSectionData = {
  items: [
    {
      id: "1",
      icon: "Wifi",
      name: "Internet Tốc Độ Cao",
      description:
        "Kết nối Wi-Fi & LAN ổn định, nhanh chóng cho mọi nhu cầu công việc.",
    },
    {
      id: "2",
      icon: "Coffee",
      name: "Khu Vực Pantry Hiện Đại",
      description:
        "Trà, cà phê và đồ ăn nhẹ miễn phí, không gian thư giãn lý tưởng.",
    },
    {
      id: "3",
      icon: "Printer",
      name: "Thiết Bị Văn Phòng",
      description:
        "Máy in, photocopy, scan đa chức năng luôn sẵn sàng phục vụ.",
    },
    {
      id: "4",
      icon: "Users",
      name: "Phòng Họp Đầy Đủ",
      description:
        "Phòng họp tiện nghi, trang bị hiện đại cho các cuộc họp hiệu quả.",
    },
  ],
};

export const defaultMemberBenefitsSectionData: MemberBenefitsSectionData = {
  items: [
    {
      id: "1",
      icon: "Zap",
      title: "Nâng Cao Năng Suất",
      shortDescription:
        "Môi trường làm việc chuyên nghiệp, tập trung giúp bạn đạt hiệu quả cao nhất.",
      detailedDescription:
        "Với không gian yên tĩnh, thiết kế khoa học và đầy đủ tiện nghi, bạn sẽ dễ dàng tập trung vào công việc, hoàn thành mục tiêu nhanh hơn và cảm thấy tràn đầy năng lượng suốt cả ngày. Chúng tôi loại bỏ mọi phiền nhiễu để bạn có thể cống hiến hết mình.",
      imageUrl: "https://placehold.co/600x400.png?text=Benefit+1+Image",
    },
    {
      id: "2",
      icon: "Users",
      title: "Mở Rộng Kết Nối",
      shortDescription:
        "Gặp gỡ, giao lưu và hợp tác với cộng đồng các chuyên gia tài năng.",
      detailedDescription:
        "Tham gia vào một cộng đồng đa dạng gồm các chuyên gia, doanh nhân và người làm việc tự do từ nhiều lĩnh vực. Đây là cơ hội tuyệt vời để mở rộng mạng lưới quan hệ, tìm kiếm đối tác, học hỏi kinh nghiệm và nhận được sự hỗ trợ từ những người cùng chí hướng.",
      imageUrl: "https://placehold.co/600x400.png?text=Benefit+2+Image",
    },
    {
      id: "3",
      icon: "Briefcase",
      title: "Sự Kiện Đa Dạng",
      shortDescription:
        "Tham gia các workshop, hội thảo và sự kiện networking độc quyền.",
      detailedDescription:
        "WorkspaceCo thường xuyên tổ chức các sự kiện phong phú, từ các buổi workshop nâng cao kỹ năng, hội thảo chuyên đề đến các buổi gặp gỡ networking thân mật. Đây là cách tuyệt vời để bạn cập nhật kiến thức, phát triển bản thân và làm phong phú thêm đời sống công việc.",
      imageUrl: "https://placehold.co/600x400.png?text=Benefit+3+Image",
    },
  ],
};

export const defaultMemberBenefitsPageSettingsData: MemberBenefitsPageSettingsData =
  {
    heroTitle:
      "Đặc Quyền Độc Quyền Tại Teddy Space: Nâng Tầm Trải Nghiệm Của Bạn",
    heroDescription:
      "Khám phá những lợi ích vượt trội khi trở thành một phần của cộng đồng Teddy Space. Chúng tôi mang đến không chỉ không gian làm việc mà còn là cơ hội phát triển toàn diện, giúp bạn thăng hoa trong sự nghiệp.",
    heroCtaButtonText: "Đăng ký dùng thử ngay",
    finalCtaHeadline: "Sẵn Sàng Khai Phóng Tiềm Năng Cùng Teddy Space?",
    finalCtaDescription:
      "Tham gia cộng đồng năng động, tận hưởng không gian làm việc truyền cảm hứng và các đặc quyền chỉ dành riêng cho thành viên. Bước đầu tiên thật dễ dàng.",
    finalCtaButtonText: "Đăng ký dùng thử ngay",
  };

export const defaultCommunityCultureSectionData: CommunityCultureSectionData = {
  mainText:
    "Tại WorkspaceCo, chúng tôi tin rằng một môi trường làm việc tuyệt vời không chỉ là về không gian vật lý, mà còn là về con người và văn hóa. Chúng tôi xây dựng một cộng đồng nơi sự hợp tác, chia sẻ kiến thức và hỗ trợ lẫn nhau được khuyến khích mạnh mẽ. Đây là nơi bạn có thể tìm thấy nguồn cảm hứng, đối tác tiềm năng và những người bạn đồng hành trên con đường phát triển sự nghiệp.",
  quote:
    "WorkspaceCo không chỉ là nơi làm việc, đó là một cộng đồng nơi tôi cảm thấy được truyền cảm hứng mỗi ngày.",
  quoteAuthor: "Một Thành Viên Hạnh Phúc",
  gallery: [
    {
      id: "g1",
      imageUrl: "https://placehold.co/400x400.png?text=Ảnh+1",
      description: "Sự kiện cộng đồng vui vẻ",
    },
    {
      id: "g2",
      imageUrl: "https://placehold.co/400x400.png?text=Ảnh+2",
      description: "Không gian làm việc chung đầy sáng tạo",
    },
    {
      id: "g3",
      imageUrl: "https://placehold.co/400x400.png?text=Ảnh+3",
      description: "Buổi workshop chia sẻ kiến thức",
    },
    {
      id: "g4",
      imageUrl: "https://placehold.co/400x400.png?text=Ảnh+4",
      description: "Góc thư giãn tại WorkspaceCo",
    },
  ],
  features: [
    {
      id: "f1",
      icon: "Users",
      title: "Cộng Đồng Gắn Kết",
      description:
        "Nơi các thành viên không chỉ làm việc mà còn chia sẻ, học hỏi và hỗ trợ lẫn nhau.",
    },
    {
      id: "f2",
      icon: "MessageSquare",
      title: "Giao Tiếp Cởi Mở",
      description:
        "Khuyến khích sự trao đổi ý tưởng và phản hồi xây dựng trong một môi trường thân thiện.",
    },
    {
      id: "f3",
      icon: "TrendingUp",
      title: "Phát Triển Không Ngừng",
      description:
        "Cung cấp cơ hội học tập và phát triển kỹ năng thông qua các sự kiện và workshop.",
    },
  ],
  videoUrl: "",
};

export const defaultFinalCtaSectionData: FinalCtaSectionData = {
  headline: "Sẵn Sàng Khám Phá Không Gian Lý Tưởng Của Bạn?",
  description:
    "Đừng bỏ lỡ cơ hội trở thành một phần của cộng đồng WorkspaceCo. Liên hệ ngay để nhận ưu đãi đặc biệt hoặc đặt lịch tham quan không gian của chúng tôi!",
  cta1Text: "Đăng Ký Dùng Thử",
  cta1Link: "#",
  cta2Text: "Đặt Lịch Tham Quan",
  cta2Link: "#",
};

// Furniture Section (Các mẫu Nội thất)
export const furnitureItemSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Tên mẫu nội thất không được để trống.")
    .max(100, "Tên mẫu nội thất không quá 100 ký tự."),
  description: z
    .string()
    .min(1, "Mô tả không được để trống.")
    .max(300, "Mô tả không quá 300 ký tự."),
  category: z
    .string()
    .min(1, "Danh mục không được để trống.")
    .max(50, "Danh mục không quá 50 ký tự."),
  imageUrl: z
    .string()
    .refine(httpsUrlOrEmptyOrBlobRefinement, {
      message: httpsUrlOrEmptyOrBlobMessage,
    })
    .optional()
    .default(""),
  price: z
    .string()
    .max(50, "Giá không quá 50 ký tự.")
    .optional()
    .default(""),
  dimensions: z
    .string()
    .max(100, "Kích thước không quá 100 ký tự.")
    .optional()
    .default(""),
});
export type FurnitureItem = z.infer<typeof furnitureItemSchema>;

export interface FurnitureSectionData {
  items: FurnitureItem[];
}

// Helper type for Section Keys
export type SectionKey =
  | "hero"
  | "seating"
  | "amenities"
  | "benefits"
  | "culture"
  | "finalCta"
  | "siteSettings"
  | "memberBenefitsPage"
  | "furniture";

// Function to get default data for a section key
export function getDefaultData(sectionKey: SectionKey): any {
  switch (sectionKey) {
    case "hero":
      return { ...defaultHeroSectionData };
    case "seating":
      return {
        ...defaultSeatingSectionData,
        options: [...defaultSeatingSectionData.options.map((o) => ({ ...o }))],
      };
    case "amenities":
      return {
        ...defaultAmenitiesSectionData,
        items: [...defaultAmenitiesSectionData.items.map((i) => ({ ...i }))],
      };
    case "benefits":
      return {
        ...defaultMemberBenefitsSectionData,
        items: [
          ...defaultMemberBenefitsSectionData.items.map((b) => ({
            ...b,
            shortDescription: b.shortDescription || "Mô tả ngắn mặc định.", // Fallback if somehow missing
            detailedDescription:
              b.detailedDescription ||
              "Mô tả chi tiết mặc định cho quyền lợi này.", // Fallback
          })),
        ],
      };
    case "memberBenefitsPage":
      return { ...defaultMemberBenefitsPageSettingsData };
    case "culture":
      return {
        ...defaultCommunityCultureSectionData,
        gallery: [
          ...defaultCommunityCultureSectionData.gallery.map((g) => ({ ...g })),
        ],
        features: [
          ...defaultCommunityCultureSectionData.features.map((f) => ({ ...f })),
        ],
      };
    case "finalCta":
      return { ...defaultFinalCtaSectionData };
    case "siteSettings":
      return {
        ...defaultSiteSettingsData,
        socialLinks: [
          ...defaultSiteSettingsData.socialLinks.map((sl) => ({
            ...sl,
            id:
              Date.now().toString() +
              Math.random().toString(36).substring(2, 7),
          })),
        ],
      };
    case "furniture":
      return { items: [] };
    default:
      const _exhaustiveCheck: never = sectionKey;
      console.warn(
        `Default data not found for section key: ${_exhaustiveCheck}`
      );
      return {};
  }
}
