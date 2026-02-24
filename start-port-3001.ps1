# Run React app on port 3001
# Usage: .\start-port-3001.ps1
# If you get "UNKNOWN: unknown error, read" - move project out of OneDrive (e.g. C:\Projects\Portfolio)

$env:PORT = "3001"
Write-Host "Starting app on http://localhost:3001 ..." -ForegroundColor Cyan
npm start
