# Deploy script cho Windows
param(
    [string]$VPS_IP = "103.56.163.188",
    [string]$USERNAME = "nextjs",
    [string]$APP_PATH = "/home/nextjs/apps/pleviacity"
)

Write-Host "🚀 Starting deployment..." -ForegroundColor Green

# Build ứng dụng locally
Write-Host "📦 Building application..." -ForegroundColor Yellow
npm run build

# Upload files to VPS
Write-Host "�� Uploading files to VPS..." -ForegroundColor Yellow
scp -r .next package.json package-lock.json $USERNAME@$VPS_IP:$APP_PATH/

# SSH vào VPS và restart ứng dụng
Write-Host "🔄 Restarting application on VPS..." -ForegroundColor Yellow
ssh $USERNAME@$VPS_IP "cd $APP_PATH && npm install --production && pm2 restart pleviacity"

Write-Host "✅ Deployment completed!" -ForegroundColor Green