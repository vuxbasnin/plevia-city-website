
"use client";

import { useState, type ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LayoutDashboard, Settings, MailCheck, CalendarClock, FileText, Home, Settings2, Newspaper, Package, ImageIcon, Sofa, Sparkles, Users, Send, Palette, Layers, UserCog, FileText as FileTextIcon, Plus, Edit } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";

interface NavItemConfig {
  id: string; // Unique ID, can be used for matching pathname segments
  label: string;
  icon: React.ElementType;
  href?: string; // For leaf nodes
  children?: NavItemConfig[];
  isLeaf?: boolean;
}

const navItemsConfiguration: NavItemConfig[] = [
  { id: "overview", label: "Tổng Quan", icon: LayoutDashboard, href: "/admin/overview", isLeaf: true },
  {
    id: "group-general-settings",
    label: "Cài Đặt & Dữ Liệu",
    icon: Settings2,
    isLeaf: false,
    children: [
      { id: "site-settings", label: "Cài Đặt Website", icon: Settings, href: "/admin/settings/site", isLeaf: true },
      { id: "account-settings", label: "Tài Khoản Admin", icon: UserCog, href: "/admin/settings/account", isLeaf: true },
      { id: "trial-signups", label: "Đăng Ký Dùng Thử", icon: MailCheck, href: "/admin/data/trial-signups", isLeaf: true },
      // { id: "tour-bookings", label: "Lịch Tham Quan", icon: CalendarClock, href: "/admin/data/tour-bookings", isLeaf: true }, // Ẩn mục này
    ],
  },
  {
    id: "group-news-management",
    label: "Quản Lý Tin Tức",
    icon: FileTextIcon,
    isLeaf: false,
    children: [
      { id: "news-list", label: "Danh Sách Tin Tức", icon: FileText, href: "/admin/news", isLeaf: true },
      { id: "news-create", label: "Tạo Tin Tức Mới", icon: Plus, href: "/admin/news/create", isLeaf: true },
    ],
  },
  {
    id: "group-gallery-management",
    label: "Quản Lý Thư Viện Ảnh",
    icon: ImageIcon,
    isLeaf: false,
    children: [
      { id: "gallery-list", label: "Danh Sách Ảnh", icon: ImageIcon, href: "/admin/gallery", isLeaf: true },
      // Nếu muốn tách trang upload riêng:
      // { id: "gallery-upload", label: "Upload Ảnh Mới", icon: Plus, href: "/admin/gallery/upload", isLeaf: true },
    ],
  },
  // {
  //   id: "group-shared-content",
  //   label: "Nội Dung Chung",
  //   icon: Layers,
  //   isLeaf: false,
  //   children: [
  //       { id: "shared-benefits", label: "Danh Sách Quyền Lợi", icon: Package, href: "/admin/content/common/benefits", isLeaf: true },
  //   ]
  // },
  {
    id: "group-homepage-content",
    label: "Quản Lý Trang Chủ",
    icon: Home,
    isLeaf: false,
    children: [
      { id: "homepage-hero", label: "Banner Giới Thiệu", icon: ImageIcon, href: "/admin/content/homepage/hero", isLeaf: true },
      // { id: "homepage-seating", label: "Vị Trí Ngồi", icon: Sofa, href: "/admin/content/homepage/seating", isLeaf: true }, // Ẩn mục này
      // { id: "homepage-amenities", label: "Dịch Vụ & Tiện Ích", icon: Sparkles, href: "/admin/content/homepage/amenities", isLeaf: true }, // Ẩn mục này
      // { id: "homepage-culture", label: "Văn Hóa Cộng Đồng", icon: Users, href: "/admin/content/homepage/culture", isLeaf: true }, // Ẩn mục này
      { id: "homepage-finalCta", label: "CTA Cuối Trang", icon: Send, href: "/admin/content/homepage/final-cta", isLeaf: true },
    ],
  },
  // {
  //   id: "group-member-benefits-page-settings",
  //   label: "Cài Đặt Trang Quyền Lợi",
  //   icon: Newspaper,
  //   isLeaf: false,
  //   children: [
  //     { id: "member-benefits-page-static-content", label: "Nội Dung Tĩnh", icon: FileText, href: "/admin/content/member-benefits-page/static", isLeaf: true },
  //   ],
  // },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout, loading: authLoading } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    // Router will redirect via AuthContext or PrivateRoute
  };

  const renderNavItems = (items: NavItemConfig[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        // Sort children so that "Tài Khoản Admin" comes after "Cài Đặt Website" if they are in the same group
        const sortedChildren = [...item.children].sort((a, b) => {
            if (a.id === "site-settings" && b.id === "account-settings") return -1;
            if (a.id === "account-settings" && b.id === "site-settings") return 1;
            return 0;
        });
        return (
          <SidebarGroup key={item.id}>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
              <item.icon />
              <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sortedChildren.map((child) => (
                  child.isLeaf && child.href ? (
                    <SidebarMenuItem key={child.id}>
                       <SidebarMenuButton
                          asChild
                          isActive={pathname === child.href || pathname.startsWith(child.href + '/')}
                          tooltip={{ children: child.label, side: "right" }}
                          className="group-data-[collapsible=icon]:justify-center"
                        >
                          <Link href={child.href}>
                            <child.icon />
                            <span className="group-data-[collapsible=icon]:hidden">{child.label}</span>
                          </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : null
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      }
      if (item.isLeaf && item.href) {
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
              tooltip={{ children: item.label, side: "right" }}
              className="group-data-[collapsible=icon]:justify-center"
            >
              <Link href={item.href}>
                <item.icon />
                <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      }
      return null;
    });
  };

  if (pathname === "/admin/login") {
    // For the login page, we don't want the admin sidebar layout.
    // PrivateRoute will still handle redirecting if user is already logged in.
    return <PrivateRoute>{children}</PrivateRoute>;
  }

  return (
    <PrivateRoute>
      <SidebarProvider defaultOpen={true}>
        <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r">
          <SidebarHeader className="p-4 flex items-center justify-between">
            <Link href="/admin/overview" passHref>
              <span className="flex items-center space-x-2 text-xl font-headline font-bold text-primary hover:opacity-80 transition-opacity">
                <Palette className="w-7 h-7" />
                <span className="group-data-[collapsible=icon]:hidden">CMS Admin</span>
              </span>
            </Link>
            <SidebarTrigger className="md:hidden group-data-[collapsible=icon]:hidden" />
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {renderNavItems(navItemsConfiguration)}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 mt-auto">
            {user && (
              <Button onClick={handleLogout} variant="outline" className="w-full group-data-[collapsible=icon]:px-2 justify-center border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive" disabled={authLoading}>
                <LogOut className="group-data-[collapsible=icon]:mr-0 mr-2 h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">{authLoading ? "Đang thoát..." : "Đăng Xuất"}</span>
              </Button>
            )}
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-secondary/20">
          <header className="bg-card shadow-sm border-b border-border sticky top-0 z-30 md:hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
               <Link href="/admin/overview" passHref>
                <span className="flex items-center space-x-2 text-lg font-headline font-bold text-primary hover:opacity-80 transition-opacity">
                    <Palette className="w-6 h-6" />
                    <span>Admin Panel AB</span>
                </span>
              </Link>
              <SidebarTrigger />
            </div>
          </header>
          <main className="flex-grow p-4 sm:p-6 lg:p-8">
            {children}
          </main>
          <footer className="bg-card border-t border-border py-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Plevia City Admin Panel.
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </PrivateRoute>
  );
}
