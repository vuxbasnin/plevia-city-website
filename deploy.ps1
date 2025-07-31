# Deploy script cho Windows
param(
    [string]$VPS_IP = "103.56.163.188",
    [string]$USERNAME = "nextjs",
    [string]$APP_PATH = "/home/nextjs/apps/pleviacity",
    [int]$PORT = 24700
)

Write-Host "🚀 Starting deployment..." -ForegroundColor Green

# Build ứng dụng locally
Write-Host "📦 Building application..." -ForegroundColor Yellow
npm run build

# Upload files to VPS (sử dụng port tùy chỉnh)
Write-Host "📤 Uploading files to VPS..." -ForegroundColor Yellow
scp -P $PORT -r .next package.json package-lock.json "$USERNAME@${VPS_IP}:${APP_PATH}/"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed. Please check SSH port, network, and firewall." -ForegroundColor Red
    exit 1
}

# SSH vào VPS và restart ứng dụng (sử dụng port tùy chỉnh)
Write-Host "🔄 Restarting application on VPS..." -ForegroundColor Yellow
ssh -p $PORT $USERNAME@$VPS_IP "bash -c 'cd $APP_PATH && npm install --production && pm2 restart pleviacity'"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ SSH connection failed. Please check SSH port, network, and firewall." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deployment completed!" -ForegroundColor Green
