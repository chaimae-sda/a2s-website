#!/bin/bash
# Script de démarrage complet - A2S Website

echo "🚀 A2S Website - Démarrage Complet"
echo "=================================="

# Vérifier si on est dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    echo "Assurez-vous d'être dans le dossier racine du projet"
    exit 1
fi

echo ""
echo "📋 Prérequis:"
echo "  ✓ Node.js installé"
echo "  ✓ MySQL installé et en cours d'exécution"
echo "  ✓ Variables d'environnement configurées (server/.env)"
echo ""

read -p "Appuyez sur Entrée pour continuer..."

echo ""
echo "📦 Installation des dépendances frontend..."
npm install

echo ""
echo "📦 Installation des dépendances backend..."
cd server
npm install

echo ""
echo "🔄 Initialisation de la base de données..."
npm run init-db

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'initialisation de la base de données"
    echo "Vérifiez:"
    echo "  1. MySQL est-il en cours d'exécution?"
    echo "  2. Les identifiants dans server/.env sont-ils corrects?"
    exit 1
fi

echo ""
echo "✅ Installation complète!"
echo ""
echo "🎯 Prochaines étapes:"
echo ""
echo "Terminal 1 - Frontend:"
echo "  $ npm run dev"
echo ""
echo "Terminal 2 - Backend:"
echo "  $ cd server"
echo "  $ npm run dev"
echo ""
echo "L'application sera disponible sur:"
echo "  Frontend: http://localhost:5173"
echo "  Backend API: http://localhost:5000/api"
echo ""
