# 📸 Guía: Cómo Agregar Nuevas Fotos a "El Mundo de Mateo"

¡Hola! Aquí tienes los pasos sencillos para agregar más recuerdos a la página web en el futuro.

## Paso 1: Prepara tu Foto
1.  Elige la foto que quieras subir.
2.  **Cámbiale el nombre** a algo simple, sin espacios ni tildes.
    *   ✅ Bien: `cumpleanos_mateo.jpg`
    *   ❌ Mal: `Foto de WhatsApp 2024-11-26.jpg`

## Paso 2: Sube la Foto
1.  Ve a la carpeta de tu proyecto: `mi_pagina_web/images/`.
2.  Copia y pega tu nueva foto ahí.

## Paso 3: Agrega el Código
1.  Abre el archivo `script.js`.
2.  Busca la sección donde están los datos de las fotos (busca `const galleryData = [`).
3.  Copia el siguiente bloque de código y pégalo al principio de la lista (después de `[`):

```javascript
// Busca la lista "galleryData" en script.js
const galleryData = [
    // ... fotos anteriores ...

    // NUEVA FOTO
    {
        id: 'un_id_unico', // Ej: 'cumple_2025'
        img: 'images/TU_FOTO.jpg',
        title: 'Título Mágico ✨',
        desc: 'Escribe aquí la historia bonita de la foto...'
    },
];
```

## Paso 4: Personaliza
En el código que pegaste, cambia estas 4 cosas:
1.  `id`: Ponle un nombre único (ej: `'cumple_2025'`).
2.  `img`: Pon la ruta de tu foto (ej: `'images/TU_FOTO.jpg'`).
3.  `title`: El título de la foto.
4.  `desc`: La historia o descripción.

## Paso 5: Guarda y Sube
1.  Guarda el archivo `script.js`.
2.  Abre tu terminal y ejecuta:
    ```bash
    git add -A
    git commit -m "Agregando nueva foto"
    git push origin main
    ```
3.  ¡Listo! En unos minutos aparecerá en la web.
