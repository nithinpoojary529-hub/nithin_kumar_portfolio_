@echo off
title Portfolio Profile Image Setup
echo =======================================================
echo Setting up Nithin Kumar's Profile Photo for Portfolio
echo =======================================================
echo.
echo Copying your uploaded portrait photo...

copy "C:\Users\Nithinkumar\.gemini\antigravity\brain\f86803ce-fc83-4787-b6f3-acc2a0d276f2\.user_uploaded\media_1793717078584_23d42cb4.jpg" "e:\nithin_kumar_portfolio\profile.jpg" /Y

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] Profile photo copied successfully as profile.jpg!
    echo Refresh your index.html in your browser to see your picture.
) else (
    echo.
    echo [NOTE] Please manually copy your photo to:
    echo e:\nithin_kumar_portfolio\profile.jpg
)

echo.
pause

