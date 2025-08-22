import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata(
    "Công nghệ vận hành AI",
    "Tầm nhìn về một khu đô thị toàn diện - nơi AI không chỉ quản lý từng căn nhà mà còn kết nối toàn bộ hệ sinh thái.",
    "https://pleviacity.vn/iot",
  );
}

export default function IoTLayout({ children }: { children: React.ReactNode }) {
  return children;
}
