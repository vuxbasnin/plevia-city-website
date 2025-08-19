import React from 'react';
import ParaLeftDesRight from '../ParaLeftDesRight/ParaLeftDesRight';
import './SectionOneHome.css';
import Title from '@/components/ui/Title/Title';

// Interface cho props
interface SectionData {
    level: 1 | 2;
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
    sectionType?: string;
    isShowTitle?: boolean;
}

const SectionOneHome: React.FC<SectionOneHomeProps> = ({
    mainTitle,
    subtitle,
    contentSections,
    isStoryLine = false,
    sectionType = "",
    isShowTitle = false
}) => {
    const sectionClass = isStoryLine
        ? `section-one-home-no-bg ${sectionType}`
        : "section-one-home";

    return (
        <section className={sectionClass}>
            <div className="container">
                {isShowTitle && (
                    <div className="map-extension-header" style={{ marginTop: 24, marginBottom: -24 }}>
                        <Title variant="large" align="center">
                            Plevia City
                        </Title>
                    </div>
                )}
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
