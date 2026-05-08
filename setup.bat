@echo off
REM Script de démarrage complet - A2S Website pour Windows

echo.
echo ========================================
echo 🚀 A2S Website - Demarrage Complet
echo ========================================
echo.

REM Vérifier si on est dans le bon dossier
if not exist "package.json" (
    echo ❌ Erreur: package.json non trouvé
    echo Assurez-vous d'etre dans le dossier racine du projet
    pause
    exit /b 1
)

echo.
echo 📋 Prerequis:
echo   ✓ Node.js installe
echo   ✓ MySQL installe et en cours d'execution
echo   ✓ Variables d'environnement configurees (server\.env)
echo.

pause

echo.
echo 📦 Installation des dependances frontend...
call npm install

echo.
echo 📦 Installation des dependances backend...
cd server
call npm install

echo.
echo 🔄 Initialisation de la base de donnees...
call npm run init-db

if errorlevel 1 (
    echo.
    echo ❌ Erreur lors de l'initialisation de la base de donnees
    echo Verifiez:
    echo   1. MySQL est-il en cours d'execution?
    echo   2. Les identifiants dans server\.env sont-ils corrects?
    pause
    exit /b 1
)

echo.
echo ✅ Installation complete!
echo.
echo 🎯 Prochaines etapes:
echo.
echo Terminal 1 - Frontend:
echo   C:\...\a2s-website^> npm run dev
echo.
echo Terminal 2 - Backend:
echo   C:\...\a2s-website^> cd server
echo   C:\...\a2s-website\server^> npm run dev
echo.
echo L'application sera disponible sur:
echo   Frontend: http://localhost:5173
echo   Backend API: http://localhost:5000/api
echo.

pause
