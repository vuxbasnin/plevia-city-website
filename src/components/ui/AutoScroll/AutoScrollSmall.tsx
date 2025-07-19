import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './AutoScrollSmall.css';

interface Project {
  id: string;
  title: string;
  imageUrl: string;
  alt: string;
}

interface AutoScrollSmallProps {
  mainTitle: string;
  projects: Project[];
  scrollInterval?: number;
}

const AutoScrollSmall: React.FC<AutoScrollSmallProps> = ({
  mainTitle,
  projects,
  scrollInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [scrollInterval]);

  return (
    <div className="auto-scroll-container">
      {/* Main Title */}
      <div className="auto-scroll-title">
        <h2>{mainTitle}</h2>
      </div>

      {/* Auto Scroll Container */}
      <div className="auto-scroll-wrapper">
        <div className="auto-scroll-slider"
             style={{ transform: `translateX(-${currentIndex * 33.333333}%)` }}>
          {/* Lặp vô hạn các items */}
          {Array.from({ length: 100 }, (_, groupIndex) => 
            projects.map((project, projectIndex) => (
              <div key={`${groupIndex}-${project.id}`} className="auto-scroll-slide">
                <div className="auto-scroll-slide-content">
                  {/* Image Container */}
                  <div className="auto-scroll-image-container">
                    <div className="auto-scroll-image-wrapper">
                      <Image
                        src={project.imageUrl}
                        alt={project.alt}
                        fill
                        className="auto-scroll-image"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                  
                  {/* Project Title */}
                  <div className="auto-scroll-project-title">
                    <h3>{project.title}</h3>
                  </div>
                </div>
              </div>
            ))
          ).flat()}
        </div>
      </div>
    </div>
  );
};

export default AutoScrollSmall;
