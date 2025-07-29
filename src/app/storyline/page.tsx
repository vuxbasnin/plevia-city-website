"use client";

import PageLayout from "@/components/layout/PageLayout";
import ImageHeader from "@/components/sections/ImageHeader";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ParaLeftDesRight from "@/components/sections/ParaLeftDesRight/ParaLeftDesRight";
import "./page.css"
import SectionOneStoryLine from "@/components/sections/SectionOneHome/SectionOneStoryLine";
import SectionTwoStoryLine from "@/components/sections/SectionOneHome/SectionTwoStoryLine";
import SectionThreeStoryLine from "@/components/sections/SectionOneHome/SectionThreeStoryLine";
import SectionFourStoryLine from "@/components/sections/SectionOneHome/SectionFourStoryLine";
import SectionFiveStoryLine from "@/components/sections/SectionOneHome/SectionFiveStoryLine";
import FormInfo from "@/components/sections/FormInfo/FormInfo";

export default function ProjectPage() {
  return (
    <PageLayout>
      <div className="fullWidth">
        <ScrollReveal>
          <ImageHeader
          imageUrl="/assets/storyline/banner_storyline.jpg"/>
        </ScrollReveal>
      </div>

      <div className={"wrapper"}>
        <div className={"content"}>
          <ScrollReveal>
            <SectionOneStoryLine />
          </ScrollReveal>
          <ScrollReveal>
            <SectionTwoStoryLine />
          </ScrollReveal>
          <ScrollReveal>
            <SectionThreeStoryLine />
          </ScrollReveal>
          <ScrollReveal>
            <SectionFourStoryLine />
          </ScrollReveal>
          <ScrollReveal>
            <SectionFiveStoryLine />
          </ScrollReveal>
          <ScrollReveal>
            <FormInfo />
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
