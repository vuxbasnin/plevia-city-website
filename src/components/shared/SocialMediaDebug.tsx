"use client";

import React, { useState, useEffect } from 'react';

interface MetaTagInfo {
  name: string;
  content: string;
  property?: string;
}

export default function SocialMediaDebug() {
  const [metaTags, setMetaTags] = useState<MetaTagInfo[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [seoScore, setSeoScore] = useState(0);

  useEffect(() => {
    const tags = document.querySelectorAll('meta');
    const relevantTags: MetaTagInfo[] = [];

    tags.forEach((tag) => {
      const name = tag.getAttribute('name') || tag.getAttribute('property') || '';
      const content = tag.getAttribute('content') || '';
      
      // Chỉ lấy các meta tags liên quan đến SEO và social media
      if (name.includes('og:') || name.includes('twitter:') || name.includes('fb:') || 
          name === 'description' || name === 'title' || name === 'author' || 
          name === 'keywords' || name === 'robots') {
        relevantTags.push({
          name,
          content,
          property: tag.getAttribute('property') || undefined
        });
      }
    });

    setMetaTags(relevantTags);
    
    // Tính SEO score
    let score = 0;
    const hasTitle = relevantTags.some(tag => tag.name === 'title' || tag.property === 'og:title');
    const hasDescription = relevantTags.some(tag => tag.name === 'description' || tag.property === 'og:description');
    const hasKeywords = relevantTags.some(tag => tag.name === 'keywords');
    const hasOgImage = relevantTags.some(tag => tag.property === 'og:image');
    const hasTwitterCard = relevantTags.some(tag => tag.name === 'twitter:card');
    
    if (hasTitle) score += 20;
    if (hasDescription) score += 20;
    if (hasKeywords) score += 15;
    if (hasOgImage) score += 15;
    if (hasTwitterCard) score += 15;
    if (relevantTags.length >= 10) score += 15;
    
    setSeoScore(score);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 hover:bg-blue-600 transition-colors"
      >
        🔍 SEO Debug ({seoScore}/100)
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-w-md max-h-96 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">SEO & Social Media Debug</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">SEO Score:</span>
            <span className={`text-lg font-bold ${seoScore >= 80 ? 'text-green-600' : seoScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {seoScore}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${seoScore >= 80 ? 'bg-green-500' : seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${seoScore}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          {metaTags.map((tag, index) => (
            <div key={index} className="border border-gray-200 rounded p-2">
              <div className="text-xs font-medium text-gray-600">
                {tag.property ? `property="${tag.property}"` : `name="${tag.name}"`}
              </div>
              <div className="text-sm text-gray-800 mt-1 break-words">
                {tag.content.length > 100 ? `${tag.content.substring(0, 100)}...` : tag.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>✅ Title: {metaTags.some(tag => tag.name === 'title' || tag.property === 'og:title') ? 'Found' : 'Missing'}</p>
          <p>✅ Description: {metaTags.some(tag => tag.name === 'description' || tag.property === 'og:description') ? 'Found' : 'Missing'}</p>
          <p>✅ Keywords: {metaTags.some(tag => tag.name === 'keywords') ? 'Found' : 'Missing'}</p>
          <p>✅ OG Image: {metaTags.some(tag => tag.property === 'og:image') ? 'Found' : 'Missing'}</p>
          <p>✅ Twitter Card: {metaTags.some(tag => tag.name === 'twitter:card') ? 'Found' : 'Missing'}</p>
        </div>
      </div>
    </div>
  );
} 