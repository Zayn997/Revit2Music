@echo off
echo ========================================
echo Android SDK Environment Setup
echo ========================================
echo.

REM Check if Android SDK exists in default location
if exist "C:\Users\zaynh\AppData\Local\Android\Sdk" (
    echo Android SDK found at: C:\Users\zaynh\AppData\Local\Android\Sdk
    echo.
    echo Setting ANDROID_HOME environment variable...
    
    REM Set permanently for user (no admin needed)
    setx ANDROID_HOME "C:\Users\zaynh\AppData\Local\Android\Sdk"
    
    echo.
    echo ========================================
    echo Setup Complete!
    echo ========================================
    echo.
    echo Environment variable set:
    echo   ANDROID_HOME = C:\Users\zaynh\AppData\Local\Android\Sdk
    echo.
    echo IMPORTANT: Close ALL terminals and open a NEW cmd window
    echo for changes to take effect!
    echo.
    
) else (
    echo ERROR: Android SDK not found at default location!
    echo Expected location: C:\Users\zaynh\AppData\Local\Android\Sdk
    echo.
    echo Please install Android Studio first from:
    echo https://developer.android.com/studio
    echo.
)

echo.
echo Press any key to exit...
pause > nul
