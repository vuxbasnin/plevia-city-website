
"use client";

import { useState, useEffect } from "react"; // Added useEffect here
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { AlertCircle, LogIn, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ."),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const { login, loading: authLoading, user } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/admin/overview"); // Corrected redirect path
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setError(null);
    try {
      await login(data);
      router.push("/admin/overview"); // Explicitly navigate after successful login, corrected path
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Email hoặc mật khẩu không đúng.");
      } else if (err.code === 'auth/invalid-api-key') {
        setError("Lỗi cấu hình Firebase. Vui lòng kiểm tra API key.");
      }
      else {
        setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
      }
      console.error("Login failed:", err);
    }
  };
  
  if (user && !authLoading) { // Ensure not to show loading if already redirecting or user is present
    // User is logged in, PrivateRoute or useEffect above should handle redirect.
    // This return is to prevent rendering the login form if user is already authenticated and redirection is in progress.
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
         <p>Đang chuyển hướng đến trang quản trị...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl">
        <CardHeader className="text-center pt-8">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
            <LogIn className="w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-headline text-foreground">Đăng Nhập Admin</CardTitle>
          <CardDescription className="text-muted-foreground">Truy cập vào trang quản trị WorkspaceCo.</CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="rounded-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
                className={errors.email ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold">Mật Khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={errors.password ? "border-destructive focus-visible:ring-destructive pr-10" : "focus-visible:ring-primary pr-10"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base rounded-md" disabled={isSubmitting || authLoading}>
              {isSubmitting || authLoading ? "Đang xử lý..." : "Đăng Nhập"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground pb-8">
          <p>Quên mật khẩu? Liên hệ quản trị viên.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
