# React Native CLI Fix - TODO List

## Task: Fix missing React Native CLI commands (start, run-android)

### Steps to Complete:

- [ ] 1. Clear npx cache
- [ ] 2. Remove node_modules directory
- [ ] 3. Remove package-lock.json
- [ ] 4. Clean npm cache
- [ ] 5. Reinstall dependencies (npm install)
- [ ] 6. Verify CLI is working (npx react-native --version)
- [ ] 7. Start Metro bundler (npx react-native start)
- [ ] 8. Build debug APK (cd android; ./gradlew assembleDebug)
- [ ] 9. Install APK on physical device (adb install)

---

## PowerShell Commands to Run:

### Step 1-5: Clean and reinstall
```powershell
npx clear-npx-cache
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm cache clean --force
npm install
```

### Step 6: Verify CLI
```powershell
npx react-native --version
```

### Step 7: Start Metro (keep terminal open)
```powershell
npx react-native start
```

### Step 8: Build APK (new terminal)
```powershell
cd android
./gradlew assembleDebug
```

### Step 9: Install on device (new terminal)
```powershell
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Alternative if CLI still not found:
```powershell
npm install -g @react-native-community/cli
```

---

## Notes:
- Keep Metro bundler running while installing app
- Enable USB Debugging on Android device
- Connect device via USB (not hub)
- Run `adb devices` to verify device connection

