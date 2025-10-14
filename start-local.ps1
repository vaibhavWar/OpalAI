# Start local development server script
Write-Host "🔨 Building project..." -ForegroundColor Cyan
npm run build

Write-Host "`n🚀 Starting Cloudflare Workers local server..." -ForegroundColor Cyan
Write-Host "Server will start on http://localhost:8787" -ForegroundColor Green
Write-Host "`nAvailable endpoints:" -ForegroundColor Yellow
Write-Host "  GET  http://localhost:8787/health      - Health check" -ForegroundColor White
Write-Host "  GET  http://localhost:8787/discovery   - Tool discovery" -ForegroundColor White
Write-Host "  POST http://localhost:8787/            - Generate description" -ForegroundColor White
Write-Host "`nPress Ctrl+C to stop the server`n" -ForegroundColor Yellow

wrangler dev --local --port 8787

