@echo off
chcp 65001 >nul
echo ========================================
echo 实验室网站 - 本地启动脚本
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] 检查Docker状态...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker未安装或未启动
    echo 请先安装Docker Desktop并确保其正在运行
    pause
    exit /b 1
)
echo ✅ Docker已就绪
echo.

echo [2/3] 拉取Docker镜像（首次运行需要下载约100MB）...
docker compose -f docker-compose-slim.yml pull
if errorlevel 1 (
    echo ❌ 镜像拉取失败
    pause
    exit /b 1
)
echo ✅ 镜像准备完成
echo.

echo [3/3] 启动网站...
echo.
echo ========================================
echo 网站将在以下地址运行:
echo   👉 http://localhost:8080
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

docker compose -f docker-compose-slim.yml up

pause
