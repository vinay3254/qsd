# Manual APK Installation Instructions

Since `INSTALL_FAILED_USER_RESTRICTED` error is occurring on your Xiaomi/MIUI device, here's how to install the APK manually:

## The APK Location
- **APK already on your phone**: `/sdcard/Download/app-debug.apk`
- **APK on your computer**: `c:\Users\sanvi\OneDrive\Desktop\expensetrackproject\android\app\build\outputs\apk\debug\app-debug.apk`

---

## Method 1: Install via Phone File Manager (Easiest)

1. **Open the Files app** on your Xiaomi phone
2. **Go to Downloads folder** - you should see `app-debug.apk`
3. **Tap on the APK** - a warning will appear
4. **Tap "Install anyway"** or:
   - If blocked, tap "More details"
   - Enable "Install from this source" toggle
   - Then tap Install

---

## Method 2: Enable "Install via USB" (Required for ADB installs)

### Step 1: Enable Developer Options
1. Go to **Settings → About Phone**
2. Tap **MIUI Version** 7 times until "Developer mode enabled"

### Step 2: Grant Installation Permission
1. Go to **Settings → Apps → Manage Apps**
2. Tap the **three dots** (top right) → **Special Access**
3. Tap **"Install via USB"** or **"Install unknown apps"**
4. Find and enable for these apps:
   - **Files** (or your file manager)
   - **Chrome** (if using browser download)
   - **Messaging** (if receiving via SMS)

### Step 3: Disable MIUI Optimization (Recommended)
1. Go to **Settings → Developer Options**
2. Turn **OFF** "MIUI Optimization"
3. **Restart your phone** (important!)

---

## Method 3: Use ADB to Grant Permission

Run these commands on your computer:

```bash
# Grant install permission to package installer
adb shell pm grant com.android.packageinstaller android.permission.REQUEST_INSTALL_PACKAGES

# Or try installing with grants
adb install -g "c:\Users\sanvi\OneDrive\Desktop\expensetrackproject\android\app\build\outputs\apk\debug\app-debug.apk"
```

The `-g` flag grants runtime permissions.

---

## After Successful Installation

### Option A: Run without Metro (Standalone)
The app will work standalone with bundled JavaScript. Open the app from your home screen.

### Option B: Run with Metro (For Development)
1. Start Metro bundler: `npx react-native start`
2. On your phone, **shake** the device to open Dev Menu
3. Go to **Settings → Dev Settings**
4. Tap **"Debug server host & port for device"**
5. Enter your computer's IP address, e.g.: `192.168.1.x:8081`
6. Go back and tap **"Reload"**

---

## Troubleshooting

### If still getting "Install blocked":
- Make sure **"Install via USB"** is enabled for your file manager
- Try Method 3 (disable MIUI Optimization)

### If app crashes on launch:
- Check if Metro is running
- Or rebuild with bundled JS: `cd android && ./gradlew assembleRelease`

---

## Quick Fix Checklist

- [ ] Developer Options enabled
- [ ] "Install via USB" enabled for Files app
- [ ] MIUI Optimization disabled (optional but recommended)
- [ ] Phone restarted after disabling MIUI Optimization

