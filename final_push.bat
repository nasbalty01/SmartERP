@echo off
echo ====================================================
echo SmartERP - Final Push to GitHub
echo ====================================================
echo.
echo This script will help you push your complete SmartERP code to:
echo https://github.com/Nasir0347/SmartERP.git
echo.
echo NOTE: If prompted, please enter your GitHub Personal Access Token (PAT).
echo.
git push -u origin main --force
echo.
echo ====================================================
if %errorlevel% neq 0 (
    echo [ERROR] Push failed. Please check your GitHub permissions.
) else (
    echo [SUCCESS] Code pushed successfully!
)
echo ====================================================
pause
