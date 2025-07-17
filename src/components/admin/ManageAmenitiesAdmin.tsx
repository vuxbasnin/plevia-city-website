
"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader as ShadTableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getAmenitiesSectionData, updateAmenitiesSectionData } from "@/lib/firestoreService";
import { type AmenitiesSectionData, type AmenityItem, amenityItemSchema } from "@/types/landingPageAdmin";
import { Loader2, Save, PlusCircle, Edit, Trash2, Sparkles } from "lucide-react";
import DynamicLucideIcon from '@/components/shared/DynamicLucideIcon';


export default function ManageAmenitiesAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [amenitiesList, setAmenitiesList] = useState<AmenityItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState<AmenityItem | null>(null);

  const form = useForm<AmenityItem>({
    resolver: zodResolver(amenityItemSchema),
    defaultValues: {
      id: "",
      icon: "Smile",
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    async function loadAmenitiesData() {
      setIsLoading(true);
      try {
        const data = await getAmenitiesSectionData();
        setAmenitiesList(data?.items || []);
      } catch (error) {
        console.error("Error loading amenities data:", error);
        toast({
          title: "Lỗi tải dữ liệu",
          description: "Không thể tải dữ liệu dịch vụ & tiện ích.",
          variant: "destructive",
        });
        setAmenitiesList([]);
      }
      setIsLoading(false);
    }
    loadAmenitiesData();
  }, [toast]);

  const handleSaveAll = async () => {
    setIsSaving(true);
    const success = await updateAmenitiesSectionData({ items: amenitiesList });
    if (success) {
      toast({
        title: "Đã lưu thành công!",
        description: "Danh sách dịch vụ & tiện ích đã được cập nhật.",
        variant: "default",
      });
    } else {
      toast({
        title: "Lỗi!",
        description: "Không thể lưu danh sách. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };

  const handleAddNewAmenity = () => {
    setEditingAmenity(null);
    form.reset({
      id: "",
      icon: "Smile",
      name: "",
      description: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditAmenity = (amenity: AmenityItem) => {
    setEditingAmenity(amenity);
    form.reset(amenity);
    setIsDialogOpen(true);
  };

  const handleDeleteAmenity = (id: string) => {
    setAmenitiesList(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Đã xóa (chưa lưu)",
      description: "Nhấn 'Lưu Tất Cả Thay Đổi' để xác nhận việc xóa.",
      variant: "default"
    });
  };

  const onAmenitySubmit: SubmitHandler<AmenityItem> = (data) => {
    if (editingAmenity) {
      setAmenitiesList(prev => prev.map(item => item.id === editingAmenity.id ? { ...data, id: editingAmenity.id } : item));
    } else {
      setAmenitiesList(prev => [...prev, { ...data, id: Date.now().toString() }]);
    }
    setIsDialogOpen(false);
    setEditingAmenity(null);
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <Sparkles className="w-6 h-6 mr-2" /> Quản Lý Dịch Vụ & Tiện Ích
          </CardTitle>
          <CardDescription>Thêm, sửa, xóa các dịch vụ và tiện ích nổi bật.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Đang tải dữ liệu...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <Sparkles className="w-7 h-7 mr-2" /> Quản Lý Dịch Vụ & Tiện Ích
          </CardTitle>
          <CardDescription>Thêm, sửa, xóa các dịch vụ và tiện ích nổi bật hiển thị trên trang chủ.</CardDescription>
        </div>
        <Button onClick={handleAddNewAmenity} className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Thêm Dịch Vụ Mới
        </Button>
      </CardHeader>
      <CardContent>
        {amenitiesList.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Chưa có dịch vụ nào. Hãy thêm mới!</p>
        ) : (
          <div className="border rounded-md max-h-[59vh] overflow-auto">
            <Table>
              <ShadTableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Icon</TableHead>
                  <TableHead>Tên Dịch Vụ</TableHead>
                  <TableHead>Mô Tả</TableHead>
                  <TableHead className="text-right w-[120px]">Hành Động</TableHead>
                </TableRow>
              </ShadTableHeader>
              <TableBody>
                {amenitiesList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="align-top">
                      <div className="flex items-center space-x-2">
                        <DynamicLucideIcon name={item.icon} className="w-6 h-6 text-primary object-contain" />
                        <span className="text-xs text-muted-foreground truncate w-12 block md:hidden">({item.icon.startsWith('http') ? 'URL' : item.icon})</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium align-top">{item.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate align-top">{item.description}</TableCell>
                    <TableCell className="text-right align-top">
                      <Button variant="ghost" size="icon" onClick={() => handleEditAmenity(item)} className="mr-2 hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteAmenity(item.id)} className="hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveAll} disabled={isSaving || isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {isSaving ? "Đang lưu..." : "Lưu Tất Cả Thay Đổi"}
        </Button>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px] max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingAmenity ? "Chỉnh Sửa Dịch Vụ" : "Thêm Dịch Vụ Mới"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onAmenitySubmit)} className="flex-grow flex flex-col min-h-0">
            <div className="space-y-4 py-4 px-2 overflow-y-auto pr-3 flex-grow">
              <div>
                <Label htmlFor="icon">Icon (Tên Lucide hoặc URL Ảnh)</Label>
                <Input id="icon" {...form.register("icon")} placeholder="Ví dụ: Wifi HOẶC https://example.com/icon.png" />
                {form.formState.errors.icon && <p className="text-sm text-destructive mt-1">{form.formState.errors.icon.message}</p>}
                <p className="text-xs text-muted-foreground mt-1">
                  Nhập tên icon từ thư viện{' '}
                  <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    Lucide Icons
                  </a> (ví dụ: "Smile", "Award") hoặc nhập URL đầy đủ đến file ảnh.
                </p>
              </div>
              <div>
                <Label htmlFor="name">Tên dịch vụ</Label>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea id="description" {...form.register("description")} />
                {form.formState.errors.description && <p className="text-sm text-destructive mt-1">{form.formState.errors.description.message}</p>}
              </div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <DialogClose asChild>
                <Button type="button" variant="outline">Hủy</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-primary hover:bg-primary/90">
                {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingAmenity ? "Lưu Thay Đổi" : "Thêm Dịch Vụ"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

