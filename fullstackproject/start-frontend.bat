@echo off
echo ========================================
echo    Food Delivery Frontend
echo ========================================
echo.
echo Starting frontend development server...
echo.

cd /d "%~dp0"
cd "food delivery"

echo Installing dependencies if needed...
call npm install

echo.
echo Starting development server on port 5173...
echo.
echo Frontend will be available at:
echo - http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause 