@echo off
echo ========================================
echo Fixing Expo App Issues
echo ========================================
echo.

cd C:\LocalData\git\Structures\AI\Revit2Music\IFCMusicPlayerExpo

echo Step 1: Clearing Metro bundler cache...
rd /s /q .expo 2>nul
rd /s /q node_modules\.cache 2>nul

echo.
echo Step 2: Clearing Android build cache on emulator...
set ANDROID_HOME=C:\Users\zaynh\AppData\Local\Android\Sdk
"%ANDROID_HOME%\platform-tools\adb.exe" shell pm clear host.exp.exponent

echo.
echo Step 3: Uninstalling and reinstalling Expo Go on emulator...
"%ANDROID_HOME%\platform-tools\adb.exe" uninstall host.exp.exponent
timeout /t 2 /nobreak >nul

echo.
echo Please install Expo Go from Play Store in your emulator now.
echo.
echo After installing, press any key to continue...
pause >nul

echo.
echo Step 4: Starting Expo with clean cache...
echo.
echo Run this command in a CMD window:
echo   cd C:\LocalData\git\Structures\AI\Revit2Music\IFCMusicPlayerExpo
echo   npx expo start --clear --offline
echo.
echo Then press 'a' to open on Android
echo.
pause
