
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, User, Mail, MessageSquare } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự.").max(100, "Họ tên không quá 100 ký tự."),
  email: z.string().email("Địa chỉ email không hợp lệ."),
  message: z.string().max(1000, "Nội dung không quá 1000 ký tự.").optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormDialogProps {
  triggerButton: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  submitButtonText?: string;
}

export default function ContactFormDialog({
  triggerButton,
  dialogTitle = "Liên Hệ Với Chúng Tôi",
  dialogDescription = "Vui lòng điền thông tin vào biểu mẫu bên dưới. Chúng tôi sẽ phản hồi bạn sớm nhất có thể.",
  submitButtonText = "Gửi Tin Nhắn",
}: ContactFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "trial_signups"), {
        ...data,
        message: data.message || "", // Ensure message is empty string if undefined
        createdAt: serverTimestamp(),
        status: "pending",
      });

      toast({
        title: "Đã gửi thành công!",
        description: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ sớm phản hồi.",
        variant: "default",
      });
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to submit contact form to Firestore:", error);
      toast({
        title: "Gửi thất bại!",
        description: "Đã có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild >{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[85vh] flex flex-col">
        <DialogHeader className="pr-6">
          <DialogTitle className="flex items-center text-2xl">
            <Send className="w-6 h-6 mr-2 text-primary" /> {dialogTitle}
          </DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col min-h-0 py-4">
          <div className="space-y-5 px-1 overflow-y-auto pr-5 flex-grow">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="font-semibold flex items-center">
                <User className="w-4 h-4 mr-2 text-muted-foreground" /> Họ và Tên
              </Label>
              <Input
                id="fullName"
                placeholder="Nhập họ và tên của bạn"
                {...register("fullName")}
                className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold flex items-center">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập địa chỉ email"
                {...register("email")}
                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-semibold flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-muted-foreground" /> Nội dung lời nhắn{" "}
                <span className="text-xs text-muted-foreground ml-1">(tùy chọn)</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Bạn cần chúng tôi hỗ trợ điều gì?"
                {...register("message")}
                rows={5}
                className={errors.message ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
            </div>
          </div>

          <DialogFooter className="mt-auto pt-6 border-t">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? "Đang gửi..." : submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
