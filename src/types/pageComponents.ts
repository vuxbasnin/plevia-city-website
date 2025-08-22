// Types for IoT Page
export interface IoTSection {
  id: number;
  title: string;
  description: string;
  image: string;
  video: string;
  gradient: string;
}

export interface IoTClientComponentsProps {
  sections: IoTSection[];
}

// Types for Lifestyle Page
export interface LifestyleSection {
  type: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  images?: string[];
  tableData?: any;
  tabs?: any[];
}

export interface LifestyleData {
  title: string;
  subtitle: string;
  description: string;
  sections: LifestyleSection[];
}

// Types for Storyline Page
export interface StorylineItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface StorylineSection {
  title: string;
  description: string;
  items: StorylineItem[];
}

export interface StorylineData {
  sectionOne: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  sectionFour: StorylineSection;
  sectionFive: StorylineSection;
}

// Types for Location Page
export interface LocationMapData {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface LocationExtensionItem {
  id: string;
  title: string;
  description: string;
  distance?: string;
  category?: string;
}

export interface LocationData {
  map: LocationMapData;
  mapExtension: {
    title: string;
    description: string;
    items: LocationExtensionItem[];
  };
}

// Types for News Page
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImageUrl?: string;
  slug: string;
  publishedAt: Date;
  status: 'draft' | 'published';
  author?: string;
  tags?: string[];
}

export interface NewsPageProps {
  articles?: NewsArticle[];
}

// Types for Member Benefits Page
export interface BenefitFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface MemberBenefitsData {
  title: string;
  description: string;
  features: BenefitFeature[];
}

// Common Page Props
export interface PageLayoutProps {
  children: React.ReactNode;
}

export interface BasePageProps {
  className?: string;
}
