'use client';

import React, { useState } from 'react';
import './Tab.css';

interface TabData {
  id: string;
  title: string;
  description: string;
  image: string;
  content: {
    heading: string;
    paragraphs: string[];
    bulletPoints: string[];
  };
}

interface TabProps {
  title: string;
  tabs: TabData[];
  className?: string;
}

const Tab: React.FC<TabProps> = ({ title, tabs, className = '' }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const getTransformValue = (index: number) => {
    return `translateX(-${index * 100}%)`;
  };



  const currentTab = tabs[activeTab];

  return (
    <div className={`tab-container ${className}`}>
      {/* Main Title */}
      <div className="tab-title-section">
        <h2 className="tab-main-title">{title}</h2>
        <div className="tab-divider">
          <div className="tab-divider-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                fill="#4ade80"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-nav-item ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {lineIndex > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="tab-content-area">
        <div 
          className="tab-content-wrapper"
          style={{ transform: getTransformValue(activeTab) }}
        >
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className="tab-content-slide"
            >
              <div className="tab-content">
                <div className="tab-content-left">
                  <h3 className="tab-content-heading">{tab.content.heading}</h3>
                  
                  {tab.content.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="tab-content-paragraph">
                      {paragraph}
                    </p>
                  ))}

                  {tab.content.bulletPoints.length > 0 && (
                    <ul className="tab-content-bullet-list">
                      {tab.content.bulletPoints.map((point, pIndex) => (
                        <li key={pIndex} className="tab-content-bullet-item">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="tab-content-right">
                  <img
                    src={tab.image}
                    alt={tab.title}
                    className="tab-content-image"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="tab-decorative-flower">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 20C70 20 80 25 85 35C90 45 85 55 75 60C85 65 90 75 85 85C80 95 70 100 60 100C50 100 40 95 35 85C30 75 35 65 45 60C35 55 30 45 35 35C40 25 50 20 60 20Z"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="tab-decorative-palm">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path
            d="M40 10C45 10 50 15 55 25C60 35 55 45 45 50C55 55 60 65 55 75C50 85 45 90 40 90C35 90 30 85 25 75C20 65 25 55 35 50C25 45 20 35 25 25C30 15 35 10 40 10Z"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

export default Tab;
