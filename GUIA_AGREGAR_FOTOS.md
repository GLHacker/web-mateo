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
1.  Abre el archivo `index.html` (puedes usar el Bloc de Notas o cualquier editor de texto).
2.  Busca la sección donde están las fotos (busca `<div class="masonry-grid">`).
3.  Copia el siguiente bloque de código y pégalo justo después de `<div class="masonry-grid">` (o donde quieras que aparezca la foto):

```html
<!-- NUEVA FOTO -->
<div class="glass-card" data-aos="zoom-in-up" data-id="PON_UN_ID_UNICO_AQUI">
    <div class="card-image">
        <!-- CAMBIA EL NOMBRE DE LA FOTO AQUÍ ABAJO -->
        <img src="images/TU_FOTO.jpg" alt="Descripción breve">
        <div class="card-overlay">
            <button class="view-btn"><i class="fas fa-expand"></i></button>
        </div>
    </div>
    <div class="card-content">
        <!-- TÍTULO DE LA HISTORIA -->
        <h3>Título Mágico ✨</h3>
        <!-- TU HISTORIA AQUÍ -->
        <p>Escribe aquí la historia bonita de la foto...</p>
        
        <div class="card-actions">
            <!-- CAMBIA EL ID AQUÍ TAMBIÉN (EL MISMO DE ARRIBA) -->
            <button class="action-btn like-btn" data-id="PON_UN_ID_UNICO_AQUI"><i class="far fa-heart"></i> <span class="count">0</span></button>
            <button class="action-btn comment-btn" data-id="PON_UN_ID_UNICO_AQUI"><i class="far fa-comment"></i> <span class="count">0</span></button>
            <button class="action-btn share-btn"><i class="far fa-paper-plane"></i></button>
        </div>
    </div>
</div>
```

## Paso 4: Personaliza
En el código que pegaste, cambia estas 3 cosas:
1.  `PON_UN_ID_UNICO_AQUI`: Ponle un nombre único (ej: `cumple_2025`). **Importante:** Ponlo en los 3 lugares donde aparece.
2.  `images/TU_FOTO.jpg`: Pon el nombre exacto de tu archivo de imagen.
3.  Escribe tu **Título** y tu **Historia**.

## Paso 5: Guarda y Sube
1.  Guarda el archivo `index.html`.
2.  Abre tu terminal y ejecuta:
    ```bash
    git add -A
    git commit -m "Agregando nueva foto"
    git push origin main
    ```
3.  ¡Listo! En unos minutos aparecerá en la web.
