@echo off
echo ========================================
echo    Database Seeder
echo ========================================
echo.
echo Seeding database with sample data...
echo.

cd /d "%~dp0"
cd backend

echo Installing dependencies if needed...
call npm install

echo.
echo Running database seeder...
echo This will create sample users, restaurants, and foods.
echo.

node seeder.js

echo.
echo ========================================
echo    Seeding Complete!
echo ========================================
echo.
echo Sample login credentials:
echo - User: john@example.com / password123
echo - Restaurant Owner: jane@example.com / password123
echo.
echo Press any key to close...
pause >nul 