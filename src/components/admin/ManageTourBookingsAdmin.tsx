
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getTourBookings, updateTourBookingStatus } from "@/lib/firestoreService";
import type { TourBookingData, TourBookingStatus } from "@/types/landingPageAdmin";
import { tourBookingStatuses } from "@/types/landingPageAdmin";
import { Loader2, CalendarClock, Filter, ArrowUpDown, MessageSquareText, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO, isValid as isValidDate } from 'date-fns';
import { Timestamp } from "firebase/firestore";

// Helper to convert Firestore Timestamp or serialized object/string to a formatted date string
const formatDateForDisplay = (timestampInput: Timestamp | Date | { seconds: number, nanoseconds: number } | string | undefined, dateFormat: string = "dd/MM/yyyy HH:mm"): string => {
  if (!timestampInput) return "N/A";
  let date: Date;

  if (timestampInput instanceof Date) {
    date = timestampInput;
  } else if (timestampInput instanceof Timestamp) {
    date = timestampInput.toDate();
  } else if (typeof timestampInput === 'object' && timestampInput !== null && 'seconds' in timestampInput && typeof timestampInput.seconds === 'number' && 'nanoseconds' in timestampInput && typeof timestampInput.nanoseconds === 'number') {
    date = new Timestamp(timestampInput.seconds, timestampInput.nanoseconds).toDate();
  } else if (typeof timestampInput === 'string') {
    date = parseISO(timestampInput);
    if (!isValidDate(date)) {
        date = new Date(timestampInput);
    }
  } else {
    console.warn("formatDateForDisplay received an unexpected input type:", timestampInput);
    return "Invalid Input";
  }

  if (!isValidDate(date)) {
    console.warn("formatDateForDisplay resulted in Invalid Date for input:", timestampInput);
    return "Invalid Date";
  }

  try {
    return format(date, dateFormat);
  } catch (error) {
    console.error("Error formatting date:", error, "Original input:", timestampInput, "Parsed date:", date);
    return "Format Error";
  }
};

const ITEMS_PER_PAGE = 10;

export default function ManageTourBookingsAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<TourBookingData[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<TourBookingData[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof TourBookingData | null; direction: "asc" | "desc" }>({ key: "createdAt", direction: "desc" });
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});

  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const data = await getTourBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error loading tour bookings:", error);
      toast({
        title: "Lỗi tải dữ liệu",
        description: "Không thể tải danh sách lịch tham quan.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    let processedBookings = [...bookings];

    if (filterStatus !== "all") {
      processedBookings = processedBookings.filter(b => b.status === filterStatus);
    }

    if (searchTerm) {
      processedBookings = processedBookings.filter(b =>
        b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.phone && b.phone.toLowerCase().includes(searchTerm.toLowerCase()))
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

      processedBookings.sort((a, b) => {
        const valA = a[key as keyof TourBookingData];
        const valB = b[key as keyof TourBookingData];

        if (key === "createdAt" || key === "preferredDate") {
          const timeA = getSortableDateValue(valA);
          const timeB = getSortableDateValue(valB);
          return sortConfig.direction === "asc" ? timeA - timeB : timeB - timeA;
        } else if (key === "numberOfPeople") {
          const numA = Number(valA) || 0;
          const numB = Number(valB) || 0;
          return sortConfig.direction === "asc" ? numA - numB : numB - numA;
        } else {
          // Handles fullName, email, phone (optional), notes (optional), status, preferredTime
          const strA = String(valA ?? "");
          const strB = String(valB ?? "");
          return sortConfig.direction === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA);
        }
      });
    }

    setFilteredBookings(processedBookings);
    setCurrentPage(1); 
  }, [bookings, filterStatus, searchTerm, sortConfig]);

  const handleStatusChange = async (id: string, newStatus: TourBookingStatus) => {
    setIsUpdating(prev => ({ ...prev, [id]: true }));
    const success = await updateTourBookingStatus(id, newStatus);
    if (success) {
      toast({
        title: "Cập nhật thành công!",
        description: `Trạng thái đã được đổi thành "${newStatus}".`,
      });
      setBookings(prevBookings => prevBookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } else {
      toast({
        title: "Lỗi!",
        description: "Không thể cập nhật trạng thái. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
    setIsUpdating(prev => ({ ...prev, [id]: false }));
  };

  const requestSort = (key: keyof TourBookingData) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof TourBookingData) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <ArrowUpDown className="ml-2 h-3 w-3 inline opacity-50 group-hover:opacity-100" /> : <ArrowUpDown className="ml-2 h-3 w-3 inline opacity-50 group-hover:opacity-100" />;
    }
    return <ArrowUpDown className="ml-2 h-3 w-3 inline opacity-0 group-hover:opacity-50" />;
  };

  const openNotesDialog = (notes: string) => {
    setSelectedNotes(notes);
    setIsNotesDialogOpen(true);
  };

  const indexOfLastBooking = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBooking = indexOfLastBooking - ITEMS_PER_PAGE;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);


  if (isLoading && bookings.length === 0) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <CalendarClock className="w-6 h-6 mr-2" /> Quản Lý Lịch Tham Quan
          </CardTitle>
          <CardDescription>Xem và quản lý các yêu cầu đặt lịch tham quan.</CardDescription>
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
          <CalendarClock className="w-7 h-7 mr-2" /> Quản Lý Lịch Tham Quan
        </CardTitle>
        <CardDescription>Xem, lọc và cập nhật trạng thái các yêu cầu đặt lịch tham quan từ người dùng.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          <div className="flex-grow w-full sm:w-auto">
            <Input
              placeholder="Tìm kiếm theo tên, email, SĐT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                {tourBookingStatuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && bookings.length > 0 && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="ml-2 text-sm text-muted-foreground">Đang làm mới dữ liệu...</p>
          </div>
        )}

        {currentBookings.length === 0 && !isLoading ? (
          <p className="text-muted-foreground text-center py-8">Không tìm thấy lịch tham quan nào khớp.</p>
        ) : (
          <div className="border rounded-md overflow-x-auto max-h-[52vh] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="group cursor-pointer hover:bg-muted/50 whitespace-nowrap" onClick={() => requestSort('fullName')}>Họ Tên {getSortIndicator('fullName')}</TableHead>
                  <TableHead className="group cursor-pointer hover:bg-muted/50 whitespace-nowrap" onClick={() => requestSort('email')}>Email {getSortIndicator('email')}</TableHead>
                  <TableHead className="whitespace-nowrap">SĐT</TableHead>
                  <TableHead className="group cursor-pointer hover:bg-muted/50 whitespace-nowrap" onClick={() => requestSort('preferredDate')}>Ngày Mong Muốn {getSortIndicator('preferredDate')}</TableHead>
                  <TableHead className="whitespace-nowrap">Giờ Mong Muốn</TableHead>
                  <TableHead className="group cursor-pointer hover:bg-muted/50 whitespace-nowrap text-center" onClick={() => requestSort('numberOfPeople')}>Số Người {getSortIndicator('numberOfPeople')}</TableHead>
                  <TableHead className="whitespace-nowrap">Ghi Chú</TableHead>
                  <TableHead className="group cursor-pointer hover:bg-muted/50 whitespace-nowrap" onClick={() => requestSort('createdAt')}>Ngày Gửi {getSortIndicator('createdAt')}</TableHead>
                  <TableHead className="whitespace-nowrap">Trạng Thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium whitespace-nowrap">{booking.fullName}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <a href={`mailto:${booking.email}`} className="text-primary hover:underline flex items-center gap-1">
                        {booking.email} <ExternalLink className="w-3 h-3" />
                      </a>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{booking.phone || "N/A"}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatDateForDisplay(booking.preferredDate, "dd/MM/yyyy")}</TableCell>
                    <TableCell className="whitespace-nowrap">{booking.preferredTime}</TableCell>
                    <TableCell className="whitespace-nowrap text-center">{booking.numberOfPeople}</TableCell>
                    <TableCell className="max-w-[150px]">
                      {booking.notes && booking.notes.length > 30 ? (
                        <>
                          {booking.notes.substring(0, 30)}...
                          <Button variant="link" size="sm" className="p-0 h-auto ml-1 text-xs" onClick={() => openNotesDialog(booking.notes!)}>Xem thêm</Button>
                        </>
                      ) : booking.notes || <span className="text-muted-foreground italic">Không có</span>}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{formatDateForDisplay(booking.createdAt)}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Select
                        value={booking.status}
                        onValueChange={(value) => handleStatusChange(booking.id, value as TourBookingStatus)}
                        disabled={isUpdating[booking.id]}
                      >
                        <SelectTrigger className="w-[180px] h-9 text-xs">
                          {isUpdating[booking.id] ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          {tourBookingStatuses.map(status => (
                            <SelectItem key={status} value={status} className="text-xs">
                              {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
          Hiển thị {currentBookings.length} trong số {filteredBookings.length} kết quả. (Tổng cộng {bookings.length} lịch đặt)
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

      <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center"><MessageSquareText className="w-5 h-5 mr-2 text-primary" /> Ghi chú chi tiết</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-2">
            <p className="text-sm text-foreground whitespace-pre-wrap break-words">{selectedNotes}</p>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setIsNotesDialogOpen(false)} variant="outline">Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

