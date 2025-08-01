"use client";

interface StructuredDataProps {
  type: 'home';
}

export default function StructuredData({ type }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'home':
        return {
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Plevia City",
          "description": "Dự án bất động sản cao cấp tại Gia Lai với vị trí đắc địa, thiết kế hiện đại và tiện ích đẳng cấp",
                                "url": "https://pleviacity.vn",
                      "logo": "https://pleviacity.vn/Logo_green_3.png",
                      "image": "https://pleviacity.vn/Logo_green_3.png",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Pleiku",
            "addressRegion": "Gia Lai",
            "addressCountry": "VN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "13.9833",
            "longitude": "108.0000"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "Vietnamese"
          },
          "areaServed": {
            "@type": "City",
            "name": "Pleiku"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Sản phẩm bất động sản",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Căn hộ cao cấp"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Product",
                  "name": "Biệt thự đơn lập"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product", 
                  "name": "Shophouse"
                }
              }
            ]
          },
          "sameAs": [
            "https://facebook.com/pleviacity",
            "https://instagram.com/pleviacity"
          ]
        };
      
      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
} 