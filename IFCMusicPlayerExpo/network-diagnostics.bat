@echo off
echo ========================================
echo Network Diagnostics for Expo
echo ========================================
echo.

echo Testing connection to Expo servers...
echo.

echo 1. Testing general internet connectivity...
ping -n 3 google.com
echo.

echo 2. Testing Expo API server...
ping -n 3 api.expo.dev
echo.

echo 3. Testing Expo CDN...
ping -n 3 d1ahtucjixef4r.cloudfront.net
echo.

echo 4. Checking if proxy is set...
echo HTTP_PROXY: %HTTP_PROXY%
echo HTTPS_PROXY: %HTTPS_PROXY%
echo.

echo 5. Testing with curl (if available)...
curl -I https://api.expo.dev 2>nul
if errorlevel 1 (
    echo curl not available or connection failed
)
echo.

echo ========================================
echo Possible Solutions:
echo ========================================
echo.
echo If pings fail or time out:
echo   1. Check your firewall settings
echo   2. Temporarily disable antivirus
echo   3. Check if you're behind a corporate proxy
echo   4. Try disabling VPN if active
echo.
echo If you're on a corporate network, you may need:
echo   - Set proxy: set HTTPS_PROXY=http://proxy:port
echo   - Or use offline mode permanently
echo.
pause
