"use client";

import ImageHeader from '@/components/sections/ImageHeader';
import ScrollReveal from '@/components/shared/ScrollReveal';
import LibImageFurnitureHome from '@/components/sections/LibImageFurnitureHome/LibImageFurnitureHome';
import FormInfo from '@/components/sections/FormInfo/FormInfo';
import ParaLeftLibImage from "@/components/sections/ParaLeftLibImage";
import LibImageHome from "@/components/sections/LibImageHome/LibImageHome";
import ParaImageVerticalLifestyle from "@/components/sections/ParaImageVerticalLifestyle";
import { lifestyleBannerImage, sectionModernStandard, sectionCommunity, modernLiving, sectionSmartExperience, sectionCommunityConnect } from '@/data/lifestyle';

export default function LifestyleContent() {
    return (
        <>
            <ScrollReveal>
                <ImageHeader imageUrl={lifestyleBannerImage}/>
            </ScrollReveal>
            <ScrollReveal>
                <ParaLeftLibImage
                    title={sectionModernStandard.title}
                    description={sectionModernStandard.description}
                    sections={sectionModernStandard.sections}
                    is169={sectionModernStandard.is169}
                    images={sectionModernStandard.images}
                />
            </ScrollReveal>
            <ScrollReveal>
                <ParaLeftLibImage
                    title={sectionCommunity.title}
                    description={sectionCommunity.description}
                    sections={sectionCommunity.sections}
                    is169={sectionCommunity.is169}
                    reverse={sectionCommunity.reverse}
                    images={sectionCommunity.images}
                />
            </ScrollReveal>
            <ScrollReveal>
                <div id="house-models">
                    <LibImageHome/>
                </div>
            </ScrollReveal>
            {/* Khoảng cách giữa 2 section */}
            <div className="py-8 bg-transparent"></div>
            <ScrollReveal>
                <div id="furniture-models">
                    <LibImageFurnitureHome/>
                </div>
            </ScrollReveal>
            <ScrollReveal>
                <div id="interior-designs">
                    <ParaImageVerticalLifestyle
                        title={modernLiving.title}
                        description={modernLiving.description}
                        imageUrl={modernLiving.imageUrl}
                    >
                    </ParaImageVerticalLifestyle>
                </div>
            </ScrollReveal>
            <ScrollReveal>
                <ParaLeftLibImage
                    title={sectionSmartExperience.title}
                    description={sectionSmartExperience.description}
                    bullets={sectionSmartExperience.bullets}
                    is169={sectionSmartExperience.is169}
                    reverse={sectionSmartExperience.reverse}
                    dotEnabled={sectionSmartExperience.dotEnabled}
                    images={sectionSmartExperience.images}
                />
            </ScrollReveal>
            <ScrollReveal>
                <ParaLeftLibImage
                    title={sectionCommunityConnect.title}
                    description={sectionCommunityConnect.description}
                    sections={sectionCommunityConnect.sections}
                    bullets={sectionCommunityConnect.bullets}
                    is169={sectionCommunityConnect.is169}
                    images={sectionCommunityConnect.images}
                />
            </ScrollReveal>
            <ScrollReveal>
                <FormInfo />
            </ScrollReveal>
        </>
    );
}
