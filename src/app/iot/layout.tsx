import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "Công nghệ vận hành AI",
    "Tầm nhìn về một khu đô thị toàn diện - nơi AI không chỉ quản lý từng căn nhà mà còn kết nối toàn bộ hệ sinh thái."
  );
}

export default function IoTLayout({ children }: { children: React.ReactNode }) {
  return children;
}
