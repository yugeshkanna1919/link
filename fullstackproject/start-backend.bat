@echo off
echo ========================================
echo    Food Delivery Backend Server
echo ========================================
echo.
echo Starting backend server...
echo.

cd /d "%~dp0"
cd backend

echo Checking if MongoDB is running...
echo.

echo Installing dependencies if needed...
call npm install

echo.
echo Starting server on port 5000...
echo.
echo Server will be available at:
echo - API: http://localhost:5000/api
echo - Health Check: http://localhost:5000/api/health
echo.
echo Press Ctrl+C to stop the server
echo.

node server.js

pause 