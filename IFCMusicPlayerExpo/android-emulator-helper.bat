@echo off
echo ========================================
echo Android Emulator Helper
echo ========================================
echo.

set ANDROID_HOME=C:\Users\zaynh\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\emulator;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\latest\bin;%PATH%

:menu
echo.
echo What would you like to do?
echo.
echo 1. List available emulators
echo 2. List installed system images
echo 3. Create a new emulator (Pixel 6)
echo 4. Start an emulator
echo 5. Open Android Studio AVD Manager
echo 6. Exit
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto list_emulators
if "%choice%"=="2" goto list_images
if "%choice%"=="3" goto create_emulator
if "%choice%"=="4" goto start_emulator
if "%choice%"=="5" goto open_avd
if "%choice%"=="6" goto end
goto menu

:list_emulators
echo.
echo ========================================
echo Available Emulators:
echo ========================================
"%ANDROID_HOME%\emulator\emulator.exe" -list-avds
if errorlevel 1 (
    echo No emulators found. You need to create one first.
)
echo.
pause
goto menu

:list_images
echo.
echo ========================================
echo Installed System Images:
echo ========================================
"%ANDROID_HOME%\cmdline-tools\latest\bin\sdkmanager.bat" --list_installed | findstr "system-images"
echo.
echo If no images are shown, you need to install one from Android Studio.
echo.
pause
goto menu

:create_emulator
echo.
echo ========================================
echo Creating New Emulator
echo ========================================
echo.
echo First, let's check what system images you have...
"%ANDROID_HOME%\cmdline-tools\latest\bin\sdkmanager.bat" --list_installed | findstr "system-images"
echo.
echo Enter the system image you want to use (e.g., system-images;android-34;google_apis;x86_64)
echo Or press Enter to use: system-images;android-34;google_apis;x86_64
set /p image="System image: "
if "%image%"=="" set image=system-images;android-34;google_apis;x86_64

echo.
set /p name="Enter emulator name (default: Pixel_6_API_34): "
if "%name%"=="" set name=Pixel_6_API_34

echo.
echo Creating emulator "%name%" with image "%image%"...
echo no | "%ANDROID_HOME%\cmdline-tools\latest\bin\avdmanager.bat" create avd -n %name% -k "%image%" -d pixel_6

if errorlevel 1 (
    echo.
    echo ERROR: Failed to create emulator.
    echo You may need to download the system image first from Android Studio.
) else (
    echo.
    echo SUCCESS: Emulator created successfully!
)
echo.
pause
goto menu

:start_emulator
echo.
echo ========================================
echo Starting Emulator
echo ========================================
echo.
echo Available emulators:
"%ANDROID_HOME%\emulator\emulator.exe" -list-avds
echo.
set /p emulator_name="Enter emulator name to start: "
if "%emulator_name%"=="" (
    echo No emulator name provided.
    pause
    goto menu
)

echo.
echo Starting emulator: %emulator_name%
echo This will open in a new window...
start "" "%ANDROID_HOME%\emulator\emulator.exe" -avd %emulator_name%
echo.
echo Emulator is starting... This may take a minute.
echo Once it's running, go back to your Expo terminal and press 'a'
echo.
pause
goto menu

:open_avd
echo.
echo Opening Android Studio AVD Manager...
echo You can create emulators from there with a GUI.
echo.
start "" "C:\Program Files\Android\Android Studio\bin\studio64.exe"
echo.
pause
goto menu

:end
echo.
echo Goodbye!
echo.
