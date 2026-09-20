#!/usr/bin/env bash
# ==============================================================================
# ISSR Sainte Joséphine Bakhita — Script de Packaging pour Déploiement cPanel
# ==============================================================================
set -e

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}📦 Préparation des Archives de Déploiement pour cPanel ${NC}"
echo -e "${BLUE}   ISSR Sainte Joséphine Bakhita — Yaoundé, Mvolyé     ${NC}"
echo -e "${BLUE}======================================================${NC}"

# Répertoire racine du projet
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="${PROJECT_ROOT}/cpanel-bundles"

# Paramètres d'URLs de production (personnalisables via arguments ou variables)
CMS_URL="${NEXT_PUBLIC_CMS_API_URL:-https://api-cms.issr-bakhita.org}"
SCHOOL_URL="${NEXT_PUBLIC_SCHOOL_API_URL:-https://api-school.issr-bakhita.org}"
SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://issr-bakhita.org}"

if [ -n "$1" ]; then
    SITE_URL="$1"
fi
if [ -n "$2" ]; then
    CMS_URL="$2"
fi
if [ -n "$3" ]; then
    SCHOOL_URL="$3"
fi

echo -e "\n${YELLOW}⚙️ Configuration de l'environnement de build :${NC}"
echo -e "   • Site Web (Frontend) : ${GREEN}${SITE_URL}${NC}"
echo -e "   • CMS API (Python)     : ${GREEN}${CMS_URL}${NC}"
echo -e "   • School API (NestJS)  : ${GREEN}${SCHOOL_URL}${NC}"
echo ""

# Charger NVM si disponible
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    source "$HOME/.nvm/nvm.sh"
fi

# Création du dossier de sortie propre
rm -rf "${OUTPUT_DIR}"
mkdir -p "${OUTPUT_DIR}"

# ------------------------------------------------------------------------------
# 1. Compilation & Packaging du Frontend (Next.js 15 -> public_html)
# ------------------------------------------------------------------------------
echo -e "${BLUE}[1/3] Compilation du Frontend Next.js (Export Statique + .htaccess)...${NC}"
cd "${PROJECT_ROOT}/apps/web"

NEXT_EXPORT=true \
NEXT_PUBLIC_SITE_URL="${SITE_URL}" \
NEXT_PUBLIC_CMS_API_URL="${CMS_URL}" \
NEXT_PUBLIC_SCHOOL_API_URL="${SCHOOL_URL}" \
npm run build

# Copie explicite du .htaccess dans le dossier out généré
cp -f "${PROJECT_ROOT}/apps/web/public/.htaccess" "${PROJECT_ROOT}/apps/web/out/.htaccess"

# Compression en archive zip
echo "Archivage de public_html.zip..."
cd "${PROJECT_ROOT}/apps/web/out"
zip -r -q "${OUTPUT_DIR}/public_html.zip" ./* .htaccess
echo -e "${GREEN}✓ public_html.zip généré avec succès dans cpanel-bundles/ (${NC}$(du -h "${OUTPUT_DIR}/public_html.zip" | cut -f1)${GREEN})${NC}"

# ------------------------------------------------------------------------------
# 2. Compilation & Packaging du Microservice NestJS (Scolarité)
# ------------------------------------------------------------------------------
echo -e "\n${BLUE}[2/3] Compilation du Microservice NestJS (School Service)...${NC}"
cd "${PROJECT_ROOT}/apps/services-nest/school-service"
npm run build

echo "Archivage de school-service.zip..."
zip -r -q "${OUTPUT_DIR}/school-service.zip" dist/ app.js package.json tsconfig.json
echo -e "${GREEN}✓ school-service.zip généré avec succès dans cpanel-bundles/ (${NC}$(du -h "${OUTPUT_DIR}/school-service.zip" | cut -f1)${GREEN})${NC}"

# ------------------------------------------------------------------------------
# 3. Packaging du Microservice Python FastAPI (CMS)
# ------------------------------------------------------------------------------
echo -e "\n${BLUE}[3/3] Packaging du Microservice Python FastAPI (CMS Service)...${NC}"
cd "${PROJECT_ROOT}/apps/services-python/cms-service"

echo "Archivage de cms-service.zip..."
zip -r -q "${OUTPUT_DIR}/cms-service.zip" main.py passenger_wsgi.py requirements.txt
echo -e "${GREEN}✓ cms-service.zip généré avec succès dans cpanel-bundles/ (${NC}$(du -h "${OUTPUT_DIR}/cms-service.zip" | cut -f1)${GREEN})${NC}"

# ------------------------------------------------------------------------------
# Résumé
# ------------------------------------------------------------------------------
echo -e "\n${GREEN}======================================================${NC}"
echo -e "${GREEN}🎉 PACKAGING TERMINÉ AVEC SUCCÈS !${NC}"
echo -e "${GREEN}======================================================${NC}"
echo -e "Les 3 archives prêtes pour cPanel sont disponibles dans : ${YELLOW}${OUTPUT_DIR}${NC}"
ls -lh "${OUTPUT_DIR}"
echo -e "\nConsultez le fichier ${BLUE}CPANEL_DEPLOYMENT.md${NC} pour le guide pas à pas de téléversement !"
