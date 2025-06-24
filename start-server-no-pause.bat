@echo off
echo Starting GLOHSEN Backend Server...
cd /d "%~dp0"
echo.
echo Backend Server is starting...
echo You can close this window to stop the server.
echo.
node api/create-conversation.js
