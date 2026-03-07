@echo off
REM Android Emulator Startup Script
REM This script starts the emulator and waits for it to fully boot

set EMULATOR_NAME=Pixel_4a
set ANDROID_SDK=C:\Users\sanvi\AppData\Local\Android\Sdk

echo Starting Android Emulator: %EMULATOR_NAME%

REM Start emulator in background
start "" "%ANDROID_SDK%\emulator\emulator.exe" @%EMULATOR_NAME%

echo Waiting for emulator to boot (this may take 2-3 minutes)...
echo Please wait until the emulator fully loads...

REM Wait for device to be ready
:wait_loop
timeout /t 10 /nobreak >nul
"%ANDROID_SDK%\platform-tools\adb.exe" devices | findstr /C:"%EMULATOR_NAME% device" >nul
if %errorlevel%==0 (
    echo.
    echo Emulator is ready!
    echo You can now run: npx react-native run-android
    exit /b 0
)

echo Still waiting for emulator...
goto wait_loop

