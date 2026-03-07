# Android Emulator Startup Script
# This script starts the emulator and waits for it to fully boot before allowing app installation

param(
    [string]$EmulatorName = "Pixel_4a",
    [int]$BootTimeout = 180
)

Write-Host "Starting Android Emulator: $EmulatorName" -ForegroundColor Cyan

# Start emulator and check if it launched successfully
$emulatorProcess = Start-Process -FilePath "C:\Users\sanvi\AppData\Local\Android\Sdk\emulator\emulator.exe" -ArgumentList "@$EmulatorName" -PassThru -WindowStyle Hidden

# Verify the emulator process started
if ($null -eq $emulatorProcess -or $emulatorProcess.HasExited) {
    Write-Host "ERROR: Failed to start emulator. Please check if the emulator name '$EmulatorName' exists." -ForegroundColor Red
    Write-Host "Run 'emulator -list-avds' to see available emulators." -ForegroundColor Yellow
    exit 1
}

Write-Host "Emulator process started (PID: $($emulatorProcess.Id))" -ForegroundColor Green
Write-Host "Waiting for emulator to boot (this may take a minute)..." -ForegroundColor Yellow

# Function to check if emulator is booted
function Test-EmulatorReady {
    $devices = & "C:\Users\sanvi\AppData\Local\Android\Sdk\platform-tools\adb.exe" devices 2>$null
    $deviceLine = $devices | Where-Object { $_ -match "$EmulatorName.*device" }
    return $null -ne $deviceLine
}

# Wait for emulator to be ready
$elapsed = 0
$interval = 5

while ($elapsed -lt $BootTimeout) {
    Start-Sleep -Seconds $interval
    $elapsed += $interval
    
    if (Test-EmulatorReady) {
        Write-Host "Emulator is ready!" -ForegroundColor Green
        Write-Host "You can now run your React Native app with: npx react-native run-android" -ForegroundColor Green
        exit 0
    }
    
    Write-Host "Still waiting... ($elapsed seconds)" -ForegroundColor Gray
}

Write-Host "Emulator may not be fully ready. Trying to proceed anyway..." -ForegroundColor Yellow
exit 0

