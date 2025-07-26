import React, { useState } from 'react';
import './TabNew.css';

interface TabContent {
    heading: string;
    paragraphs: string[];
    bulletPoints: string[];
}

interface TabData {
    id: string;
    title: string;
    description: string;
    image: string;
    content: TabContent;
}

interface TabNewProps {
    title: string;
    tabs: TabData[];
    reverse?: boolean; // thêm biến reverse
}

const TabNew: React.FC<TabNewProps> = ({ title, tabs, reverse = false }) => {
    const [activeIndex, setActiveIndex] = useState(0);


    const handleTabClick = (idx: number) => {
        setActiveIndex(idx);
    };

    return (
        <div className="tabnew-container">
            <h2 className="tabnew-title">{title}</h2>
            <div className="tabnew-tabs-row">
                {tabs.map((tab, idx) => (
                    <div
                        key={tab.id}
                        className={`tabnew-tab${idx === activeIndex ? ' active' : ''}`}
                        onClick={() => handleTabClick(idx)}
                    >
                        <div className="tabnew-tab-title">{tab.title}</div>
                    </div>
                ))}
            </div>
            <div className="tabnew-content-row tabnew-slider-wrapper">
                <div
                    className="tabnew-slider"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {tabs.map((tab, idx) => (
                        <div className="tabnew-slide" key={tab.id}>
                            {reverse ? (
                                <>
                                    <div className="tabnew-content-image">
                                        <img src={tab.image} alt={tab.title} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }} />
                                    </div>
                                    <div className="tabnew-content-text">
                                        <h3 className="tabnew-content-heading">{tab.content.heading}</h3>
                                        {tab.content.paragraphs.map((p, i) => (
                                            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                                        ))}
                                        {tab.content.bulletPoints.length > 0 && (
                                            <ul>
                                                {tab.content.bulletPoints.map((bp, i) => (
                                                    <li key={i}>{bp}</li>
                                                ))}
                                            </ul>
                                        )}
                                        {/* Thêm button Khám phá ngay nếu activeIndex là 0, 1, 2 */}
                                        {activeIndex >= 0 && activeIndex <= 2 && idx === activeIndex && (
                                            <button className="tabnew-explore-btn">
                                                Khám phá ngay <span className="arrow-icon">→</span>
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="tabnew-content-text">
                                        <h3 className="tabnew-content-heading">{tab.content.heading}</h3>
                                        {tab.content.paragraphs.map((p, i) => (
                                            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                                        ))}
                                        {tab.content.bulletPoints.length > 0 && (
                                            <ul>
                                                {tab.content.bulletPoints.map((bp, i) => (
                                                    <li key={i}>{bp}</li>
                                                ))}
                                            </ul>
                                        )}
                                        {/* Thêm button Khám phá ngay nếu activeIndex là 0, 1, 2 */}
                                        {activeIndex >= 0 && activeIndex <= 2 && idx === activeIndex && (
                                            <button className="tabnew-explore-btn">
                                                Khám phá ngay <span className="arrow-icon">→</span>
                                            </button>
                                        )}
                                    </div>
                                    <div className="tabnew-content-image">
                                        <img src={tab.image} alt={tab.title} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }} />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabNew;
