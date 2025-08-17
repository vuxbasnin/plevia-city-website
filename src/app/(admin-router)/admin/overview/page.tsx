
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { UserCircle } from "lucide-react";

function DashboardOverview() {
  const { user } = useAuth();
  return (
    <Card className="shadow-xl rounded-xl border-border">
      <CardHeader className="pt-8 pb-6 bg-primary/5 rounded-t-xl">
        <div className="flex items-center space-x-3 mb-2">
          <UserCircle className="w-10 h-10 text-primary" />
          <CardTitle className="text-3xl font-headline text-primary">Chào mừng Admin!</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-base">Đây là khu vực quản trị của WorkspaceCo.</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        {user ? (
          <div className="space-y-4">
            <p className="text-lg text-foreground">
              Bạn đã đăng nhập với email: <span className="font-semibold text-primary">{user.email}</span>
            </p>
            <p className="text-muted-foreground">
              UID của bạn: <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{user.uid}</span>
            </p>
            <p className="mt-6 text-foreground">
              Chọn một mục từ thanh bên để bắt đầu quản lý nội dung trang.
            </p>
          </div>
        ) : (
          <p className="text-lg text-muted-foreground">Đang tải thông tin người dùng...</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminOverviewPage() {
  return <DashboardOverview />;
}
