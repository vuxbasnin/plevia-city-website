import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleTabClick = (idx: number) => {
        setActiveIndex(idx);
    };

    const handleExploreClick = () => {
        router.push('/lifestyle');
    };

    // Swipe handlers for mobile with infinite scroll
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!isMobile) return;
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setCurrentX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isMobile || !isDragging) return;
        setCurrentX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!isMobile || !isDragging) return;
        setIsDragging(false);
        
        const diff = startX - currentX;
        const threshold = 50; // Minimum swipe distance
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next tab (infinite)
                setActiveIndex((prevIndex) => (prevIndex + 1) % tabs.length);
            } else {
                // Swipe right - previous tab (infinite)
                setActiveIndex((prevIndex) => (prevIndex - 1 + tabs.length) % tabs.length);
            }
        }
    };

    // Mobile responsive styles - chỉ áp dụng khi isMobile = true
    const mobileStyles = isMobile ? {
        container: {
            width: '100%',
            margin: 0,
            padding: '24px 0',
            boxSizing: 'border-box' as const,
            textAlign: 'center' as const,
            overflow: 'hidden' as const,
        },
        contentRow: {
            flexDirection: 'column' as const,
            gap: '20px',
            width: '100%',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box' as const,
            overflow: 'hidden' as const,
            alignItems: 'center' as const,
        },
        slider: {
            transform: `translateX(-${activeIndex * 100}%)`,
            display: 'flex',
            transition: isDragging ? 'none' : 'transform 0.3s ease',
        },
        slide: {
            width: '100%',
            flexShrink: 0,
            flexDirection: 'column' as const,
            alignItems: 'center' as const,
        },
        contentText: {
            width: '100%',
            maxWidth: '100%',
            padding: '0 8px',
            margin: 0,
            boxSizing: 'border-box' as const,
            flex: 'none' as const,
            order: 1,
            textAlign: 'justify' as const,
        },
        contentImage: {
            width: '100%',
            maxWidth: '100%',
            padding: 0,
            margin: '32px 0 0 0',
            boxSizing: 'border-box' as const,
            flex: 'none' as const,
            order: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            aspectRatio: '16/9',
        },
        image: {
            width: '100%',
            maxWidth: '100%',
            borderRadius: '8px',
            display: 'block',
        }
    } : {};

    return (
        <div className="tabnew-container" style={isMobile ? mobileStyles.container : undefined}>
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
            <div className="tabnew-content-row tabnew-slider-wrapper" 
                style={isMobile ? mobileStyles.contentRow : undefined}
            >
                <div
                    ref={sliderRef}
                    className="tabnew-slider"
                    style={isMobile ? mobileStyles.slider : { transform: `translateX(-${activeIndex * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {tabs.map((tab, idx) => (
                        <div className="tabnew-slide" key={tab.id} style={isMobile ? mobileStyles.slide : undefined}>
                            {reverse ? (
                                <>
                                    <div className="tabnew-content-image" style={isMobile ? mobileStyles.contentImage : undefined}>
                                        <img src={tab.image} alt={tab.title} style={isMobile ? mobileStyles.image : undefined} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }} />
                                    </div>
                                    <div className="tabnew-content-text" style={isMobile ? mobileStyles.contentText : undefined}>
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
                                            <button className="tabnew-explore-btn" onClick={handleExploreClick}>
                                                Khám phá ngay <span className="arrow-icon">→</span>
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="tabnew-content-text" style={isMobile ? mobileStyles.contentText : undefined}>
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
                                            <button className="tabnew-explore-btn" onClick={handleExploreClick}>
                                                Khám phá ngay <span className="arrow-icon">→</span>
                                            </button>
                                        )}
                                    </div>
                                    <div className="tabnew-content-image" style={isMobile ? mobileStyles.contentImage : undefined}>
                                        <img src={tab.image} alt={tab.title} style={isMobile ? mobileStyles.image : undefined} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }} />
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
