#!/bin/bash
echo "Arrêt des services ISSR Sainte Bakhita..."
pkill -f "uvicorn main:app" 2>/dev/null || true
pkill -f "node dist/main.js" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
echo "Tous les services ont été arrêtés."
