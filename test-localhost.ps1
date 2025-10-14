# Test script for the local server
Write-Host "🧪 Testing Optimizely Opal Product Description Tool" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray

Write-Host "`n📡 Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8787/health" -Method Get
    Write-Host "✅ Health check passed!" -ForegroundColor Green
    $health | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Health check failed: $_" -ForegroundColor Red
}

Write-Host "`n📡 Testing Discovery Endpoint..." -ForegroundColor Yellow
try {
    $discovery = Invoke-RestMethod -Uri "http://localhost:8787/discovery" -Method Get
    Write-Host "✅ Discovery endpoint working!" -ForegroundColor Green
    $discovery | ConvertTo-Json -Depth 5
} catch {
    Write-Host "❌ Discovery failed: $_" -ForegroundColor Red
}

Write-Host "`n📡 Testing Product Description Generation..." -ForegroundColor Yellow
$testRequest = @{
    productName = "Wireless Bluetooth Headphones"
    partNumber = "WH-1000XM4"
    attributes = @(
        @{ name = "Battery Life"; value = "30"; unit = "hours" }
        @{ name = "Weight"; value = "254"; unit = "grams" }
        @{ name = "Noise Cancellation"; value = "Active" }
    )
    descriptionType = "marketing"
    tone = "professional"
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "http://localhost:8787/" -Method Post -Body $testRequest -ContentType "application/json"
    Write-Host "✅ Description generated successfully!" -ForegroundColor Green
    $result | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Description generation failed: $_" -ForegroundColor Red
}

Write-Host ("`n" + ("=" * 60)) -ForegroundColor Gray
Write-Host "All tests completed" -ForegroundColor Green

