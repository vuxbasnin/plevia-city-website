
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Loader2, Send, User, Mail, Phone, CalendarIcon, Clock, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { tourBookingFormSchema, type TourBookingFormData, tourBookingTimeSlots } from "@/types/landingPageAdmin";

interface BookTourDialogProps {
  triggerButton: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  submitButtonText?: string;
}

export default function BookTourDialog({
  triggerButton,
  dialogTitle = "Đặt Lịch Tham Quan",
  dialogDescription = "Vui lòng điền thông tin bên dưới để đặt lịch tham quan không gian làm việc của chúng tôi.",
  submitButtonText = "Gửi Yêu Cầu",
}: BookTourDialogProps) {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<TourBookingFormData>({
    resolver: zodResolver(tourBookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      // preferredDate: new Date(), // Let users pick, undefined initially is fine
      numberOfPeople: 1,
      notes: "",
    },
  });
  const { register, handleSubmit, control, reset, formState: { errors } } = form;

  const onSubmit: SubmitHandler<TourBookingFormData> = async (data) => {
    setIsSubmittingForm(true);
    try {
      await addDoc(collection(db, "tour_bookings"), {
        ...data,
        preferredDate: Timestamp.fromDate(data.preferredDate), // Convert Date to Firestore Timestamp
        createdAt: serverTimestamp(),
        status: "pending_confirmation",
      });

      toast({
        title: "Yêu cầu đã được gửi!",
        description: "Cảm ơn bạn đã đặt lịch. Chúng tôi sẽ sớm liên hệ để xác nhận.",
        variant: "default",
      });
      reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to submit tour booking to Firestore:", error);
      toast({
        title: "Gửi yêu cầu thất bại!",
        description: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
    setIsSubmittingForm(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader className="pr-6">
          <DialogTitle className="flex items-center text-2xl">
            <CalendarIcon className="w-6 h-6 mr-2 text-primary" /> {dialogTitle}
          </DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col min-h-0 py-4">
          <div className="space-y-5 px-1 overflow-y-auto pr-5 flex-grow">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullNameTour" className="font-semibold flex items-center">
                <User className="w-4 h-4 mr-2 text-muted-foreground" /> Họ và Tên <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="fullNameTour"
                placeholder="Nhập họ và tên của bạn"
                {...register("fullName")}
                className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="emailTour" className="font-semibold flex items-center">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" /> Email <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="emailTour"
                type="email"
                placeholder="Nhập địa chỉ email"
                {...register("email")}
                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phoneTour" className="font-semibold flex items-center">
                <Phone className="w-4 h-4 mr-2 text-muted-foreground" /> Số Điện Thoại
              </Label>
              <Input
                id="phoneTour"
                type="tel"
                placeholder="Nhập số điện thoại (tùy chọn)"
                {...register("phone")}
                className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Preferred Date */}
              <div className="space-y-2">
                <Label htmlFor="preferredDateTour" className="font-semibold flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" /> Ngày Tham Quan <span className="text-destructive ml-1">*</span>
                </Label>
                <Controller
                  control={control}
                  name="preferredDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                            errors.preferredDate && "border-destructive focus-visible:ring-destructive"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} // Disable past dates
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.preferredDate && <p className="text-sm text-destructive">{errors.preferredDate.message}</p>}
              </div>

              {/* Preferred Time */}
              <div className="space-y-2">
                <Label htmlFor="preferredTimeTour" className="font-semibold flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" /> Giờ Tham Quan <span className="text-destructive ml-1">*</span>
                </Label>
                <Controller
                  control={control}
                  name="preferredTime"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={cn(errors.preferredTime && "border-destructive focus:ring-destructive")}>
                        <SelectValue placeholder="Chọn khung giờ" />
                      </SelectTrigger>
                      <SelectContent>
                        {tourBookingTimeSlots.map(slot => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.preferredTime && <p className="text-sm text-destructive">{errors.preferredTime.message}</p>}
              </div>
            </div>

            {/* Number of People */}
            <div className="space-y-2">
              <Label htmlFor="numberOfPeopleTour" className="font-semibold flex items-center">
                <Users className="w-4 h-4 mr-2 text-muted-foreground" /> Số Lượng Người <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="numberOfPeopleTour"
                type="number"
                placeholder="Ví dụ: 2"
                {...register("numberOfPeople", { valueAsNumber: true })}
                className={errors.numberOfPeople ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.numberOfPeople && <p className="text-sm text-destructive">{errors.numberOfPeople.message}</p>}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notesTour" className="font-semibold flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-muted-foreground" /> Ghi Chú Thêm
              </Label>
              <Textarea
                id="notesTour"
                placeholder="Bạn có yêu cầu hoặc câu hỏi cụ thể nào không?"
                {...register("notes")}
                rows={3}
                className={errors.notes ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
            </div>
          </div>

          <DialogFooter className="mt-auto pt-6 border-t">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Hủy
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmittingForm} className="bg-primary hover:bg-primary/90">
              {isSubmittingForm ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {isSubmittingForm ? "Đang gửi..." : submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

