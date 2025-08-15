import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import IoTPage from "./IoT";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Plevia City - Công nghệ vận hành AI";
  const description =
    "Tầm nhìn về một khu đô thị toàn diện - nơi AI không chỉ quản lý từng căn nhà mà còn kết nối toàn bộ hệ sinh thái.";
  return {
    title,
    description,
    alternates: { canonical: "/iot" },
    openGraph: {
      title,
      description,
      url: "/iot",
      type: "website",
      images: [
        {
          url: "/assets/home/plevia_city.jpg",
          width: 1200,
          height: 630,
          alt: "Plevia City - Công nghệ vận hành AI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/assets/home/plevia_city.jpg",
          alt: "Plevia City - Công nghệ vận hành AI",
        },
      ],
    },
  };
}

export default function IoTPageComponent() {
  return (
    <PageLayout>
      <IoTPage />
    </PageLayout>
  );
}
