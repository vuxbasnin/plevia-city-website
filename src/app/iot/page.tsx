"use client";

import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import ScrollReveal from '@/components/shared/ScrollReveal';
import LibImage from '@/components/sections/LibImage/LibImage';
import ParaImageVertical from '@/components/sections/ParaImageVertical/ParaImageVertical';
import ParaLeftDesRight from '@/components/sections/ParaLeftDesRight/ParaLeftDesRight';
import FormInfo from '@/components/sections/FormInfo/FormInfo';
import ParaLeftLibImage from "@/components/sections/ParaLeftLibImage";
import LibImageHome from "@/components/sections/LibImageHome/LibImageHome";
import ParaImageVerticalLifestyle from "@/components/sections/ParaImageVerticalLifestyle";
import IoTPage from './IoT';

export default function LifeStylePage() {
    return (<PageLayout>
        <IoTPage/>
    </PageLayout>);
} 