# 🎵 Guía: Cómo Agregar Música a la Página de Mateo

## ¿Por qué no se escucha la música?

La música necesita archivos de audio reales (MP3) que debes agregar tú mismo. No podemos usar canciones de YouTube o Spotify directamente por derechos de autor.

## Paso 1: Consigue los Archivos de Audio

Tienes varias opciones:

### Opción A: Descargar desde YouTube (Gratis)
1. Ve a un sitio como **https://ytmp3.nu/** o **https://yt1s.com/**
2. Pega el link de YouTube de la canción infantil
3. Descarga el archivo MP3

### Opción B: Usar Música Libre de Derechos
1. Ve a **https://freemusicarchive.org/** o **https://incompetech.com/**
2. Busca canciones infantiles
3. Descarga gratis

### Opción C: Grabar tu Propia Voz
1. Usa la grabadora de tu teléfono
2. Canta las canciones favoritas de Mateo
3. Transfiere el archivo a tu computadora

## Paso 2: Prepara los Archivos

1. **Renombra** los archivos exactamente como se indica:
   - `baby_shark.mp3`
   - `wheels_on_the_bus.mp3`
   - `twinkle_twinkle.mp3`
   - `old_macdonald.mp3`
   - `if_youre_happy.mp3`
   - `head_shoulders.mp3`

2. **Importante**: Los nombres deben ser exactos, sin espacios, todo en minúsculas.

## Paso 3: Sube los Archivos

1. Copia todos los archivos MP3 a la carpeta `music/` de tu proyecto
2. Verifica que estén en: `mi_pagina_web/music/`

## Paso 4: Sube a GitHub

```bash
cd mi_pagina_web
git add music/
git commit -m "Agregar canciones de Mateo"
git push
```

## Paso 5: ¡Listo!

Espera 2-3 minutos y recarga la página. Ahora las canciones deberían sonar.

---

## 🎨 ¿Quieres Cambiar las Canciones?

Si quieres otras canciones diferentes, edita el archivo `script.js`:

1. Busca la sección que dice `const playlistSongs = [`
2. Cambia los títulos, artistas y emojis
3. Asegúrate de que el `audioUrl` coincida con el nombre del archivo en la carpeta `music/`

Ejemplo:
```javascript
{
    title: "La Vaca Lola",
    artist: "Canciones Infantiles",
    emoji: "🐮",
    audioUrl: "music/la_vaca_lola.mp3"
}
```

---

## ❓ Problemas Comunes

**"No se escucha nada"**
- Verifica que los archivos estén en `music/`
- Verifica que los nombres sean exactos
- Verifica que sean archivos MP3 válidos

**"Dice que falta el archivo"**
- El nombre del archivo no coincide con el código
- Revisa mayúsculas/minúsculas y espacios

**"Se escucha cortado"**
- El archivo puede estar corrupto
- Descárgalo de nuevo o usa otro formato
