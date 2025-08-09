#!/bin/bash

# Script để tạo swap file cho VPS với RAM thấp
# Chạy với sudo: sudo bash setup-swap.sh

echo "🔧 Thiết lập Swap File cho VPS..."

# Kiểm tra swap hiện tại
echo "📊 Memory hiện tại:"
free -h

# Kiểm tra có swap file chưa
if swapon --show | grep -q swap; then
    echo "⚠️  Swap đã tồn tại. Đang xóa để tạo mới..."
    swapoff /swapfile
    rm -f /swapfile
fi

# Tạo swap file 4GB
echo "📝 Tạo swap file 4GB..."
fallocate -l 4G /swapfile

# Set permissions
chmod 600 /swapfile

# Tạo swap
mkswap /swapfile

# Kích hoạt swap
swapon /swapfile

# Thêm vào fstab để tự động mount khi reboot
if ! grep -q '/swapfile' /etc/fstab; then
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

# Tối ưu swappiness (giảm việc sử dụng swap khi không cần thiết)
echo 'vm.swappiness=10' >> /etc/sysctl.conf

echo "✅ Hoàn thành! Memory sau khi setup:"
free -h

echo ""
echo "🚀 Bây giờ bạn có thể chạy: npm run build" 