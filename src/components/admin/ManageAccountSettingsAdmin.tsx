
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Save, UserCircle, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Ensure auth is exported from your firebase config

// Schemas
const updateDisplayNameSchema = z.object({
  displayName: z.string().min(2, "Tên hiển thị phải có ít nhất 2 ký tự.").max(50, "Tên hiển thị không quá 50 ký tự."),
});
type UpdateDisplayNameFormData = z.infer<typeof updateDisplayNameSchema>;

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Mật khẩu hiện tại là bắt buộc."),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự."),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Mật khẩu mới không khớp.",
  path: ["confirmNewPassword"],
});
type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;


export default function ManageAccountSettingsAdmin() {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  const [isSavingDisplayName, setIsSavingDisplayName] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [displayNameError, setDisplayNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);


  const displayNameForm = useForm<UpdateDisplayNameFormData>({
    resolver: zodResolver(updateDisplayNameSchema),
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  const passwordForm = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Hàm cập nhật giá trị mặc định cho tên hiển thị khi user thay đổi.
  useState(() => {
    if (user?.displayName) {
      displayNameForm.setValue("displayName", user.displayName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.displayName, displayNameForm.setValue]);


  // Hàm submit form đổi tên hiển thị.
  const onDisplayNameSubmit: SubmitHandler<UpdateDisplayNameFormData> = async (data) => {
    if (!user || !auth.currentUser) {
      toast({ title: "Lỗi", description: "Không tìm thấy người dùng.", variant: "destructive" });
      return;
    }
    setIsSavingDisplayName(true);
    setDisplayNameError(null);
    try {
      await updateProfile(auth.currentUser, { displayName: data.displayName });
      toast({ title: "Thành công!", description: "Tên hiển thị đã được cập nhật.", variant: "default" });
      // Note: useAuth context might need a way to refresh user or rely on onAuthStateChanged
    } catch (error: any) {
      console.error("Error updating display name:", error);
      setDisplayNameError(error.message || "Không thể cập nhật tên hiển thị.");
      toast({ title: "Lỗi", description: error.message || "Không thể cập nhật tên hiển thị.", variant: "destructive" });
    }
    setIsSavingDisplayName(false);
  };

  // Hàm submit form đổi mật khẩu.
  const onPasswordSubmit: SubmitHandler<UpdatePasswordFormData> = async (data) => {
    if (!user || !user.email || !auth.currentUser) {
      toast({ title: "Lỗi", description: "Không tìm thấy người dùng hoặc email.", variant: "destructive" });
      return;
    }
    setIsSavingPassword(true);
    setPasswordError(null);

    try {
      const credential = EmailAuthProvider.credential(user.email, data.currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Re-authentication successful, now update password
      await updatePassword(auth.currentUser, data.newPassword);
      toast({ title: "Thành công!", description: "Mật khẩu đã được thay đổi.", variant: "default" });
      passwordForm.reset(); // Clear password fields
    } catch (error: any) {
      console.error("Error updating password:", error);
      let errorMessage = "Không thể thay đổi mật khẩu. Vui lòng thử lại.";
      if (error.code === 'auth/wrong-password') {
        errorMessage = "Mật khẩu hiện tại không đúng.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Mật khẩu mới quá yếu.";
      }
      setPasswordError(errorMessage);
      toast({ title: "Lỗi thay đổi mật khẩu", description: errorMessage, variant: "destructive" });
    }
    setIsSavingPassword(false);
  };
  
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Đang tải thông tin tài khoản...</p>
      </div>
    );
  }

  if (!user) {
     return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <UserCircle className="w-6 h-6 mr-2" /> Cài Đặt Tài Khoản
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Vui lòng đăng nhập để xem cài đặt tài khoản.</p>
        </CardContent>
      </Card>
    );
  }


  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <UserCircle className="w-7 h-7 mr-2" /> Thông Tin Cá Nhân
          </CardTitle>
          <CardDescription>Chỉnh sửa tên hiển thị của bạn.</CardDescription>
        </CardHeader>
        <form onSubmit={displayNameForm.handleSubmit(onDisplayNameSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold">Email</Label>
              <Input id="email" type="email" value={user.email || ""} disabled className="bg-muted/50" />
              <p className="text-xs text-muted-foreground">Email không thể thay đổi.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName" className="font-semibold">Tên hiển thị</Label>
              <Input id="displayName" {...displayNameForm.register("displayName")} placeholder="Nhập tên hiển thị của bạn" />
              {displayNameForm.formState.errors.displayName && <p className="text-sm text-destructive">{displayNameForm.formState.errors.displayName.message}</p>}
               {displayNameError && <p className="text-sm text-destructive mt-1">{displayNameError}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSavingDisplayName || authLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSavingDisplayName ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {isSavingDisplayName ? "Đang lưu..." : "Lưu Tên Hiển Thị"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <ShieldCheck className="w-7 h-7 mr-2" /> Thay Đổi Mật Khẩu
          </CardTitle>
          <CardDescription>Thay đổi mật khẩu đăng nhập của bạn.</CardDescription>
        </CardHeader>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type={showCurrentPassword ? "text" : "password"} 
                  {...passwordForm.register("currentPassword")}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  aria-label={showCurrentPassword ? "Ẩn mật khẩu hiện tại" : "Hiện mật khẩu hiện tại"}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {passwordForm.formState.errors.currentPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <div className="relative">
                <Input 
                  id="newPassword" 
                  type={showNewPassword ? "text" : "password"} 
                  {...passwordForm.register("newPassword")} 
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Ẩn mật khẩu mới" : "Hiện mật khẩu mới"}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {passwordForm.formState.errors.newPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.newPassword.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Xác nhận mật khẩu mới</Label>
              <div className="relative">
                <Input 
                  id="confirmNewPassword" 
                  type={showConfirmNewPassword ? "text" : "password"} 
                  {...passwordForm.register("confirmNewPassword")} 
                  className="pr-10"
                />
                 <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  aria-label={showConfirmNewPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"}
                >
                  {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {passwordForm.formState.errors.confirmNewPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.confirmNewPassword.message}</p>}
            </div>
             {passwordError && <p className="text-sm text-destructive mt-1">{passwordError}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSavingPassword || authLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSavingPassword ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {isSavingPassword ? "Đang lưu..." : "Đổi Mật Khẩu"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
