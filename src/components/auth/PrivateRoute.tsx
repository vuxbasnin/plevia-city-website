
"use client";

import { type ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // If no user and not on login page, redirect to login
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      } else {
        // If user exists and on login page, redirect to overview
        if (pathname === "/admin/login") {
          router.push("/admin/overview"); // Corrected redirect path
        }
      }
    }
  }, [user, loading, router, pathname]);

  if (loading || (!user && pathname !== "/admin/login")) {
    // Show loading if:
    // 1. Auth state is still loading.
    // 2. Not loading, no user, AND current page is NOT the login page (implies redirect is pending).
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Render children if:
  // 1. User is authenticated (and not on login page, due to useEffect redirect).
  // 2. Not loading, no user, AND current page IS the login page.
  return <>{children}</>;
}
