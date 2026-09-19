#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "=========================================================="
echo " Démarrage Plateforme ISSR Sainte Joséphine Bakhita"
echo "=========================================================="

# 1. FastAPI CMS Microservice (Port 8000)
echo "-> Démarrage Backend Python (FastAPI CMS) sur le port 8000..."
cd "$DIR/apps/services-python/cms-service"
nohup .venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 > "$DIR/cms-service.log" 2>&1 &
CMS_PID=$!
echo "   [OK] FastAPI lancé (PID: $CMS_PID)"

# 2. NestJS School Microservice (Port 3001)
echo "-> Démarrage Backend NestJS (Admissions & Scolarité) sur le port 3001..."
cd "$DIR/apps/services-nest/school-service"
nohup node dist/main.js > "$DIR/school-service.log" 2>&1 &
NEST_PID=$!
echo "   [OK] NestJS lancé (PID: $NEST_PID)"

# 3. Next.js Web Frontend (Port 3000)
echo "-> Démarrage Frontend Web Next.js 15 sur le port 3000..."
cd "$DIR/apps/web"
nohup npm run dev > "$DIR/web.log" 2>&1 &
WEB_PID=$!
echo "   [OK] Next.js lancé (PID: $WEB_PID)"

echo "=========================================================="
echo " Tous les services sont opérationnels :"
echo " - Site Web Public & CMS : http://localhost:3000"
echo " - Espace Admin / Scolarité : http://localhost:3000/admin"
echo " - API FastAPI (Documentation) : http://localhost:8000/docs"
echo " - API NestJS (Admissions) : http://localhost:3001/api/admissions"
echo "=========================================================="
