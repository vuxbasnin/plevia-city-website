import React from 'react';
import ParaLeftDesRight from '../ParaLeftDesRight/ParaLeftDesRight';
import './SectionOneHome.css';

// Interface cho props
interface SectionData {
    level: number;
    subtitle: string;
    subdescription: string;
}

interface ParaLeftDesRightData {
    title: string;
    description: string;
    sections: SectionData[];
    imageUrl: string;
    reverse?: boolean;
    dotEnabled?: boolean;
}

interface SectionOneHomeProps {
    mainTitle: string;
    subtitle: string;
    contentSections: ParaLeftDesRightData[];
    isStoryLine?: boolean;
}

const SectionOneHome: React.FC<SectionOneHomeProps> = ({ 
    mainTitle, 
    subtitle, 
    contentSections,
    isStoryLine = false
}) => {
    return (
        <section className={isStoryLine ? "section-one-home-no-bg" : "section-one-home"}>
            <div className="container">
                <h1 className="section-title">{mainTitle}</h1>
                <h1 className="section-title">{subtitle}</h1>

                <div className="content-wrapper">
                    {contentSections.map((section, index) => (
                        <ParaLeftDesRight
                            key={index}
                            title={section.title}
                            description={section.description}
                            sections={section.sections}
                            imageUrl={section.imageUrl}
                            reverse={section.reverse}
                            dotEnabled={false}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionOneHome;
