@echo off
chcp 65001 >nul
echo ========================================
echo 停止实验室网站
echo ========================================
echo.

cd /d "%~dp0"

echo 正在停止容器...
docker compose -f docker-compose-slim.yml down

echo.
echo ✅ 网站已停止
echo.
pause
