# Troubleshooting Guide - IFC Music Player

## Common Issues and Solutions

### 1. Network Error When Starting (`TypeError: fetch failed`)

**Error Message:**

```
TypeError: fetch failed
    at fetchWithCredentials
    at getNativeModuleVersionsAsync
```

**Cause:** Expo is trying to fetch version information from the internet but your network/firewall is blocking it.

**Solutions:**

#### Option A: Start in Offline Mode (Recommended)

```bash
npx expo start --offline
```

Or use the batch file: `run-app.bat` → Option 3

#### Option B: Set Environment Variable

```bash
set EXPO_OFFLINE=1
npm start
```

#### Option C: Check Network/Firewall

1. Check if you're behind a corporate firewall
2. Try disabling VPN temporarily
3. Check proxy settings
4. Test internet connection: `ping expo.dev`

#### Option D: Use Local Network

```bash
npx expo start --offline --lan
```

### 2. Module Resolution Errors

**Error:** `Cannot find module` or `Module not found`

**Solution:**

```bash
# Delete node_modules and reinstall
rmdir /s /q node_modules
del package-lock.json
npm install
```

### 3. Metro Bundler Cache Issues

**Error:** Bundler errors or stale files

**Solution:**

```bash
# Clear cache and restart
npm start -- --clear
```

Or:

```bash
npx expo start -c
```

### 4. Port Already in Use

**Error:** `Port 8081 already in use`

**Solution:**

#### Windows:

```bash
# Find process using port 8081
netstat -ano | findstr :8081

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

Then restart:

```bash
npm start
```

### 5. TypeScript/JSX Compilation Errors

**Error:** `Cannot use JSX unless the '--jsx' flag is provided`

**Status:** This is normal during development. The errors will be resolved when the app runs through Expo's bundler.

**If persists:**

1. Ensure `tsconfig.json` extends `expo/tsconfig.base`
2. Check that all dependencies are installed
3. Restart the Metro bundler

### 6. Android Emulator Not Found

**Error:** `No Android emulators found`

**Solution:**

1. Install Android Studio
2. Open AVD Manager
3. Create a virtual device
4. Start the emulator
5. Then run: `npm run android`

**Alternative:** Use physical device with USB debugging enabled

### 7. iOS Simulator Not Found (Mac Only)

**Error:** `Could not find Xcode's Developer tools`

**Solution:**

1. Install Xcode from App Store
2. Run: `sudo xcode-select --switch /Applications/Xcode.app`
3. Accept license: `sudo xcodebuild -license`
4. Then run: `npm run ios`

### 8. expo-audio Not Playing Sound

**Possible Issues:**

#### Check File Format

- Supported: MP3, WAV
- Limited MIDI support (may not play)

#### Check File Path

```typescript
// Ensure proper file:// prefix
const uri = track.uri.startsWith("file://") ? track.uri : `file://${track.uri}`;
```

#### Check Device Volume

- Unmute device
- Increase volume
- Check if headphones are connected

#### Check Permissions (Android)

Add to `app.json`:

```json
"android": {
  "permissions": [
    "READ_EXTERNAL_STORAGE",
    "WRITE_EXTERNAL_STORAGE"
  ]
}
```

### 9. File Import Not Working

**Issue:** Document picker doesn't show files

**Solutions:**

#### Android:

1. Grant storage permissions
2. Check file is in accessible location
3. Try different file picker location (Downloads, Documents)

#### iOS:

1. Grant Files access permission
2. File must be in iCloud or local storage
3. Check app.json has document picker plugin

### 10. App Crashes on Startup

**Solution:**

#### Check Logs:

```bash
# Android
npx expo run:android --no-build-cache

# iOS
npx expo run:ios --no-build-cache
```

#### Clean Install:

```bash
# Remove and reinstall
rmdir /s /q node_modules
rmdir /s /q .expo
del package-lock.json
npm install
npx expo start -c
```

### 11. Dependencies Installation Fails

**Error:** `npm install` errors

**Solutions:**

#### Try npm cache clean:

```bash
npm cache clean --force
npm install
```

#### Try different Node version:

```bash
# Check Node version
node --version

# Should be 16+ or 18+ LTS
```

#### Use npx instead:

```bash
npx expo install --fix
```

## Quick Fixes Checklist

When something doesn't work:

1. ✅ **Clear cache**: `npm start -- --clear`
2. ✅ **Restart Metro**: Stop (Ctrl+C) and restart
3. ✅ **Reinstall**: Delete `node_modules`, `npm install`
4. ✅ **Offline mode**: `npx expo start --offline`
5. ✅ **Check logs**: Read error messages carefully
6. ✅ **Update Expo**: `npx expo install expo@latest`
7. ✅ **Restart computer**: Sometimes helps with port/network issues

## Network-Specific Solutions

### Corporate Network / Firewall

**Option 1: Configure Proxy**

```bash
set HTTP_PROXY=http://proxy.company.com:8080
set HTTPS_PROXY=http://proxy.company.com:8080
npm start
```

**Option 2: Always Use Offline Mode**
Create `.env` file:

```
EXPO_OFFLINE=1
```

**Option 3: Use Tunnel**

```bash
npx expo start --tunnel
```

(Requires ngrok)

### No Internet Connection

**Always use offline mode:**

```bash
npx expo start --offline --localhost
```

## Performance Issues

### Metro Bundler Slow

**Solutions:**

1. Close other applications
2. Exclude `node_modules` from antivirus
3. Use `--max-workers 2` flag
4. Disable unnecessary Expo plugins

### App Running Slow on Device

**Solutions:**

1. Enable development mode: Shake device → "Debug JS Remotely"
2. Clear app data on device
3. Use production build for testing
4. Check device storage space

## Debugging Tips

### Enable Verbose Logging

```bash
set EXPO_DEBUG=1
npm start
```

### Check Expo Status

```bash
npx expo-doctor
```

### View Metro Bundler Logs

The terminal shows all bundling activity. Read carefully for clues.

### Use React DevTools

```bash
# In another terminal
npx react-devtools
```

## Getting Help

1. **Check Expo Docs**: https://docs.expo.dev
2. **Expo Forums**: https://forums.expo.dev
3. **GitHub Issues**: Check if others had same issue
4. **Stack Overflow**: Search for error message

## Emergency Reset

If nothing works, nuclear option:

```bash
# Backup your src/ folder first!

# Complete clean slate
rmdir /s /q node_modules
rmdir /s /q .expo
rmdir /s /q .expo-shared
del package-lock.json
del yarn.lock

# Reinstall everything
npm install

# Clear all caches
npm start -- --clear
```

## Most Common Solution

**90% of issues are solved by:**

```bash
npx expo start --offline --clear
```

This bypasses network checks and clears the cache. Try this first!

---

Last Updated: December 3, 2025
