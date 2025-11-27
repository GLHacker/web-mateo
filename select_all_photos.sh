#!/bin/bash

# Script para abrir el explorador de archivos en la carpeta de imágenes
# Esto facilita la selección de todas las fotos

cd /home/laura/.gemini/antigravity/scratch/mi_pagina_web/images
ls -lh *.jpg
echo ""
echo "==================================="
echo "📸 FOTOS ENCONTRADAS:"
echo "==================================="
ls -1 *.jpg | nl
echo ""
echo "Total: $(ls -1 *.jpg | wc -l) fotos"
echo ""
echo "👉 Haz clic en la zona de carga en el navegador"
echo "   y selecciona todas estas fotos (Ctrl+A)"
