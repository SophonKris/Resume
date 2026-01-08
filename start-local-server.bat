@echo off
chcp 65001 >nul
echo ========================================
echo 个人简历网站 - 本地测试服务器
echo ========================================
echo.

:: 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到Python，请先安装Python
    echo 下载地址: https://www.python.org/downloads/
    pause
    exit /b 1
)

:: 获取当前目录
set "current_dir=%~dp0"
echo 当前目录: %current_dir%
echo.

:: 检查必要文件
if not exist "index.html" (
    echo [错误] 未找到 index.html 文件
    pause
    exit /b 1
)

if not exist "resume.html" (
    echo [错误] 未找到 resume.html 文件
    pause
    exit /b 1
)

echo [信息] 正在启动本地服务器...
echo [信息] 服务器地址: http://localhost:8000
echo [信息] 按 Ctrl+C 停止服务器
echo.
echo ========================================
echo 测试说明:
echo 1. 验证页面: http://localhost:8000
echo 2. 输入"田智宇"进行验证
echo 3. 验证成功后自动跳转到简历页面
echo 4. 每个设备最多尝试2次
echo 5. 频繁操作会被禁止访问
echo ========================================
echo.

:: 启动Python HTTP服务器
python -m http.server 8000

pause