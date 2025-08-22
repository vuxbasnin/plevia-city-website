"use client";

import SectionOneStoryLine from "@/components/sections/SectionOneHome/SectionOneStoryLine";
import SectionTwoStoryLine from "@/components/sections/SectionOneHome/SectionTwoStoryLine";
import SectionThreeStoryLine from "@/components/sections/SectionOneHome/SectionThreeStoryLine";
import SectionFourStoryLine from "@/components/sections/SectionOneHome/SectionFourStoryLine";
import SectionFiveStoryLine from "@/components/sections/SectionOneHome/SectionFiveStoryLine";
import ClientImageBannerStoryline from "@/components/shared/ClientImageBannerStoryline";
import ScrollReveal from "@/components/shared/ScrollReveal";
import "./StorylinePage.module.css";

export default function StorylineContent() {
  return (
    <div className="storyline-content">
      <ScrollReveal>
        <ClientImageBannerStoryline />
      </ScrollReveal>
      <SectionOneStoryLine />
      <SectionTwoStoryLine />
      <SectionThreeStoryLine />
      <SectionFourStoryLine />
      <SectionFiveStoryLine />
    </div>
  );
}
