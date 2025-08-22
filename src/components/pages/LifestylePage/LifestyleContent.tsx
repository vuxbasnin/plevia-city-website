"use client";

import { 
  sectionModernStandard, 
  sectionCommunity, 
  modernLiving, 
  sectionSmartExperience, 
  sectionCommunityConnect 
} from "@/data/lifestyle";
import TitleLifestyle from "@/components/sections/TitleLifestyle";
import ContentLifestyle from "@/components/sections/ContentLifestyle/ContentLifestyle";
import ParaImageVerticalLifestyle from "@/components/sections/ParaImageVerticalLifestyle";
import ParaLeftLibImage from "@/components/sections/ParaLeftLibImage";
import ParaManyImage from "@/components/sections/ParaManyImage/ParaManyImage";
import TableLeftImageRight from "@/components/sections/TableLeftImageRight/TableLeftImageRight";
import TabProject from "@/components/sections/TabProject/TabProject";
import TabProjectBgBlue from "@/components/sections/TabProjectBgBlue/TabProjectBgBlue";
import LibImageFurnitureLifestyle from "@/components/sections/LibImageFurnitureLifestyle";
import ClientImageBannerLifestyle from "@/components/shared/ClientImageBannerLifestyle";
import ScrollReveal from "@/components/shared/ScrollReveal";
import "@/components/sections/TitleLifestyle/TitleLifestyle.css";

export default function LifestyleContent() {
  return (
    <div className="lifestyle-content">
      <ScrollReveal>
        <ClientImageBannerLifestyle />
      </ScrollReveal>
      
      {/* Section Modern Standard */}
      <TitleLifestyle title={sectionModernStandard.title} />
      <ParaImageVerticalLifestyle
        title={sectionModernStandard.title}
        description={sectionModernStandard.description}
        imageUrl={sectionModernStandard.images[0]?.url || ''}
      />
      <ContentLifestyle
        description={sectionModernStandard.sections.map(s => s.subdescription)}
        dotEnabled={false}
      />

      {/* Section Community */}
      <ParaImageVerticalLifestyle
        title={sectionCommunity.title}
        description={sectionCommunity.description}
        imageUrl={sectionCommunity.images[0]?.url || ''}
      />
      <ContentLifestyle
        description={sectionCommunity.sections.map(s => s.subdescription)}
        dotEnabled={false}
        isReverse={sectionCommunity.reverse}
      />

      {/* Modern Living */}
      <ParaLeftLibImage
        title={modernLiving.title}
        description={modernLiving.description}
        images={[{ id: '0', url: modernLiving.imageUrl, caption: '' }]}
      />

      {/* Section Smart Experience */}
      <ParaImageVerticalLifestyle
        title={sectionSmartExperience.title}
        description={sectionSmartExperience.description}
        imageUrl={sectionSmartExperience.images[0]?.url || ''}
      />
      <ContentLifestyle
        description=""
        bullets={sectionSmartExperience.bullets}
        dotEnabled={sectionSmartExperience.dotEnabled}
        isReverse={sectionSmartExperience.reverse}
      />

      {/* Section Community Connect */}
      <ParaManyImage
        title={sectionCommunityConnect.title}
        paragraph={sectionCommunityConnect.description}
        images={sectionCommunityConnect.images.map(img => img.url)}
      />
      <ContentLifestyle
        description={sectionCommunityConnect.description}
        bullets={sectionCommunityConnect.bullets}
        sections={sectionCommunityConnect.sections}
        dotEnabled={false}
      />
    </div>
  );
}
