ad# Android Emulator Fix - Instructions

## Problem
The app build was successful but installation failed because:
1. The emulator was OFFLINE or not fully booted
2. The error "device is still booting" occurred

## Solutions Implemented

### 1. Gradle Configuration (Already Applied)
Added timeout configuration in `android/gradle.properties`:
- Now waits up to 5 minutes for device to be ready

### 2. Emulator Startup Scripts
Use these scripts to start the emulator properly before running the app:

**Option A - Batch Script (Recommended):**
```
scripts\start-emulator.bat
```

**Option B - PowerShell Script:**
```
powershell -ExecutionPolicy Bypass -File scripts\start-emulator.ps1
```

### 3. Build Standalone APK
If you want to build an APK that works WITHOUT Metro bundler:

```
scripts\build-standalone-apk.bat
```

This will create:
- `android\app\build\outputs\apk\debug\app-debug.apk`

You can install this APK directly on any Android device.

## Recommended Workflow

1. **Start the emulator first:**
   ```
   scripts\start-emulator.bat
   ```
   Wait until you see "Emulator is ready!"

2. **Then run your app:**
   ```
   npx react-native run-android
   ```

## Alternative - Manual Emulator Start

1. Open Android Studio
2. Go to Device Manager
3. Start the Pixel_4a emulator
4. Wait for it to fully boot (you should see the home screen)
5. Then run: `npx react-native run-android`

## Troubleshooting

If still having issues, try:
- Wipe emulator data in Android Studio Device Manager
- Cold boot the emulator (not quick boot)
- Check ADB connection: `adb devices`

