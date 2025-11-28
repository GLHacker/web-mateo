# 🚀 Mateo Web - Página Oficial

Bienvenido al repositorio de la página web oficial de Mateo. Este proyecto es una aplicación web interactiva diseñada para capturar los momentos especiales, historias y aventuras de la familia, con un enfoque especial en el aprendizaje y la diversión para niños.

## ✨ Características Principales

* **📚 Cuentos Mágicos:** Un lector de historias inmersivo a pantalla completa con efectos 3D, partículas flotantes y desplazamiento de paralaje. Las historias son generadas dinámicamente.
* **🎮 Juegos Educativos:** Una colección de 5 juegos interactivos diseñados para niños de 1 a 3 años, enfocados en formas, colores, números, animales y música. Incluye retroalimentación de voz (Text-to-Speech).
* **📸 Galería Social:** Un feed estilo red social para compartir fotos y momentos, con funcionalidad de "Me gusta" y comentarios en tiempo real.
* **🎨 Diseño Profesional:** Una interfaz moderna y responsiva con un tema oscuro elegante ("Slate"), animaciones suaves y una experiencia de usuario pulida.
* **☁️ Backend en Firebase:** Utiliza Google Firebase (Firestore) para el almacenamiento de datos en tiempo real (historias, posts, comentarios, likes).

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3 (Variables, Flexbox, Grid), JavaScript (ES6+).
* **Librerías:**
  * [Three.js](https://threejs.org/) (Fondo 3D y efectos visuales)
  * [Font Awesome](https://fontawesome.com/) (Iconos)
  * [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) (Efectos de celebración)
  * [Google Fonts](https://fonts.google.com/) (Tipografías: Outfit, Merriweather, Quicksand)
* **Backend:** Google Firebase (Firestore, Auth, Storage).

## 🚀 Instalación y Uso

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/mateo-web.git
    cd mateo-web
    ```

2. **Configuración de Firebase:**
    * Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
    * Habilita **Firestore Database** y **Authentication**.
    * Copia tus credenciales de configuración en `script.js` (variable `firebaseConfig`).

3. **Ejecutar localmente:**
    * Simplemente abre el archivo `index.html` en tu navegador web moderno favorito.
    * *Recomendado:* Usa una extensión como "Live Server" en VS Code para una mejor experiencia de desarrollo.

## 📂 Estructura del Proyecto

```
mateo-web/
├── index.html          # Página principal
├── styles.css          # Estilos globales y componentes
├── script.js           # Lógica principal (Firebase, UI, Cuentos, Galería)
├── games.js            # Lógica de los juegos educativos
├── admin-panel.html    # Panel de administración (protegido)
├── admin-script.js     # Lógica del panel de administración
├── images/             # Recursos de imagen
└── README.md           # Documentación del proyecto
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un "Issue" para discutir cambios mayores antes de enviar un "Pull Request".

## 📄 Licencia

Este proyecto es de uso privado para la Familia Mateo. Todos los derechos reservados.

---
*Desarrollado con ❤️ para Mateo.*
