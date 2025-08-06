import React from 'react';

interface StructuredDataProps {
  type: 'home' | 'lifestyle' | 'location' | 'storyline' | 'member-benefits' | 'news';
}

export default function StructuredData({ type }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Plevia City",
      "alternateName": "PleviaCity",
      "url": "https://pleviacity.vn",
      "logo": "https://pleviacity.vn/Logo_green_3.png",
      "image": "https://pleviacity.vn/social_media.png",
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
      "keywords": "Plevia City, pleviacity, khu đô thị thông minh Gia Lai, dự án bất động sản Pleiku, căn hộ Gia Lai, biệt thự Pleiku, shophouse Gia Lai, đô thị thông minh, AI Gia Lai, bất động sản cao cấp"
    };

    switch (type) {
      case 'home':
        return {
          ...baseData,
          "description": "Plevia City - Khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo tại Gia Lai. Dự án bất động sản cao cấp với căn hộ, biệt thự, shophouse thông minh.",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Sản phẩm đô thị thông minh Plevia City",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Căn hộ thông minh Plevia City" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Biệt thự thông minh Plevia City" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Shophouse thông minh Plevia City" } }
            ]
          }
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
      default:
        return baseData;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  );
} 