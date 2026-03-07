@echo off
REM Build Standalone APK with bundled JavaScript
REM This APK works WITHOUT Metro bundler - can be installed directly

echo Building standalone debug APK with bundled JavaScript...
echo.

cd /d "%~dp0\.."

REM Clean previous build
if exist "android\app\build\outputs\apk\debug" (
    echo Cleaning previous build...
    rmdir /s /q "android\app\build\outputs\apk\debug"
)

REM Bundle JavaScript and build APK
echo Bundling JavaScript and building APK...
call npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

if %errorlevel% neq 0 (
    echo.
    echo Error: Failed to bundle JavaScript
    pause
    exit /b 1
)

REM Build the APK
cd android
call gradlew.bat assembleDebug

if %errorlevel% neq 0 (
    echo.
    echo Error: Failed to build APK
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo Build successful!
echo.
echo APK location:
echo   android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo You can install this APK directly on any
echo Android device without needing Metro server.
echo ========================================

pause

