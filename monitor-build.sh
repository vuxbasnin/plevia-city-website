#!/bin/bash

# Script để monitor memory usage khi build
echo "🔍 Monitoring build process..."

# Function để hiển thị memory usage
show_memory() {
    echo "📊 Memory Usage:"
    free -h
    echo "💾 Disk Usage:"
    df -h | grep -E '/$|/tmp'
    echo "---"
}

# Hiển thị memory ban đầu
echo "🚀 Starting build process..."
show_memory

# Chạy build và monitor
if [ "$1" = "vps" ]; then
    echo "🖥️  Using VPS build configuration..."
    NODE_OPTIONS='--max-old-space-size=4096 --gc-interval=100 --optimize-for-size' npm run build:vps &
elif [ "$1" = "low" ]; then
    echo "⚡ Using low memory build configuration..."
    npm run build:low-memory &
elif [ "$1" = "minimal" ]; then
    echo "🔧 Using minimal memory build configuration..."
    npm run build:minimal &
else
    echo "💪 Using standard build configuration..."
    npm run build &
fi

BUILD_PID=$!

# Monitor memory mỗi 10 giây
while kill -0 $BUILD_PID 2>/dev/null; do
    sleep 10
    show_memory
done

wait $BUILD_PID
BUILD_EXIT_CODE=$?

echo "🏁 Build completed with exit code: $BUILD_EXIT_CODE"
show_memory

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Try using lower memory options:"
    echo "   bash monitor-build.sh vps      # 4GB memory"
    echo "   bash monitor-build.sh low      # 2GB memory"  
    echo "   bash monitor-build.sh minimal  # 1.5GB memory"
fi 