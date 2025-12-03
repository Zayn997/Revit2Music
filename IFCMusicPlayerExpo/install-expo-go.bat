@echo off
echo ========================================
echo Installing Expo Go on Emulator
echo ========================================
echo.

set ANDROID_HOME=C:\Users\zaynh\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\platform-tools;%PATH%

echo Checking if emulator is running...
"%ANDROID_HOME%\platform-tools\adb.exe" devices
echo.

echo Downloading Expo Go APK...
echo Please wait, this may take a minute...
echo.

REM Download Expo Go APK
powershell -Command "& {Invoke-WebRequest -Uri 'https://d1ahtucjixef4r.cloudfront.net/Exponent-2.32.0.apk' -OutFile 'expo-go.apk'}"

if exist expo-go.apk (
    echo.
    echo Installing Expo Go on emulator...
    "%ANDROID_HOME%\platform-tools\adb.exe" install expo-go.apk
    
    echo.
    echo ========================================
    echo Installation Complete!
    echo ========================================
    echo.
    echo Now you can run: npx expo start --offline
    echo Then press 'a' to open your app
    echo.
    
    del expo-go.apk
) else (
    echo.
    echo ERROR: Failed to download Expo Go APK
    echo.
    echo Manual alternative:
    echo 1. Open the emulator
    echo 2. Open Play Store in the emulator
    echo 3. Search for "Expo Go"
    echo 4. Install it
    echo.
)

echo.
pause
