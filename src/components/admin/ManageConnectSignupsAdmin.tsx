"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { getConnectSignups, updateConnectSignupStatus, deleteConnectSignup } from "@/lib/firestoreService";
import { ConnectSignupStatus, connectSignupStatuses, ConnectSignupData } from "@/types/landingPageAdmin";
import { formatDateForDisplay } from "@/lib/utils";
import { Loader2, MessageCircle, Filter, ArrowUpDown, MessageSquareText, ExternalLink, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { isValid as isValidDate } from 'date-fns';

const ITEMS_PER_PAGE = 10;

export default function ManageConnectSignupsAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [signups, setSignups] = useState<ConnectSignupData[]>([]);
  const [filteredSignups, setFilteredSignups] = useState<ConnectSignupData[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof ConnectSignupData | null; direction: "asc" | "desc" }>({ key: "createdAt", direction: "desc" });
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});

  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Hàm lấy danh sách kết nối từ Firestore và cập nhật state.
  const fetchSignups = async () => {
    setIsLoading(true);
    try {
      const data = await getConnectSignups();
      setSignups(data);
    } catch (error) {
      console.error("Error loading connect signups:", error);
      toast({
        title: "Lỗi tải dữ liệu",
        description: "Không thể tải danh sách kết nối.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSignups();
  }, []);

  useEffect(() => {
    let processedSignups = [...signups];

    if (filterStatus !== "all") {
      processedSignups = processedSignups.filter(s => s.status === filterStatus);
    }

    if (searchTerm) {
      processedSignups = processedSignups.filter(s =>
        s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      const key = sortConfig.key;

      const getSortableDateValue = (dateInput: any): number => {
        if (dateInput instanceof Date) return dateInput.getTime();
        if (dateInput instanceof Timestamp) return dateInput.toMillis();
        if (typeof dateInput === 'object' && dateInput !== null && 'seconds' in dateInput && typeof dateInput.seconds === 'number') {
            return new Timestamp(dateInput.seconds, (dateInput as any).nanoseconds || 0).toMillis();
        }
        const d = new Date(dateInput);
        return !isValidDate(d) ? 0 : d.getTime();
      };
      
      processedSignups.sort((a, b) => {
        const valA = a[key as keyof ConnectSignupData];
        const valB = b[key as keyof ConnectSignupData];

        if (key === "createdAt") {
          const timeA = getSortableDateValue(valA);
          const timeB = getSortableDateValue(valB);
          return sortConfig.direction === "asc" ? timeA - timeB : timeB - timeA;
        } else {
          // Handles fullName, email, message (optional), status
          const strA = String(valA ?? ""); 
          const strB = String(valB ?? "");
          return sortConfig.direction === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA);
        }
      });
    }

    setFilteredSignups(processedSignups);
    setCurrentPage(1); 
  }, [signups, filterStatus, searchTerm, sortConfig]);

  // Hàm xử lý thay đổi trạng thái kết nối và cập nhật Firestore.
  const handleStatusChange = async (id: string, newStatus: ConnectSignupStatus) => {
    setIsUpdating(prev => ({ ...prev, [id]: true }));
    const success = await updateConnectSignupStatus(id, newStatus);
    if (success) {
      toast({
        title: "Cập nhật thành công!",
        description: `Trạng thái đã được đổi thành "${newStatus}".`,
      });
      setSignups(prevSignups => prevSignups.map(s => s.id === id ? { ...s, status: newStatus } : s));
    } else {
      toast({
        title: "Lỗi!",
        description: "Không thể cập nhật trạng thái. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
    setIsUpdating(prev => ({ ...prev, [id]: false }));
  };

  // Hàm xử lý logic sắp xếp cho các cột trong bảng.
  const requestSort = (key: keyof ConnectSignupData) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Hàm trả về icon chỉ báo sắp xếp cho một cột.
  const getSortIndicator = (key: keyof ConnectSignupData) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <ArrowUpDown className="ml-2 h-3 w-3 inline opacity-50 group-hover:opacity-100" /> : <ArrowUpDown className="ml-2 h-3 w-3 inline opacity-50 group-hover:opacity-100" />;
    }
    return <ArrowUpDown className="ml-2 h-3 w-3 inline opacity-0 group-hover:opacity-50" />;
  };

  // Hàm mở dialog xem nội dung tin nhắn của kết nối.
  const openMessageDialog = (message: string) => {
    setSelectedMessage(message);
    setIsMessageDialogOpen(true);
  };

  // Hàm xử lý xóa kết nối
  const handleDelete = async (id: string, fullName: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa kết nối của "${fullName}"?`)) {
      return;
    }
    
    setIsDeleting(prev => ({ ...prev, [id]: true }));
    const success = await deleteConnectSignup(id);
    if (success) {
      toast({
        title: "Xóa thành công!",
        description: `Đã xóa kết nối của "${fullName}".`,
      });
      setSignups(prevSignups => prevSignups.filter(s => s.id !== id));
    } else {
      toast({
        title: "Lỗi!",
        description: "Không thể xóa kết nối. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
    setIsDeleting(prev => ({ ...prev, [id]: false }));
  };

  const indexOfLastSignup = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstSignup = indexOfLastSignup - ITEMS_PER_PAGE;
  const currentSignups = filteredSignups.slice(indexOfFirstSignup, indexOfLastSignup);
  const totalPages = Math.ceil(filteredSignups.length / ITEMS_PER_PAGE);

  if (isLoading && signups.length === 0) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <MessageCircle className="w-6 h-6 mr-2" /> Quản Lý Email
          </CardTitle>
          <CardDescription>Xem và quản lý các yêu cầu kết nối từ người dùng.</CardDescription>
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
      <CardHeader className="py-3">
        <CardTitle className="text-2xl font-headline text-primary flex items-center">
          <MessageCircle className="w-7 h-7 mr-2" /> Quản Lý Email
        </CardTitle>
        <CardDescription>Xem, lọc và cập nhật trạng thái các yêu cầu kết nối từ người dùng.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          <div className="flex-grow w-full sm:w-auto">
            <Input
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                {connectSignupStatuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && signups.length > 0 && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="ml-2 text-sm text-muted-foreground">Đang làm mới dữ liệu...</p>
          </div>
        )}

        {currentSignups.length === 0 && !isLoading ? (
          <p className="text-muted-foreground text-center py-8">Không tìm thấy kết nối nào khớp với tiêu chí.</p>
        ) : (
          <div className="border rounded-md overflow-x-auto max-h-[52vh] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="group cursor-pointer hover:bg-muted/50 whitespace-nowrap" onClick={() => requestSort('fullName')}>
                    Họ Tên {getSortIndicator('fullName')}
                  </TableHead>
                  <TableHead className="group cursor-pointer hover:bg-muted/50 whitespace-nowrap" onClick={() => requestSort('email')}>
                    Email {getSortIndicator('email')}
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Lời Nhắn</TableHead>
                  <TableHead className="group cursor-pointer hover:bg-muted/50 whitespace-nowrap" onClick={() => requestSort('createdAt')}>
                    Ngày Gửi {getSortIndicator('createdAt')}
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Trạng Thái</TableHead>
                  <TableHead className="whitespace-nowrap">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentSignups.map((signup) => (
                  <TableRow key={signup.id}>
                    <TableCell className="font-medium whitespace-nowrap">{signup.fullName}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <a href={`mailto:${signup.email}`} className="text-primary hover:underline flex items-center gap-1">
                        {signup.email} <ExternalLink className="w-3 h-3" />
                      </a>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      {signup.message && signup.message.length > 50 ? (
                        <>
                          {signup.message.substring(0, 50)}...
                          <Button variant="link" size="sm" className="p-0 h-auto ml-1 text-xs" onClick={() => openMessageDialog(signup.message!)}>Xem thêm</Button>
                        </>
                      ) : signup.message || <span className="text-muted-foreground italic">Không có</span>}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{formatDateForDisplay(signup.createdAt)}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Select
                        value={signup.status}
                        onValueChange={(value) => handleStatusChange(signup.id, value as ConnectSignupStatus)}
                        disabled={isUpdating[signup.id]}
                      >
                        <SelectTrigger className="w-[150px] h-9">
                          {isUpdating[signup.id] ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          {connectSignupStatuses.map(status => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                                             </Select>
                     </TableCell>
                     <TableCell className="whitespace-nowrap">
                       <Button
                         variant="destructive"
                         size="sm"
                         onClick={() => handleDelete(signup.id, signup.fullName)}
                         disabled={isDeleting[signup.id]}
                         className="h-8 w-8 p-0"
                       >
                         {isDeleting[signup.id] ? (
                           <Loader2 className="h-4 w-4 animate-spin" />
                         ) : (
                           <Trash2 className="h-4 w-4" />
                         )}
                       </Button>
                     </TableCell>
                   </TableRow>
                 ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between py-0">
        <p className="text-xs text-muted-foreground">
          Hiển thị {currentSignups.length} trong số {filteredSignups.length} kết quả. (Tổng cộng {signups.length} kết nối)
        </p>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 pb-4">
            <span className="text-sm text-muted-foreground">
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Sau
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </CardFooter>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center"><MessageSquareText className="w-5 h-5 mr-2 text-primary" /> Lời nhắn chi tiết</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-2">
            <p className="text-sm text-foreground whitespace-pre-wrap break-words">{selectedMessage}</p>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setIsMessageDialogOpen(false)} variant="outline">Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
} 