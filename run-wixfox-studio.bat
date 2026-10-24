@echo off
title WixFox Studio - Agency ERP & Invoicing PC Suite
color 0B
cd /d "%~dp0"

:MENU
cls
echo ======================================================================
echo             WIXFOX TECHNOLOGIES - STUDIO PC APPLICATION
echo                     "Your Growth, Our Technology."
echo ======================================================================
echo.
echo  [1] Launch Native Windows Desktop App (Electron Window)
echo  [2] Open Standalone App in Default Web Browser (No Server Needed)
echo  [3] Start Local Live Development Server (http://localhost:5173)
echo  [4] Build Standalone Windows Installer (.exe)
echo  [5] Build Android APK
echo  [6] Exit
echo.
echo ======================================================================
set /p choice="Enter your choice (1-6) [Default: 1]: "

if "%choice%"=="" set choice=1
if "%choice%"=="1" goto LAUNCH_ELECTRON
if "%choice%"=="2" goto LAUNCH_BROWSER
if "%choice%"=="3" goto LAUNCH_DEV
if "%choice%"=="4" goto BUILD_EXE
if "%choice%"=="5" goto BUILD_APK
if "%choice%"=="6" exit

echo Invalid choice. Try again.
pause
goto MENU

:LAUNCH_ELECTRON
echo.
echo Starting WixFox Studio Desktop App...
start "" cmd /c "npx electron ."
exit

:LAUNCH_BROWSER
echo.
echo Opening WixFox Studio in your browser...
start "" "WixFox-Studio-App.html"
exit

:LAUNCH_DEV
echo.
echo Starting Vite Dev Server...
npm run dev
pause
goto MENU

:BUILD_EXE
echo.
echo Building Windows 10/11 Executable (.exe)...
npm run build:exe
pause
goto MENU

:BUILD_APK
echo.
echo Building Android APK...
npm run build:apk
pause
goto MENU
