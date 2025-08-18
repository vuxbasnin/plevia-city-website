import React from 'react';

interface StructuredDataProps {
  type: 'home' | 'lifestyle' | 'location' | 'storyline' | 'member-benefits' | 'news' | 'iot';
}

export default function StructuredData({ type }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Plevia City - Tổ Hợp Liền Kề & Shophouse Đẳng Cấp",
      "alternateName": ["PleviaCity", "Plevia City"],
      "url": "https://pleviacity.vn",
      "logo": "https://pleviacity.vn/Logo_green_3.png",
      "image": [
        "https://pleviacity.vn/assets/home/plevia_city.jpg",
        "https://pleviacity.vn/assets/home/banner_home.png",
        "https://pleviacity.vn/assets/home/song_tinh_hoa.png"
      ],
      "description": "Plevia City là khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Phường Hội Phú",
        "addressLocality": "Pleiku",
        "addressRegion": "Gia Lai",
        "addressCountry": "VN",
        "postalCode": "60000"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "13.9833",
        "longitude": "108.0000"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Vietnamese",
        "areaServed": "VN"
      },
      "areaServed": {
        "@type": "City",
        "name": "Pleiku"
      },
      "sameAs": [
        "https://facebook.com/pleviacity",
        "https://instagram.com/pleviacity",
        "https://youtube.com/@pleviacity"
      ],
      "keywords": "Plevia City, pleviacity, khu đô thị thông minh Gia Lai, dự án bất động sản Pleiku, căn hộ Gia Lai, biệt thự Pleiku, shophouse Gia Lai, đô thị thông minh, AI Gia Lai, bất động sản cao cấp",
      "foundingDate": "2023",
      "numberOfEmployees": "50-100",
      "priceRange": "$$",
      "currenciesAccepted": "VND",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "openingHours": "Mo-Su 08:00-18:00"
    };

    switch (type) {
      case 'home':
        return {
          ...baseData,
          "@type": "RealEstateAgent",
          "description": "Plevia City - Khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo tại Gia Lai. Dự án bất động sản cao cấp với căn hộ, biệt thự, shophouse thông minh.",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Sản phẩm đô thị thông minh Plevia City",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Căn hộ thông minh Plevia City" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Biệt thự thông minh Plevia City" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Shophouse thông minh Plevia City" } }
            ]
          },
          "serviceType": "Bất động sản cao cấp",
          "areaServed": {
            "@type": "Place",
            "name": "Gia Lai, Việt Nam"
          },
          "hasMap": "https://pleviacity.vn/assets/home/ban_do_vi_tri.png",
          "photo": [
            "https://pleviacity.vn/assets/home/plevia_city.jpg",
            "https://pleviacity.vn/assets/home/banner_home.png",
            "https://pleviacity.vn/assets/home/song_tinh_hoa.png"
          ],
          "amenityFeature": [
            {
              "@type": "LocationFeatureSpecification",
              "name": "Khu đô thị thông minh",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification", 
              "name": "Ứng dụng AI",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Môi trường xanh",
              "value": true
            }
          ]
        };
      case 'lifestyle':
        return {
          ...baseData,
          "description": "Khám phá lối sống hiện đại tại Plevia City - Khu đô thị thông minh với tiện ích đẳng cấp, môi trường sống xanh và công nghệ AI tiên tiến.",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Lối sống hiện đại Plevia City",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Tiện ích đẳng cấp" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Môi trường sống xanh" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Công nghệ AI" } }
            ]
          }
        };
      case 'location':
        return {
          ...baseData,
          "description": "Vị trí đắc địa của Plevia City tại Pleiku, Gia Lai - Kết nối hoàn hảo với trung tâm hành chính và các tiện ích quan trọng.",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Vị trí đắc địa Plevia City",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Vị trí trung tâm" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Giao thông thuận tiện" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Tiện ích xung quanh" } }
            ]
          }
        };
      case 'iot':
        return {
          ...baseData,
          "@type": "TechArticle",
          "headline": "Plevia City - Công Nghệ IoT & AI Vận Hành Khu Đô Thị Thông Minh Gia Lai",
          "description": "Khám phá công nghệ IoT và AI tiên tiến tại Plevia City Gia Lai. Hệ thống quản lý thông minh, tự động hóa toàn diện, và kết nối vạn vật cho khu đô thị hiện đại nhất Tây Nguyên.",
          "keywords": "Plevia City IoT, khu đô thị thông minh Gia Lai, công nghệ AI Gia Lai, IoT đô thị thông minh, hệ thống quản lý thông minh, tự động hóa đô thị, kết nối vạn vật Gia Lai, công nghệ 4.0 Tây Nguyên, đô thị số hóa, smart city Gia Lai, AI quản lý đô thị, hạ tầng thông minh",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Công nghệ IoT & AI Plevia City",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Hệ thống AI quản lý toàn diện" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Nhà thông minh IoT" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "An ninh AI 24/7" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Giao thông thông minh" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Tiện ích đẳng cấp" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Thời tiết thông minh" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Thẻ cư dân thông minh" } }
            ]
          },
          "author": {
            "@type": "Organization",
            "name": "Plevia City"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Plevia City"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://pleviacity.vn/iot"
          },
          "image": [
            "https://pleviacity.vn/assets/home/plevia_city.jpg",
            "https://pleviacity.vn/assets/home/banner_home.png"
          ]
        };
      default:
        return baseData;
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData())
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Plevia City",
            "url": "https://pleviacity.vn",
            "logo": "https://pleviacity.vn/Logo_green_3.png",
            "description": "Plevia City là khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo được phát triển tại Gia Lai.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Phường Hội Phú",
              "addressLocality": "Pleiku",
              "addressRegion": "Gia Lai",
              "addressCountry": "VN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "Vietnamese"
            },
            "sameAs": [
              "https://facebook.com/pleviacity",
              "https://instagram.com/pleviacity",
              "https://youtube.com/@pleviacity"
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Plevia City",
            "url": "https://pleviacity.vn",
            "description": "Website chính thức của Plevia City - Khu đô thị thông minh đầu tiên tại Gia Lai",
            "publisher": {
              "@type": "Organization",
              "name": "Plevia City"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://pleviacity.vn/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </>
  );
} 