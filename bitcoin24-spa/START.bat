@echo off
echo ========================================
echo Starting Bitcoin24 Development Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [WARNING] Dependencies not installed!
    echo Running installation first...
    echo.
    call INSTALL.bat
    echo.
)

echo Starting development server...
echo.
echo The app will be available at:
echo   http://localhost:3000/zh-TW
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

