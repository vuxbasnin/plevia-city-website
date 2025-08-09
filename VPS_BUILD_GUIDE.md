# 🖥️ Hướng dẫn Build cho VPS với RAM thấp

## 🚨 Triệu chứng lỗi
- `Out of memory: Killed process` 
- `JavaScript heap out of memory`
- Build process bị terminate đột ngột

## 🔧 Giải pháp theo thứ tự ưu tiên

### 1. **Setup Swap File (Quan trọng nhất)**
```bash
# Upload và chạy script setup swap
sudo bash setup-swap.sh

# Kiểm tra swap đã hoạt động
free -h
swapon --show
```

### 2. **Thử các build options theo thứ tự:**

#### Option 1: VPS Build (Khuyến nghị)
```bash
npm run build:vps
# Hoặc với monitoring:
bash monitor-build.sh vps
```

#### Option 2: Low Memory Build  
```bash
npm run build:low-memory
# Hoặc với monitoring:
bash monitor-build.sh low
```

#### Option 3: Minimal Memory Build (Cuối cùng)
```bash
npm run build:minimal
# Hoặc với monitoring:
bash monitor-build.sh minimal
```

### 3. **Clean build nếu vẫn lỗi:**
```bash
rm -rf .next node_modules
npm install
npm run build:vps
```

### 4. **Monitor trong quá trình build:**
```bash
# Terminal 1: Chạy build
npm run build:vps

# Terminal 2: Monitor memory
watch -n 2 'free -h && echo "---" && ps aux --sort=-%mem | head -5'
```

## 📊 So sánh Memory Settings

| Build Command | Memory Limit | GC Frequency | Best For |
|---------------|--------------|--------------|----------|
| `build` | 8GB | Default | Local development |
| `build:vps` | 4GB | High | VPS 4GB+ RAM |
| `build:low-memory` | 2GB | Very High | VPS 2-4GB RAM |
| `build:minimal` | 1.5GB | Maximum | VPS 1-2GB RAM |

## 🆘 Troubleshooting

### Nếu swap không hoạt động:
```bash
# Kiểm tra disk space
df -h

# Tạo swap nhỏ hơn
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Nếu vẫn lỗi memory:
1. Nâng cấp VPS RAM
2. Sử dụng CI/CD build trên server khác
3. Build local rồi upload dist files

### Kiểm tra VPS specs:
```bash
# Kiểm tra RAM
free -h

# Kiểm tra CPU
nproc

# Kiểm tra disk
df -h
```

## 🚀 Performance Tips

1. **Đóng các service không cần thiết:**
```bash
sudo systemctl stop apache2  # hoặc nginx tạm thời
sudo systemctl stop mysql    # nếu có
```

2. **Clear cache trước khi build:**
```bash
npm cache clean --force
rm -rf .next
```

3. **Build vào giờ ít traffic:**
- Thường build vào ban đêm khi server ít load

## 📞 Support Commands

```bash
# Kiểm tra memory realtime
htop

# Kill process nếu bị hang
pkill -f "next build"

# Restart Node.js services
pm2 restart all  # nếu dùng PM2
``` 