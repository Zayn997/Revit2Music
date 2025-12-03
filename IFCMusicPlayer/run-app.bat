@echo off
echo ====================================
echo IFC Music Player - Expo App
echo ====================================
echo.

:menu
echo Select an option:
echo 1. Install dependencies (npm install)
echo 2. Start development server (normal)
echo 3. Start in OFFLINE mode (recommended if network issues)
echo 4. Run on Android
echo 5. Clear cache and start
echo 6. Exit
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto start
if "%choice%"=="3" goto offline
if "%choice%"=="4" goto android
if "%choice%"=="5" goto clear
if "%choice%"=="6" goto end
echo Invalid choice. Please try again.
goto menu

:install
echo.
echo Installing dependencies...
call npm install
echo.
echo Dependencies installed!
pause
goto menu

:start
echo.
echo Starting Expo development server...
echo.
call npm start
pause
goto menu

:offline
echo.
echo Starting Expo in OFFLINE mode...
echo This skips network version checks
echo.
call npx expo start --offline
pause
goto menu

:android
echo.
echo Running on Android...
echo Make sure you have Android emulator running or device connected
echo.
call npm run android
pause
goto menu

:clear
echo.
echo Clearing cache and starting...
echo.
call npm start -- --clear
pause
goto menu

:end
echo.
echo Goodbye!
exit
