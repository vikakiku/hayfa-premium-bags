#!/usr/bin/env pwsh
# Build Docker image with environment variables from .env.local

# Load .env.local if it exists
if (Test-Path ".env.local") {
    Get-Content ".env.local" | ForEach-Object {
        if ($_ -match "^\s*([^#][^=]*)\s*=\s*(.*)\s*$") {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim('"').Trim("'")
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
            Write-Host "Loaded: $name"
        }
    }
}

$DATABASE_URL = $env:DATABASE_URL
if (-not $DATABASE_URL) {
    Write-Error "DATABASE_URL not found in .env.local"
    exit 1
}

Write-Host "Building Docker image with DATABASE_URL..."
docker build --build-arg DATABASE_URL="$DATABASE_URL" -t hayfa-app .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Docker build successful!"
    Write-Host "Run with: docker run -p 3000:3000 -e DATABASE_URL=`"$DATABASE_URL`" hayfa-app"
} else {
    Write-Error "❌ Docker build failed!"
    exit $LASTEXITCODE
}