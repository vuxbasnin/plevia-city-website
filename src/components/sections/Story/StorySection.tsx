import React, { useState, useEffect } from 'react';
import ImageLeftDesRight from '@/components/ui/ImageLeft_DesRight/ImageLeft_DesRight';
import { usePathname } from 'next/navigation';
import './StorySection.css';

interface StoryItem {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string[];
  logo?: {
    mainText: string;
    subText: string;
    tagline: string;
  };
}

interface StorySectionProps {
  mainTitle: string;
  stories: StoryItem[];
  scrollInterval?: number;
}

const StorySection: React.FC<StorySectionProps> = ({
  mainTitle,
  stories,
  scrollInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathname = usePathname();
  const isStorylinePage = pathname === '/storyline';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [scrollInterval, stories.length]);

  return (
    <div className="story-section-container">
      {/* Main Title */}
      <div className="story-section-title">
        <h2>{mainTitle}</h2>
      </div>

      {/* Story Content */}
      <div className="story-section-content">
        <div className="story-section-wrapper">
          <div 
            className="story-section-slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {stories.map((story) => (
              <div key={story.id} className="story-section-slide">
                <ImageLeftDesRight
                  title={isStorylinePage ? "" : story.title}
                  imageSrc={story.imageSrc}
                  imageAlt={story.imageAlt}
                  description={story.description}
                  logo={story.logo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
