"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function AdminRootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/admin/overview"); // Changed to overview
      } else {
        router.replace("/admin/login");
      }
    }
  }, [user, loading, router]);

  // Display a loading indicator while checking auth status and redirecting
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg text-muted-foreground">Đang kiểm tra xác thực và chuyển hướng...</p>
    </div>
  );
}