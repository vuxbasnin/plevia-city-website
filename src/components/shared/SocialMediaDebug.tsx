'use client';

import { useEffect, useState } from 'react';

interface MetaTagInfo {
  name: string;
  content: string;
  property?: string;
}

export default function SocialMediaDebug() {
  const [metaTags, setMetaTags] = useState<MetaTagInfo[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const tags = document.querySelectorAll('meta');
    const relevantTags: MetaTagInfo[] = [];

    tags.forEach((tag) => {
      const name = tag.getAttribute('name') || tag.getAttribute('property') || '';
      const content = tag.getAttribute('content') || '';
      
      // Chỉ lấy các meta tags liên quan đến social media
      if (name.includes('og:') || name.includes('twitter:') || name.includes('fb:') || 
          name === 'description' || name === 'title' || name === 'author') {
        relevantTags.push({
          name,
          content,
          property: tag.getAttribute('property') || undefined
        });
      }
    });

    setMetaTags(relevantTags);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      >
        Debug Social Media
      </button>
    );
  }

  return (
    <div className="fixed inset-4 bg-white border-2 border-blue-500 rounded-lg shadow-xl z-50 overflow-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Social Media Debug Info</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-blue-600">Open Graph Tags</h3>
            {metaTags
              .filter(tag => tag.name.startsWith('og:'))
              .map((tag, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                  <div className="font-mono text-sm text-gray-600">{tag.name}</div>
                  <div className="text-sm break-all">{tag.content}</div>
                </div>
              ))}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-green-600">Twitter Card Tags</h3>
            {metaTags
              .filter(tag => tag.name.startsWith('twitter:'))
              .map((tag, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                  <div className="font-mono text-sm text-gray-600">{tag.name}</div>
                  <div className="text-sm break-all">{tag.content}</div>
                </div>
              ))}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-purple-600">Basic Meta Tags</h3>
            {metaTags
              .filter(tag => !tag.name.startsWith('og:') && !tag.name.startsWith('twitter:'))
              .map((tag, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                  <div className="font-mono text-sm text-gray-600">{tag.name}</div>
                  <div className="text-sm break-all">{tag.content}</div>
                </div>
              ))}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-orange-600">Testing Tools</h3>
            <div className="space-y-2">
              <a
                href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent('https://pleviacity.vn')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                Facebook Debugger
              </a>
              <a
                href={`https://cards-dev.twitter.com/validator?url=${encodeURIComponent('https://pleviacity.vn')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                Twitter Card Validator
              </a>
              <a
                href={`https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent('https://pleviacity.vn')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                LinkedIn Post Inspector
              </a>
              <a
                href={`https://search.google.com/test/rich-results?url=${encodeURIComponent('https://pleviacity.vn')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                Google Rich Results Test
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h4 className="font-semibold text-yellow-800 mb-2">Lưu ý quan trọng:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Social media platforms có thể cache preview trong vài giờ đến vài ngày</li>
            <li>• Sử dụng các công cụ debug ở trên để force refresh cache</li>
            <li>• Đảm bảo image có kích thước 1200x630px cho hiển thị tốt nhất</li>
            <li>• URL phải là absolute URL (bắt đầu bằng https://)</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 