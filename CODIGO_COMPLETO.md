# CÓDIGO COMPLETO DEL PROYECTO
Este archivo contiene todo el código fuente de la página web.

## 1. index.html
```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mateo, Luis & Jennifer | Family Album</title>
    <meta name="description" content="Un viaje mágico por nuestros recuerdos">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,400;1,400&display=swap"
        rel="stylesheet">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Animations (AOS) -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <link rel="stylesheet" href="styles.css">

    <!-- Firebase -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>
</head>

<body>

    <!-- ✨ Canvas de Partículas Interactivas -->
    <!-- Particles Canvas Removed for Clean Design -->

    <!-- Animated Background -->
    <div class="bg-animation">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
    </div>

    <!-- Custom Cursor Trail -->
    <!-- Custom Cursor Trail Removed for Clean Design -->

    <!-- Barra de Progreso de Scroll -->
    <div class="scroll-progress" id="scrollProgress"></div>

    <!-- Navigation -->
    <nav class="glass-nav">
        <div class="logo">
            Familia <span class="highlight">Mateo</span>
            <span class="visitor-counter" id="visitorCounter">
                <i class="fas fa-eye"></i> <span id="visitorCount">0</span> visitas
            </span>
        </div>
        <div class="nav-links">
            <button id="darkModeToggle" class="nav-btn" title="Cambiar tema">
                <i class="fas fa-moon"></i>
            </button>
            <button id="storiesBtn" class="nav-btn highlight-btn"><i class="fas fa-book-open"></i> Cuentos</button>
            <button id="adminPanelBtn" class="nav-btn" onclick="window.open('admin-panel.html', '_blank')"><i
                    class="fas fa-crown"></i> Panel Admin</button>
            <button id="loginBtn" class="nav-btn hidden"><i class="fas fa-lock"></i> Admin</button>
            <button id="logoutBtn" class="nav-btn hidden"><i class="fas fa-sign-out-alt"></i> Salir</button>
            <button id="uploadBtn" class="nav-btn hidden"><i class="fas fa-cloud-upload-alt"></i> Subir</button>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero">
        <div class="hero-content" data-aos="fade-up" data-aos-duration="1500">
            <span class="badge">Bienvenido a nuestro cuento</span>
            <h1>Mateo, Luis <br>& <span class="gradient-text">Jennifer</span></h1>
            <p>Donde cada foto es una página de nuestra historia mágica.</p>
            <div class="scroll-indicator">
                <span>Leer Historia</span>
                <i class="fas fa-chevron-down bounce"></i>
            </div>
        </div>
    </header>

    <!-- Gallery Section -->
    <main class="gallery-section">
        <div class="container">
            <h2 class="section-title" data-aos="fade-right">Capítulos de Vida 📖</h2>

            <!-- Dynamic Gallery Container -->
            <div class="masonry-grid">
                <!-- Content will be loaded by script.js -->
            </div>
        </div>
    </main>

    <!-- ========================================
         🎮 FASE 2: INTERACTIVE SECTIONS
         ======================================== -->

    <!-- Quiz Section -->
    <section class="quiz-section" id="quizSection">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">🎯 ¿Cuánto Conoces a Mateo?</h2>
            <div class="quiz-container" data-aos="zoom-in">
                <div id="quizContent" class="quiz-content">
                    <!-- Quiz will be loaded here -->
                </div>
                <div id="quizResult" class="quiz-result hidden">
                    <h3 id="resultTitle"></h3>
                    <p id="resultMessage"></p>
                    <button class="gradient-btn" onclick="restartQuiz()">Jugar de Nuevo</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Timeline Section -->
    <section class="timeline-section" id="timelineSection">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">⏰ Línea de Tiempo Mágica</h2>
            <div class="timeline" id="timeline">
                <!-- Timeline will be loaded here -->
            </div>
        </div>
    </section>

    <!-- Guestbook Section -->
    <section class="guestbook-section" id="guestbookSection">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">💌 Libro de Visitas</h2>
            <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Deja un mensaje especial para Mateo y su familia
            </p>

            <div class="guestbook-form" data-aos="zoom-in">
                <form id="guestbookForm">
                    <input type="text" id="guestName" placeholder="Tu nombre" required>
                    <textarea id="guestMessage" placeholder="Tu mensaje..." rows="4" required></textarea>
                    <button type="submit" class="gradient-btn">
                        <i class="fas fa-paper-plane"></i> Enviar Mensaje
                    </button>
                </form>
            </div>

            <div class="guestbook-messages" id="guestbookMessages">
                <!-- Messages will be loaded here -->
            </div>
        </div>
    </section>

    <!-- ========================================
         🎬 FASE 3: DYNAMIC CONTENT
         ======================================== -->

    <!-- Mateo Today Section -->
    <section class="mateo-today-section" id="mateoTodaySection">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">🌟 Mateo Hoy</h2>
            <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Lo último de nuestro pequeño héroe
            </p>

            <div class="mateo-today-grid">
                <div class="today-card" data-aos="flip-left">
                    <div class="card-icon">📸</div>
                    <h3>Foto del Día</h3>
                    <div id="photoOfDay" class="photo-of-day">
                        <img src="images/mateo_star.jpg" alt="Mateo Hoy">
                    </div>
                    <p id="photoCaption">¡Brillando como siempre! ⭐</p>
                </div>

                <div class="today-card" data-aos="flip-left" data-aos-delay="100">
                    <div class="card-icon">💬</div>
                    <h3>Frase del Día</h3>
                    <div class="quote-box">
                        <p id="dailyQuote">"¿Por qué estás en MI cuarto?"</p>
                        <span class="quote-author">- Mateo, siendo el rey 👑</span>
                    </div>
                </div>

                <div class="today-card" data-aos="flip-left" data-aos-delay="200">
                    <div class="card-icon">🎮</div>
                    <h3>Actividad Favorita</h3>
                    <div class="activity-box">
                        <p id="favoriteActivity">Conducir su coche rojo a toda velocidad 🏎️</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Fun Facts Section -->
    <section class="fun-facts-section" id="funFactsSection">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">🎉 Datos Curiosos de Mateo</h2>

            <div class="facts-grid">
                <div class="fact-card" data-aos="zoom-in">
                    <div class="fact-icon">🎂</div>
                    <h3>Edad</h3>
                    <p id="mateoAge">Calculando...</p>
                </div>

                <div class="fact-card" data-aos="zoom-in" data-aos-delay="100">
                    <div class="fact-icon">😊</div>
                    <h3>Sonrisas al Día</h3>
                    <p>Infinitas ∞</p>
                </div>

                <div class="fact-card" data-aos="zoom-in" data-aos-delay="200">
                    <div class="fact-icon">❤️</div>
                    <h3>Nivel de Ternura</h3>
                    <p>100/10</p>
                </div>

                <div class="fact-card" data-aos="zoom-in" data-aos-delay="300">
                    <div class="fact-icon">🚗</div>
                    <h3>Coches Favoritos</h3>
                    <p>Rojos y rápidos</p>
                </div>

                <div class="fact-card" data-aos="zoom-in" data-aos-delay="400">
                    <div class="fact-icon">👨‍👩‍👦</div>
                    <h3>Familia</h3>
                    <p>Luis, Jennifer & Mateo</p>
                </div>

                <div class="fact-card" data-aos="zoom-in" data-aos-delay="500">
                    <div class="fact-icon">🌟</div>
                    <h3>Superpoder</h3>
                    <p>Alegrar cualquier día</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Music Section -->
    <section class="music-section" id="musicSection">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">🎵 Playlist de Mateo</h2>
            <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Las canciones que le encantan
            </p>

            <div class="playlist-container" data-aos="zoom-in">
                <div class="playlist-header">
                    <i class="fab fa-spotify"></i>
                    <h3>Canciones Favoritas</h3>
                </div>
                <div class="playlist-items" id="playlistItems">
                    <!-- Playlist will be loaded here -->
                </div>
                <a href="https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC" target="_blank" class="gradient-btn">
                    <i class="fab fa-spotify"></i> Abrir en Spotify
                </a>
            </div>
        </div>
    </section>

    <!-- ========================================
         ✨ NUEVAS FUNCIONALIDADES PREMIUM
         ======================================== -->

    <!-- Dashboard de Estadísticas -->
    <section class="stats-dashboard-section" id="statsDashboard">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">📊 Dashboard de Mateo</h2>
            <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Estadísticas mágicas en tiempo real
            </p>

            <div class="stats-grid">
                <div class="stat-card" data-aos="flip-up">
                    <div class="stat-icon">📅</div>
                    <div class="stat-value" id="daysAlive">0</div>
                    <div class="stat-label">Días de Vida</div>
                    <div class="stat-progress">
                        <div class="stat-progress-bar" style="width: 100%"></div>
                    </div>
                </div>

                <div class="stat-card" data-aos="flip-up" data-aos-delay="100">
                    <div class="stat-icon">⏰</div>
                    <div class="stat-value" id="hoursAlive">0</div>
                    <div class="stat-label">Horas de Aventuras</div>
                    <div class="stat-progress">
                        <div class="stat-progress-bar" style="width: 85%"></div>
                    </div>
                </div>

                <div class="stat-card" data-aos="flip-up" data-aos-delay="200">
                    <div class="stat-icon">😊</div>
                    <div class="stat-value">∞</div>
                    <div class="stat-label">Sonrisas Dadas</div>
                    <div class="stat-progress">
                        <div class="stat-progress-bar" style="width: 100%"></div>
                    </div>
                </div>

                <div class="stat-card" data-aos="flip-up" data-aos-delay="300">
                    <div class="stat-icon">🚶</div>
                    <div class="stat-value" id="stepsEstimate">5,000+</div>
                    <div class="stat-label">Pasos Dados</div>
                    <div class="stat-progress">
                        <div class="stat-progress-bar" style="width: 70%"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Medidor de Crecimiento -->
    <section class="growth-meter-section" id="growthMeter">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">📏 Medidor de Crecimiento</h2>
            <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                ¡Mira cómo crece nuestro pequeño gigante!
            </p>

            <div class="growth-container" data-aos="zoom-in">
                <div class="growth-ruler">
                    <div class="ruler-marks">
                        <div class="ruler-mark" style="bottom: 0%"><span>0 cm</span></div>
                        <div class="ruler-mark" style="bottom: 25%"><span>25 cm</span></div>
                        <div class="ruler-mark" style="bottom: 50%"><span>50 cm</span></div>
                        <div class="ruler-mark" style="bottom: 75%"><span>75 cm</span></div>
                        <div class="ruler-mark" style="bottom: 100%"><span>100 cm</span></div>
                    </div>
                    <div class="growth-indicator" id="growthIndicator">
                        <div class="growth-marker">
                            <span class="growth-value" id="heightValue">85 cm</span>
                            <div class="growth-emoji">👶</div>
                        </div>
                    </div>
                </div>

                <div class="growth-stats">
                    <div class="growth-stat-item">
                        <div class="growth-stat-icon">📐</div>
                        <div class="growth-stat-info">
                            <h4>Altura Actual</h4>
                            <p id="currentHeight">85 cm</p>
                        </div>
                    </div>
                    <div class="growth-stat-item">
                        <div class="growth-stat-icon">⚖️</div>
                        <div class="growth-stat-info">
                            <h4>Peso Actual</h4>
                            <p id="currentWeight">12 kg</p>
                        </div>
                    </div>
                    <div class="growth-stat-item">
                        <div class="growth-stat-icon">🎯</div>
                        <div class="growth-stat-info">
                            <h4>Comparación</h4>
                            <p id="heightComparison">¡Tan alto como 6 pelotas! ⚽</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Sistema de Logros -->
    <section class="achievements-section" id="achievements">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">🏆 Logros Desbloqueados</h2>
            <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Cada día es una nueva victoria
            </p>

            <div class="achievements-grid" id="achievementsGrid">
                <!-- Achievements will be loaded here -->
            </div>
        </div>
    </section>

    <!-- Calendario de Hitos -->
    <section class="milestones-section" id="milestones">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">📅 Calendario de Hitos</h2>
            <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Momentos especiales que nunca olvidaremos
            </p>

            <div class="calendar-container" data-aos="zoom-in">
                <div class="calendar-header">
                    <button class="calendar-nav" id="prevMonth">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <h3 id="calendarMonth">2024</h3>
                    <button class="calendar-nav" id="nextMonth">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="calendar-grid" id="calendarGrid">
                    <!-- Calendar will be loaded here -->
                </div>
            </div>

            <div class="milestones-list" id="milestonesList">
                <!-- Milestones will be loaded here -->
            </div>
        </div>
    </section>

    <!-- Selector de Temas -->
    <section class="theme-selector-section" id="themeSelector">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">🌈 Personaliza tu Experiencia</h2>
            <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Elige el tema que más te guste
            </p>

            <div class="themes-grid">
                <div class="theme-card" data-theme="default" data-aos="zoom-in">
                    <div class="theme-preview theme-default"></div>
                    <h4>Galaxia Mágica</h4>
                    <p>Tema original con colores vibrantes</p>
                </div>

                <div class="theme-card" data-theme="ocean" data-aos="zoom-in" data-aos-delay="100">
                    <div class="theme-preview theme-ocean"></div>
                    <h4>Océano Profundo</h4>
                    <p>Azules relajantes del mar</p>
                </div>

                <div class="theme-card" data-theme="sunset" data-aos="zoom-in" data-aos-delay="200">
                    <div class="theme-preview theme-sunset"></div>
                    <h4>Atardecer Dorado</h4>
                    <p>Cálidos tonos del atardecer</p>
                </div>

                <div class="theme-card" data-theme="forest" data-aos="zoom-in" data-aos-delay="300">
                    <div class="theme-preview theme-forest"></div>
                    <h4>Bosque Encantado</h4>
                    <p>Verdes naturales y frescos</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Comparador de Fotos -->
    <section class="photo-compare-section" id="photoCompare">
        <div class="container">
            <h2 class="section-title" data-aos="fade-up">📸 Antes & Después</h2>
            <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Desliza para ver cómo ha crecido Mateo
            </p>

            <div class="compare-container" data-aos="zoom-in">
                <div class="compare-slider">
                    <div class="compare-image before">
                        <img src="images/img3.jpg" alt="Mateo Antes">
                        <div class="compare-label">Antes</div>
                    </div>
                    <div class="compare-image after">
                        <img src="images/mateo_star.jpg" alt="Mateo Ahora">
                        <div class="compare-label">Ahora</div>
                    </div>
                    <div class="compare-divider" id="compareDivider">
                        <div class="compare-handle">
                            <i class="fas fa-arrows-alt-h"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <!-- Modals (Glassmorphism Style) -->

    <!-- Stories Modal -->
    <div id="storiesModal" class="modal-backdrop">
        <div class="glass-modal full-screen">
            <button class="close-modal">&times;</button> <!-- JS handles this now -->
            <div id="storiesContainer" class="stories-container">
                <!-- Stories will be loaded here -->
            </div>

            <!-- New Explicit Back Button -->
            <button id="backToMenuBtn" class="floating-back-btn">
                <i class="fas fa-arrow-left"></i> Volver al Menú
            </button>

            <div class="story-controls">
                <span>Toca para leer el siguiente cuento...</span>
            </div>
        </div>
    </div>

    <!-- Lightbox/Comment Modal -->
    <div id="postModal" class="modal-backdrop">
        <div class="glass-modal">
            <button class="close-modal">&times;</button>
            <div class="modal-layout">
                <div class="modal-media">
                    <img id="modalImg" src="" alt="">
                </div>
                <div class="modal-interactions">
                    <div class="modal-header">
                        <div class="avatar">F</div>
                        <span>Familia Mateo</span>
                    </div>
                    <div class="comments-container" id="modalComments">
                        <!-- Comments will load here -->
                    </div>
                    <div class="modal-footer">
                        <div class="action-row">
                            <button id="modalLikeBtn" class="action-icon"><i class="far fa-heart"></i></button>
                            <button class="action-icon"><i class="far fa-comment"></i></button>
                            <button class="action-icon"><i class="far fa-paper-plane"></i></button>
                        </div>
                        <div class="likes-info"><span id="modalLikes">0</span> Me gusta</div>
                        <form id="commentForm" class="comment-input-area">
                            <input type="text" id="commentName" placeholder="Tu nombre" required>
                            <input type="text" id="commentText" placeholder="Agrega un comentario..." required>
                            <button type="submit">Publicar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Auth Modals -->
    <div id="loginModal" class="modal-backdrop">
        <div class="glass-modal small">
            <button class="close-simple-modal">&times;</button>
            <h2>Admin Access</h2>
            <form id="loginForm">
                <input type="email" id="email" placeholder="Email" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit" class="gradient-btn">Entrar</button>
            </form>
        </div>
    </div>

    <div id="uploadModal" class="modal-backdrop">
        <div class="glass-modal small">
            <button class="close-simple-modal">&times;</button>
            <h2>Subir Recuerdo</h2>
            <form id="uploadForm">
                <input type="file" id="photoFile" required>
                <input type="text" id="photoCaption" placeholder="Título o historia...">
                <button type="submit" class="gradient-btn">Subir</button>
            </form>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

    <!-- Confetti Library -->
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

    <!-- Scripts de Efectos Visuales (Desactivados para diseño limpio) -->
    <!-- <script src="particles.js"></script> -->
    <!-- <script src="effects.js"></script> -->
    <!-- <script src="premium-3d.js"></script> -->

    <!-- Custom Script -->
    <script src="script.js"></script>
</body>

</html>```

## 2. styles.css
```css
:root {
    /* Warm & Elegant Palette */
    --bg: #fdfbf7;
    --text: #2d3748;
    --text-muted: #718096;
    --primary: #ed8936;
    /* Orange */
    --secondary: #4fd1c5;
    /* Teal */
    --accent: #f687b3;
    /* Pink */
    --card-bg: #ffffff;
    --card-border: #edf2f7;
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --gradient: linear-gradient(135deg, #f6ad55 0%, #f687b3 100%);
    --cursor-color: #ed8936;
    --nav-bg: rgba(255, 255, 255, 0.9);
}

body.dark-mode {
    --bg: #1a202c;
    --text: #f7fafc;
    --text-muted: #a0aec0;
    --card-bg: #2d3748;
    --card-border: #4a5568;
    --nav-bg: rgba(26, 32, 44, 0.9);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    line-height: 1.6;
    transition: background 0.3s ease, color 0.3s ease;
}

/* Typography */
h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: 'Playfair Display', serif;
    color: var(--text);
    line-height: 1.2;
}

.section-title {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 1rem;
    color: var(--text);
}

.section-subtitle {
    text-align: center;
    color: var(--text-muted);
    font-size: 1.2rem;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* Background Animation (Subtle) */
.bg-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(240, 240, 240, 0.5) 100%);
}

.blob {
    position: absolute;
    filter: blur(80px);
    opacity: 0.4;
    border-radius: 50%;
    animation: float 20s infinite ease-in-out;
}

.blob-1 {
    top: -10%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: #f6ad55;
}

.blob-2 {
    bottom: -10%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: #f687b3;
}

.blob-3 {
    top: 40%;
    left: 40%;
    width: 400px;
    height: 400px;
    background: #4fd1c5;
}

@keyframes float {

    0%,
    100% {
        transform: translate(0, 0);
    }

    33% {
        transform: translate(30px, -50px);
    }

    66% {
        transform: translate(-20px, 20px);
    }
}

/* Navigation */
.glass-nav {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 1rem 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--nav-bg);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--card-border);
    z-index: 1000;
    box-shadow: var(--shadow-sm);
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
}

.highlight {
    color: var(--primary);
}

.nav-links {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.nav-btn {
    background: transparent;
    border: 1px solid var(--card-border);
    color: var(--text);
    padding: 0.5rem 1.2rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Outfit', sans-serif;
    font-weight: 500;
}

.nav-btn:hover {
    background: var(--card-border);
    transform: translateY(-2px);
}

.highlight-btn {
    background: var(--gradient);
    color: white !important;
    border: none;
    box-shadow: var(--shadow-md);
}

.highlight-btn:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 20px;
    position: relative;
}

.hero-content h1 {
    font-size: 4.5rem;
    margin: 1.5rem 0;
    color: var(--text);
}

.gradient-text {
    background: var(--gradient);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.badge {
    background: rgba(237, 137, 54, 0.1);
    color: var(--primary);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 600;
}

.hero-content p {
    font-size: 1.25rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto 3rem;
}

.scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
    animation: bounce 2s infinite;
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translate(-50%, 0);
    }

    40% {
        transform: translate(-50%, -10px);
    }

    60% {
        transform: translate(-50%, -5px);
    }
}

/* Gallery Section */
.gallery-section {
    padding: 5rem 5%;
}

.masonry-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.glass-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
}

.glass-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.card-image {
    height: 250px;
    overflow: hidden;
    position: relative;
}

.card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.glass-card:hover .card-image img {
    transform: scale(1.05);
}

.card-content {
    padding: 1.5rem;
}

.card-content h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--text);
}

.card-content p {
    color: var(--text-muted);
    font-size: 0.95rem;
    margin-bottom: 1rem;
}

.card-actions {
    display: flex;
    gap: 1rem;
    border-top: 1px solid var(--card-border);
    padding-top: 1rem;
}

.action-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    transition: color 0.2s;
}

.action-btn:hover,
.action-btn.liked {
    color: var(--accent);
}

/* Interactive Sections (Quiz, Timeline, etc) */
section {
    padding: 5rem 5%;
}

.quiz-container,
.guestbook-form,
.playlist-container,
.growth-container,
.calendar-container {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--shadow-md);
    max-width: 800px;
    margin: 0 auto;
}

/* Timeline */
.timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: var(--card-border);
}

.timeline-item {
    margin-bottom: 3rem;
    position: relative;
    width: 50%;
}

.timeline-item:nth-child(odd) {
    left: 0;
    padding-right: 2rem;
    text-align: right;
}

.timeline-item:nth-child(even) {
    left: 50%;
    padding-left: 2rem;
}

.timeline-content {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--card-border);
}

/* Stats Dashboard */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.stat-card {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--card-border);
}

.stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
    margin: 0.5rem 0;
}

/* Modals */
.modal-backdrop {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 2000;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.modal-backdrop.active {
    display: flex !important;
}

.glass-modal {
    background: var(--card-bg);
    border-radius: 20px;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    position: relative;
}

.glass-modal.full-screen {
    max-width: none;
    height: 100%;
    border-radius: 0;
}

.close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.1);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
}

.modal-layout {
    display: flex;
    height: 100%;
}

.modal-media {
    flex: 1.5;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-media img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.modal-interactions {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--card-bg);
    border-left: 1px solid var(--card-border);
}

.comments-container {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
}

.comment-item {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--card-border);
}

.comment-author {
    font-weight: 600;
    color: var(--primary);
}

.modal-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--card-border);
}

/* Forms */
input,
textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    background: var(--bg);
    color: var(--text);
    margin-bottom: 1rem;
    font-family: inherit;
}

button[type="submit"],
.gradient-btn {
    background: var(--gradient);
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
    width: 100%;
}

button[type="submit"]:hover,
.gradient-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

/* Utilities */
.hidden {
    display: none !important;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-content h1 {
        font-size: 3rem;
    }

    .modal-layout {
        flex-direction: column;
    }

    .modal-media {
        height: 40vh;
    }

    .timeline::before {
        left: 20px;
    }

    .timeline-item {
        width: 100%;
        left: 0 !important;
        padding-left: 50px !important;
        text-align: left !important;
    }

    .timeline-item::before {
        left: 11px;
    }
}```

## 3. script.js
```javascript
// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDesr25T22dRcgQ_mckKnj-OlRs5rXZShw",
    authDomain: "web-mateo.firebaseapp.com",
    projectId: "web-mateo",
    storageBucket: "web-mateo.firebasestorage.app",
    messagingSenderId: "1091095734859",
    appId: "1:1091095734859:web:8b8e5f6a3c4d2e1f9a8b7c"
};

// Initialize Firebase
let app, auth, db, storage;

try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    console.log("Firebase initialized");
} catch (e) {
    console.error("Firebase init error:", e);
}

// Initialize AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-out-cubic'
    });
}

// ========================================
// 🌟 PREMIUM FEATURES
// ========================================

// --- Custom Cursor Trail ---
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    if (cursorTrail) {
        cursorTrail.style.left = cursorX + 'px';
        cursorTrail.style.top = cursorY + 'px';
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// --- Dark Mode Toggle ---
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');

        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Celebration effect
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.1 }
        });
    });
}

// --- Visitor Counter ---
const visitorCountElement = document.getElementById('visitorCount');

function initVisitorCounter() {
    if (!db) return;

    const counterRef = db.collection('stats').doc('visitors');

    // Increment on page load
    counterRef.get().then(doc => {
        const currentCount = doc.exists ? (doc.data().count || 0) : 0;
        counterRef.set({ count: currentCount + 1 });
    });

    // Listen to changes
    counterRef.onSnapshot(doc => {
        if (doc.exists && visitorCountElement) {
            const count = doc.data().count || 0;
            animateCounter(visitorCountElement, count);
        }
    });
}

function animateCounter(element, target) {
    const current = parseInt(element.textContent) || 0;
    const increment = Math.ceil((target - current) / 20);

    if (current < target) {
        element.textContent = current + increment;
        setTimeout(() => animateCounter(element, target), 50);
    } else {
        element.textContent = target;
    }
}

// Initialize counter when Firebase is ready
if (db) {
    initVisitorCounter();
}



// --- Confetti on Like ---
function celebrateLike(element) {
    const rect = element.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#f6ad55', '#f687b3', '#4fd1c5']
    });
}

// ========================================
// 🎮 FASE 2: INTERACTIVE FEATURES
// ========================================

// --- Quiz Data ---
const quizData = [
    {
        question: "¿Cuál es el juguete favorito de Mateo?",
        options: ["Pelota", "Coche rojo", "Muñeco de Elmo", "Bloques"],
        correct: 2,
        emoji: "🧸"
    },
    {
        question: "¿Con quién le encanta hacer videollamadas?",
        options: ["Sus amigos", "Su familia", "Sus primos", "Nadie"],
        correct: 1,
        emoji: "📱"
    },
    {
        question: "¿Qué le gusta hacer más?",
        options: ["Dormir", "Jugar", "Comer", "Llorar"],
        correct: 1,
        emoji: "🎮"
    },
    {
        question: "¿Cuántas generaciones aparecen en las fotos?",
        options: ["Una", "Dos", "Tres", "Cuatro"],
        correct: 2,
        emoji: "👨‍👩‍👦"
    },
    {
        question: "¿Qué representa mejor a Mateo?",
        options: ["Tristeza", "Alegría", "Enojo", "Sueño"],
        correct: 1,
        emoji: "😊"
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    const quizContent = document.getElementById('quizContent');
    if (!quizContent || currentQuestion >= quizData.length) {
        showQuizResult();
        return;
    }

    const q = quizData[currentQuestion];
    quizContent.innerHTML = `
        <div class="quiz-question">${q.emoji} ${q.question}</div>
        <div class="quiz-options">
            ${q.options.map((option, index) => `
                <div class="quiz-option" onclick="checkAnswer(${index})">
                    ${option}
                </div>
            `).join('')}
        </div>
        <div class="quiz-progress">Pregunta ${currentQuestion + 1} de ${quizData.length}</div>
    `;
}

function checkAnswer(selected) {
    const q = quizData[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');

    options.forEach((opt, index) => {
        opt.style.pointerEvents = 'none';
        if (index === q.correct) {
            opt.classList.add('correct');
        } else if (index === selected) {
            opt.classList.add('wrong');
        }
    });

    if (selected === q.correct) {
        score++;
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
        });
    }

    setTimeout(() => {
        currentQuestion++;
        loadQuiz();
    }, 1500);
}

function showQuizResult() {
    const quizContent = document.getElementById('quizContent');
    const quizResult = document.getElementById('quizResult');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');

    quizContent.classList.add('hidden');
    quizResult.classList.remove('hidden');

    const percentage = (score / quizData.length) * 100;

    if (percentage === 100) {
        resultTitle.textContent = '🏆 ¡PERFECTO!';
        resultMessage.textContent = `¡Conoces a Mateo mejor que nadie! ${score}/${quizData.length} correctas`;
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });
    } else if (percentage >= 60) {
        resultTitle.textContent = '🌟 ¡Muy Bien!';
        resultMessage.textContent = `¡Conoces bastante a Mateo! ${score}/${quizData.length} correctas`;
    } else {
        resultTitle.textContent = '💪 ¡Sigue Intentando!';
        resultMessage.textContent = `Aún puedes aprender más sobre Mateo. ${score}/${quizData.length} correctas`;
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizContent').classList.remove('hidden');
    document.getElementById('quizResult').classList.add('hidden');
    loadQuiz();
}

// Initialize Quiz
document.addEventListener('DOMContentLoaded', () => {
    loadQuiz();
    loadTimeline();
    loadGuestbook();
});

// --- Timeline Data ---
const timelineData = [
    { date: '2023', icon: '🎂', title: 'Nace Mateo', desc: 'El día que cambió nuestras vidas para siempre. Una estrella brilló más fuerte ese día.' },
    { date: '2024', icon: '👶', title: 'Primeros Pasos', desc: 'Mateo comenzó a explorar el mundo con sus propios pies, conquistando cada rincón de la casa.' },
    { date: '2024', icon: '🚗', title: 'Primer Coche', desc: 'Su amor por los coches comenzó. Ahora es el piloto más rápido de la familia.' },
    { date: '2024', icon: '❤️', title: 'Amor Familiar', desc: 'Cada día nos enseña el verdadero significado del amor incondicional.' },
    { date: '2025', icon: '🌟', title: 'Futuro Brillante', desc: 'Las aventuras apenas comienzan. El mundo está esperando a este pequeño héroe.' }
];

function loadTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    timeline.innerHTML = timelineData.map((item, index) => `
        <div class="timeline-item" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-icon">${item.icon}</div>
        </div>
    `).join('');
}

// --- Guestbook ---
const guestbookForm = document.getElementById('guestbookForm');

if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!db) return alert('Conecta Firebase');

        const name = document.getElementById('guestName').value;
        const message = document.getElementById('guestMessage').value;

        db.collection('guestbook').add({
            name: name,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            guestbookForm.reset();
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        });
    });
}

function loadGuestbook() {
    if (!db) return;

    const messagesContainer = document.getElementById('guestbookMessages');
    if (!messagesContainer) return;

    db.collection('guestbook')
        .orderBy('timestamp', 'desc')
        .limit(20)
        .onSnapshot(snapshot => {
            messagesContainer.innerHTML = '';

            snapshot.forEach(doc => {
                const data = doc.data();
                const messageEl = document.createElement('div');
                messageEl.className = 'guestbook-message';

                const initial = data.name.charAt(0).toUpperCase();
                const date = data.timestamp ? data.timestamp.toDate().toLocaleDateString('es-ES') : 'Hoy';

                messageEl.innerHTML = `
                    <div class="message-header">
                        <div class="message-avatar">${initial}</div>
                        <div class="message-info">
                            <h4>${data.name}</h4>
                            <div class="message-date">${date}</div>
                        </div>
                    </div>
                    <div class="message-text">${data.message}</div>
                `;

                messagesContainer.appendChild(messageEl);
            });
        });
}

// ========================================
// 🎬 FASE 3: DYNAMIC CONTENT
// ========================================

// --- Mateo's Age Calculator ---
function calculateAge() {
    const birthDate = new Date('2024-01-15'); // Mateo tiene 1 año
    const today = new Date();

    const months = (today.getFullYear() - birthDate.getFullYear()) * 12 +
        (today.getMonth() - birthDate.getMonth());
    const days = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    let ageText = '';
    if (years > 0) {
        ageText = `${years} año${years > 1 ? 's' : ''} y ${remainingMonths} mes${remainingMonths !== 1 ? 'es' : ''}`;
    } else {
        ageText = `${months} mes${months !== 1 ? 'es' : ''}`;
    }

    const ageElement = document.getElementById('mateoAge');
    if (ageElement) {
        ageElement.textContent = ageText;
    }
}

// --- Daily Quotes Rotation ---
const dailyQuotes = [
    { quote: "¿Por qué estás en MI cuarto?", author: "Mateo, siendo el rey 👑" },
    { quote: "¡Vroom vroom!", author: "Mateo, piloto profesional 🏎️" },
    { quote: "*Risas contagiosas*", author: "Mateo, experto en felicidad 😊" },
    { quote: "¡Mira abuelo!", author: "Mateo, amando a la familia 👴" },
    { quote: "¡Más cuentos!", author: "Mateo, el lector 📚" }
];

function loadDailyQuote() {
    const today = new Date().getDate();
    const quoteIndex = today % dailyQuotes.length;
    const selectedQuote = dailyQuotes[quoteIndex];

    const quoteElement = document.getElementById('dailyQuote');
    const authorElement = document.querySelector('.quote-author');

    if (quoteElement && authorElement) {
        quoteElement.textContent = `"${selectedQuote.quote}"`;
        authorElement.textContent = `- ${selectedQuote.author}`;
    }
}

// --- Playlist Data with LOCAL Audio Files ---
const playlistSongs = [
    {
        title: "Baby Shark",
        artist: "Pinkfong",
        emoji: "🦈",
        audioUrl: "music/baby_shark.mp3"
    },
    {
        title: "Wheels on the Bus",
        artist: "Cocomelon",
        emoji: "🚌",
        audioUrl: "music/wheels_on_the_bus.mp3"
    },
    {
        title: "Twinkle Twinkle Little Star",
        artist: "Super Simple Songs",
        emoji: "⭐",
        audioUrl: "music/twinkle_twinkle.mp3"
    },
    {
        title: "Old MacDonald",
        artist: "Cocomelon",
        emoji: "🐄",
        audioUrl: "music/old_macdonald.mp3"
    },
    {
        title: "If You're Happy",
        artist: "Super Simple Songs",
        emoji: "😊",
        audioUrl: "music/if_youre_happy.mp3"
    },
    {
        title: "Head Shoulders Knees",
        artist: "Super Simple Songs",
        emoji: "🎵",
        audioUrl: "music/head_shoulders.mp3"
    }
];

let currentAudio = null;
let currentSongIndex = -1;
let audioContext = null;
let analyser = null;
let animationId = null;

async function loadPlaylist() {
    const playlistContainer = document.getElementById('playlistItems');
    if (!playlistContainer) return;

    let allSongs = [...playlistSongs];

    if (db) {
        try {
            const snapshot = await db.collection('music').orderBy('timestamp', 'desc').get();
            const firebaseSongs = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                firebaseSongs.push({
                    title: data.title,
                    artist: "Familia Mateo", // Default artist for uploaded songs
                    emoji: data.emoji || "🎵",
                    audioUrl: data.url
                });
            });
            allSongs = [...firebaseSongs, ...allSongs];
        } catch (error) {
            console.error("Error loading music from Firebase:", error);
        }
    }

    // Update global playlistSongs for the player to use
    // We need to modify the global variable or the player won't see new songs
    // Since playlistSongs is const, we can't reassign it. 
    // BUT, we can push to it if we clear it first, or better, change the player to use a dynamic list.
    // For now, let's just update the UI and rely on a new global variable if needed, 
    // OR, since playlistSongs is const, we can't change it. 
    // Let's change the player logic to use `currentPlaylist` instead of `playlistSongs`.

    // Hack: Modify the array in place
    playlistSongs.length = 0;
    allSongs.forEach(s => playlistSongs.push(s));

    playlistContainer.innerHTML = playlistSongs.map((song, index) => `
        <div class="playlist-item" data-aos="fade-right" data-aos-delay="${index * 50}">
            <div class="song-emoji">${song.emoji}</div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <button class="play-btn" onclick="playSong(${index})" id="playBtn${index}">
                <i class="fas fa-play"></i>
            </button>
        </div>
    `).join('');
}

function playSong(index) {
    const song = playlistSongs[index];

    // If same song, toggle play/pause
    if (currentSongIndex === index && currentAudio) {
        const btn = document.getElementById(`playBtn${index}`);
        if (currentAudio.paused) {
            // Resume audio context (required by browsers)
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }
            currentAudio.play().catch(e => console.log('Play error:', e));
            btn.innerHTML = '<i class="fas fa-pause"></i>';
            btn.classList.add('playing');
            startVisualizer();
        } else {
            currentAudio.pause();
            btn.innerHTML = '<i class="fas fa-play"></i>';
            btn.classList.remove('playing');
            stopVisualizer();
        }
        return;
    }

    // Stop current audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        stopVisualizer();
    }

    // Reset all buttons
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.innerHTML = '<i class="fas fa-play"></i>';
        btn.classList.remove('playing');
    });

    // Create new audio with CORS settings
    currentAudio = new Audio();
    currentAudio.crossOrigin = "anonymous";
    currentAudio.src = song.audioUrl;
    currentAudio.volume = 0.7; // Set volume to 70%
    currentSongIndex = index;

    // Create or update player
    let playerContainer = document.getElementById('musicPlayer');
    if (!playerContainer) {
        playerContainer = document.createElement('div');
        playerContainer.id = 'musicPlayer';
        playerContainer.className = 'music-player-container';
        document.body.appendChild(playerContainer);
    }

    playerContainer.innerHTML = `
        <div class="player-header">
            <div class="now-playing">
                <span class="pulse-dot"></span>
                ${song.emoji} ${song.title}
            </div>
            <button class="close-player" onclick="closePlayer()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <canvas id="visualizer" width="360" height="100"></canvas>
        <div class="player-controls">
            <button class="control-btn" onclick="previousSong()">
                <i class="fas fa-backward"></i>
            </button>
            <button class="control-btn play-pause-btn" onclick="togglePlay()" id="mainPlayBtn">
                <i class="fas fa-pause"></i>
            </button>
            <button class="control-btn" onclick="nextSong()">
                <i class="fas fa-forward"></i>
            </button>
        </div>
        <div class="progress-container">
            <span id="currentTime">0:00</span>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <span id="duration">0:00</span>
        </div>
        <div class="volume-control">
            <i class="fas fa-volume-up"></i>
            <input type="range" id="volumeSlider" min="0" max="100" value="70">
        </div>
    `;

    playerContainer.style.display = 'block';

    // Volume control
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.addEventListener('input', (e) => {
        if (currentAudio) {
            currentAudio.volume = e.target.value / 100;
        }
    });

    // Update button
    const btn = document.getElementById(`playBtn${index}`);
    btn.innerHTML = '<i class="fas fa-pause"></i>';
    btn.classList.add('playing');

    // Setup audio events
    currentAudio.addEventListener('loadedmetadata', () => {
        document.getElementById('duration').textContent = formatTime(currentAudio.duration);
    });

    currentAudio.addEventListener('timeupdate', () => {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
        document.getElementById('currentTime').textContent = formatTime(currentAudio.currentTime);
    });

    currentAudio.addEventListener('ended', () => {
        nextSong();
    });

    currentAudio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        const errorMsg = `No se pudo cargar "${song.title}". 
        
Por favor, agrega el archivo de audio en la carpeta "music/" con el nombre correcto.`;
        alert(errorMsg);
        closePlayer();
    });

    // Play audio
    currentAudio.play().then(() => {
        setupVisualizer();
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f6ad55', '#f687b3', '#4fd1c5']
        });
    }).catch(e => {
        console.log('Autoplay prevented:', e);
        alert('Toca el botón de play para iniciar la música');
    });
}

function setupVisualizer() {
    const canvas = document.getElementById('visualizer');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
    }

    const source = audioContext.createMediaElementSource(currentAudio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    startVisualizer();
}

function startVisualizer() {
    const canvas = document.getElementById('visualizer');
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        animationId = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgba(15, 15, 30, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * canvas.height;

            const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
            gradient.addColorStop(0, '#f6ad55');
            gradient.addColorStop(0.5, '#f687b3');
            gradient.addColorStop(1, '#4fd1c5');

            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    draw();
}

function stopVisualizer() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

function togglePlay() {
    if (!currentAudio) return;

    const btn = document.getElementById('mainPlayBtn');
    const playlistBtn = document.getElementById(`playBtn${currentSongIndex}`);

    if (currentAudio.paused) {
        currentAudio.play();
        btn.innerHTML = '<i class="fas fa-pause"></i>';
        if (playlistBtn) playlistBtn.innerHTML = '<i class="fas fa-pause"></i>';
        startVisualizer();
    } else {
        currentAudio.pause();
        btn.innerHTML = '<i class="fas fa-play"></i>';
        if (playlistBtn) playlistBtn.innerHTML = '<i class="fas fa-play"></i>';
        stopVisualizer();
    }
}

function nextSong() {
    const nextIndex = (currentSongIndex + 1) % playlistSongs.length;
    playSong(nextIndex);
}

function previousSong() {
    const prevIndex = currentSongIndex === 0 ? playlistSongs.length - 1 : currentSongIndex - 1;
    playSong(prevIndex);
}

function closePlayer() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    stopVisualizer();

    const playerContainer = document.getElementById('musicPlayer');
    if (playerContainer) {
        playerContainer.style.display = 'none';
    }

    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.innerHTML = '<i class="fas fa-play"></i>';
        btn.classList.remove('playing');
    });

    currentSongIndex = -1;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Initialize FASE 3 features
document.addEventListener('DOMContentLoaded', () => {
    calculateAge();
    loadDailyQuote();
    loadPlaylist();

    // Update age every day
    setInterval(calculateAge, 1000 * 60 * 60 * 24);
});

// --- Data: Gallery ---
const galleryData = [
    // NEW PHOTOS - Batch 4
    {
        id: 'mateo_bed',
        img: 'images/mateo_bed.jpg',
        title: 'El Dueño del Reino 👑',
        desc: 'Con una actitud de rey, Mateo se adueña de cada espacio. "¿Por qué estás en MI cuarto?" dice su mirada traviesa. Porque cuando eres tan adorable, todo el mundo es tuyo.'
    },
    {
        id: 'mateo_star',
        img: 'images/mateo_star.jpg',
        title: 'Eres una Estrella, Hijo ⭐',
        desc: 'Con su chaqueta verde y esa sonrisa que ilumina todo, Mateo nos recuerda que no necesitas un escenario para brillar. Cada paso que da es un show de talento puro.'
    },
    // Previous photos
    { id: 'family_studio', img: 'images/family_studio.jpg', title: 'Retrato de un Amor Eterno 🤍', desc: 'Una imagen que captura la esencia de nuestra unidad. En cada mirada se refleja la promesa de estar siempre juntos, construyendo un futuro lleno de luz y armonía.' },
    { id: 'three_generations', img: 'images/three_generations.jpg', title: 'Raíces y Alas 🌳', desc: 'Abuelo, padre e hijo. El pasado que nos sostiene, el presente que construimos y el futuro que soñamos. La fortaleza de la sangre en una sola imagen.' },
    { id: 'laughing_bed', img: 'images/laughing_bed.jpg', title: 'La Melodía de la Felicidad 🎶', desc: 'No existe sonido más puro que su carcajada espontánea. Es la música que llena nuestro hogar y nos recuerda que la felicidad está en los momentos más simples.' },
    { id: 'videocall_yellow', img: 'images/videocall_yellow.jpg', title: 'Distancia Cero 💫', desc: 'La tecnología se vuelve cálida cuando hay amor del otro lado. Sus ojos curiosos traspasan la pantalla, haciéndonos sentir que estamos en la misma habitación.' },
    { id: 'videocall_party', img: 'images/videocall_party.jpg', title: 'Fiesta en el Corazón 🎉', desc: 'Con su energía inagotable, Mateo nos enseña que la vida es una celebración constante. Cada día es una oportunidad para sonreír y bailar.' },
    { id: 'grandpa', img: 'images/grandpa.jpg', title: 'El Legado del Amor 👴👶', desc: 'Tres generaciones unidas por un mismo hilo invisible. En los brazos del abuelo, Mateo descubre que el amor es un tesoro que se hereda y crece con el tiempo.' },
    { id: 'videocall_smile', img: 'images/videocall_smile.jpg', title: 'Cerca del Corazón 📱', desc: 'Aunque haya kilómetros de distancia, una sonrisa suya rompe cualquier barrera. La tecnología nos une, pero es su alegría la que nos mantiene cerca.' },
    { id: 'videocall_dad', img: 'images/videocall_dad.jpg', title: 'Siempre Contigo ❤️', desc: 'No importa la pantalla, la conexión entre padre e hijo traspasa cualquier cristal. Un vínculo que no conoce de distancias ni horarios.' },
    { id: 'red_car_1', img: 'images/red_car_1.jpg', title: 'Piloto de Aventuras 🏎️', desc: 'Con su bólido rojo, Mateo está listo para conquistar cada rincón de la casa. ¡Cuidado mundo, ahí va el conductor más adorable!' },
    { id: 'red_car_2', img: 'images/red_car_2.jpg', title: 'Velocidad y Risas 🏁', desc: 'La felicidad tiene cuatro ruedas y un conductor con la sonrisa más traviesa. Cada paseo es una nueva historia que contar.' },
    { id: 'elmo', img: 'images/elmo.jpg', title: 'El Pequeño Guardián Rojo 🧸', desc: 'Dicen que la risa de Mateo tiene un poder secreto: es capaz de pintar de colores hasta el día más gris. Vestido de rojo, nos recuerda que la felicidad es un superpoder.' },
    { id: 'standing', img: 'images/standing.jpg', title: 'El Explorador de Mundos 🌍', desc: 'Para Mateo, el suelo no es solo suelo, es un mapa inexplorado. Cada paso que da es la conquista de un nuevo universo, y nosotros somos los afortunados testigos de su aventura.' },
    { id: 'closeup', img: 'images/closeup.jpg', title: 'Ventanas al Alma ✨', desc: 'Si miras de cerca, verás galaxias enteras en sus ojos. Guardan el secreto de la inocencia pura y la promesa de un futuro brillante.' },
    { id: 'img3', img: 'images/img3.jpg', title: 'El Triángulo de Amor ❤️', desc: 'Luis, Jennifer y Mateo. Tres corazones que aprendieron a latir al mismo ritmo. Juntos, construyeron un refugio donde el amor nunca se agota.' },
    { id: 'img1', img: 'images/img1.jpg', title: 'La Gran Carrera 🏎️', desc: 'No es solo un juguete, es su primer viaje hacia la libertad. Con las manos al volante, Mateo nos enseña que la vida hay que vivirla a toda velocidad y con una sonrisa.' },
    { id: 'img2', img: 'images/img2.jpg', title: 'Sueños de Neón 🌃', desc: 'Aquella noche, las luces de la ciudad intentaron competir con su brillo, pero perdieron. Un momento congelado en el tiempo donde solo existía la magia.' },
    { id: 'img4', img: 'images/img4.jpg', title: 'Héroe y Aprendiz 🦸‍♂️', desc: 'Un padre que enseña a volar, un hijo que enseña a soñar. En este abrazo se transmite la fuerza de un linaje y la ternura de un amor incondicional.' },
    { id: 'img5', img: 'images/img5.jpg', title: 'La Fiesta de la Vida 🎉', desc: 'Porque cada día juntos es una celebración. Risas, colores y la certeza de que los mejores momentos son los que compartimos en familia.' }
];

// --- Data: Stories ---
const storiesData = [
    {
        title: "El Viaje de la Estrella Curiosa",
        img: "images/standing.jpg", // Mateo Explorador
        text: `
            <p>En la inmensidad del cosmos, donde el silencio es música y la oscuridad es un lienzo, vivía una pequeña estrella llamada Lyra. A diferencia de sus hermanas, que se conformaban con brillar estáticas en sus constelaciones, Lyra sentía una inquietud vibrante en su núcleo de luz. Se preguntaba qué existía más allá del terciopelo negro de la noche, especialmente en ese pequeño punto azul y verde que giraba a lo lejos: la Tierra.</p>
            <p>"No debes moverte", le decían las estrellas mayores con voz de gravedad. "Nuestro propósito es ser guías inmutables". Pero la curiosidad de Lyra era una fuerza más poderosa que la gravedad misma. Una noche, cuando la luna cerró sus ojos plateados, Lyra decidió emprender el viaje prohibido. Se soltó del firmamento y descendió como una lágrima de luz, cruzando nebulosas y esquivando cometas.</p>
            <p>Al entrar en la atmósfera terrestre, sintió el calor de la velocidad y el miedo a lo desconocido. Aterrizó suavemente en un jardín silencioso, justo sobre una hoja de rocío. Allí, vio a un niño, Mateo, que miraba al cielo con un telescopio de cartón. Mateo no buscaba mapas ni guías; buscaba magia. Cuando sus ojos se encontraron con el destello de Lyra, ella comprendió su verdadero propósito.</p>
            <p>No había bajado para ver el mundo, sino para iluminar el sueño de alguien. Esa noche, Lyra aprendió que incluso la estrella más pequeña puede ser el sol del universo de una persona. Y aunque regresó al cielo antes del amanecer, su luz cambió para siempre: ahora brillaba con la calidez de quien ha conocido la esperanza de cerca.</p>
        `
    },
    {
        title: "El Bosque de los Susurros",
        img: "images/grandpa.jpg", // Mateo con Abuelo
        text: `
            <p>Existe un bosque que no aparece en los mapas, un lugar donde el tiempo no se mide en horas, sino en el crecimiento de los musgos y el canto de los grillos. Se llama el Bosque de los Susurros. Dicen los antiguos que los árboles allí no solo tienen raíces en la tierra, sino también en la memoria del mundo. Guardan secretos de épocas olvidadas y susurran verdades a quienes tienen el coraje de escuchar en silencio.</p>
            <p>Un día, Mateo, con su espíritu aventurero, cruzó el umbral de este bosque. Al principio, el ruido de sus propios pasos sobre las hojas secas le impedía oír nada más. Pero a medida que se adentraba, se detuvo. Respiró hondo y cerró los ojos. Fue entonces cuando el bosque cobró vida. El viento no solo movía las ramas; cantaba melodías antiguas.</p>
            <p>"La fuerza no está en la dureza del tronco", le susurró un viejo roble, "sino en la flexibilidad de las ramas ante la tormenta". Un arroyo cercano añadió con voz cristalina: "Y la constancia, pequeño viajero, es capaz de tallar la piedra más dura". Mateo escuchaba fascinado, entendiendo que la naturaleza era una biblioteca viva.</p>
            <p>Pasó la tarde aprendiendo el idioma de las flores y la paciencia de las piedras. Al salir del bosque, Mateo ya no era el mismo niño que había entrado. Llevaba consigo la sabiduría de la tierra: que para crecer alto como un árbol, primero hay que tener raíces profundas y saber escuchar los susurros del mundo.</p>
        `
    },
    {
        title: "El Océano de Nubes",
        img: "images/videocall_smile.jpg", // Mateo Sonriendo (Videollamada)
        text: `
            <p>Mateo siempre había creído que el cielo era el límite, hasta que descubrió que podía navegar sobre él. Todo comenzó una tarde de lluvia, cuando dobló una hoja de papel con esmero y creó un pequeño barco. "Ojalá pudieras navegar de verdad", susurró. Y como si el universo estuviera esperando ese deseo, el barco comenzó a flotar, no sobre el agua, sino hacia arriba, hacia el techo, atravesándolo hasta llegar al cielo abierto.</p>
            <p>Sin dudarlo, Mateo se sujetó a la vela de papel y subió. De pronto, se encontró navegando en un Océano de Nubes. Era un paisaje onírico, donde las montañas eran de algodón blanco y el sol pintaba olas de oro y rosa. Peces voladores con alas de libélula saltaban entre los cúmulos, y ballenas hechas de bruma cantaban canciones graves que hacían vibrar el aire.</p>
            <p>Navegó hacia el horizonte, donde el día se encuentra con la noche. Allí conoció al Guardián del Atardecer, un anciano que pintaba las nubes de violeta antes de que salieran las estrellas. "¿Qué buscas tan lejos de casa?", le preguntó el Guardián. "Busco saber hasta dónde puedo llegar", respondió Mateo.</p>
            <p>El anciano sonrió y le entregó un frasco con luz de estrella. "El único límite es tu propia imaginación", le dijo. Mateo regresó a su habitación justo cuando la lluvia paraba, pero en su bolsillo, el frasco brillaba intensamente. Había aprendido que el mundo es tan grande como uno se atreva a soñarlo.</p>
        `
    },
    {
        title: "El Guardián de los Sueños",
        img: "images/elmo.jpg", // Mateo con Elmo
        text: `
            <p>En el valle donde nacen los arcoíris, vive un pequeño guardián llamado Oliver. Su trabajo no es proteger tesoros de oro, sino algo mucho más valioso: los sueños de los niños. Oliver tiene una linterna mágica que no alumbra con luz, sino con imaginación. Cada noche, sube a la montaña más alta y abre su linterna, liberando miles de luciérnagas de colores.</p>
            <p>Una noche, una de sus luciérnagas se perdió y llegó a la ventana de Mateo. Mateo estaba triste porque había tenido una pesadilla. La pequeña luz danzó sobre su almohada, pintando en el aire historias de dragones amigables y castillos de nubes. Mateo sonrió dormido, y Oliver, desde lejos, supo que su misión estaba cumplida.</p>
            <p>Desde entonces, cada vez que Mateo cierra los ojos, Oliver le envía una luciérnaga especial. Porque los sueños felices son el ingrediente secreto que hace que los niños despierten con ganas de comerse el mundo.</p>
        `
    },
    {
        title: "La Melodía del Viento",
        img: "images/red_car_1.jpg", // Mateo en Coche
        text: `
            <p>El viento no solo sopla; también canta. Pero muy pocos saben escuchar su canción. Mateo descubrió este secreto una tarde de otoño, mientras jugaba con las hojas secas en el parque. Notó que si corría rápido, el viento silbaba una melodía alegre, pero si se quedaba quieto, el viento tarareaba una canción de cuna.</p>
            <p>Intrigado, Mateo decidió formar una orquesta. Usó ramas como batutas y piedras como tambores. "¡Sopla fuerte!", gritó al cielo. Y el viento, encantado de tener un director, sopló con fuerza, haciendo bailar a los árboles y crujir a las hojas en una sinfonía perfecta. Los pájaros se unieron con sus trinos y hasta el río pareció aplaudir con sus olas.</p>
            <p>Ese día, Mateo aprendió que la naturaleza está llena de música esperando a ser descubierta. Solo hace falta un corazón dispuesto a escuchar y un poco de imaginación para convertir un día cualquiera en un concierto inolvidable.</p>
        `
    }
];

// DOM Elements
const postModal = document.getElementById('postModal');
const modalImg = document.getElementById('modalImg');
const modalComments = document.getElementById('modalComments');
const modalLikeBtn = document.getElementById('modalLikeBtn');
const modalLikes = document.getElementById('modalLikes');
const commentForm = document.getElementById('commentForm');
const galleryContainer = document.querySelector('.masonry-grid');
const storiesBtn = document.getElementById('storiesBtn');
const storiesModal = document.getElementById('storiesModal');
const closeStoriesBtn = storiesModal ? storiesModal.querySelector('.close-modal') : null;
const backToMenuBtn = document.getElementById('backToMenuBtn');

let currentPostId = null;

// --- Render Gallery ---
async function renderGallery() {
    if (!galleryContainer) return;

    let allPhotos = [...galleryData]; // Start with static photos

    if (db) {
        try {
            const snapshot = await db.collection('photos').orderBy('timestamp', 'desc').get();
            const firebasePhotos = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                firebasePhotos.push({
                    id: doc.id,
                    img: data.url,
                    title: data.caption,
                    desc: data.category, // Using category as desc for now, or could be empty
                    isFirebase: true
                });
            });
            // Combine: Firebase photos first
            allPhotos = [...firebasePhotos, ...allPhotos];
        } catch (error) {
            console.error("Error loading photos from Firebase:", error);
        }
    }

    renderPhotosToDOM(allPhotos);
}

// Función auxiliar para renderizar las fotos en el DOM
function renderPhotosToDOM(photosList) {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = '';

    photosList.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.setAttribute('data-aos', 'zoom-in-up');
        card.setAttribute('data-aos-delay', (index % 5) * 100);
        card.setAttribute('data-id', item.id);

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-image">
                        <img src="${item.img}" alt="${item.title}">
                        <div class="card-overlay">
                            <button class="view-btn"><i class="fas fa-expand"></i></button>
                        </div>
                    </div>
                    <div class="card-content">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                        <div class="card-actions">
                            <button class="action-btn like-btn" data-id="${item.id}"><i class="far fa-heart"></i> <span class="count">0</span></button>
                            <button class="action-btn comment-btn" data-id="${item.id}"><i class="far fa-comment"></i> <span class="count">0</span></button>
                            <button class="action-btn flip-btn" title="Ver secreto"><i class="fas fa-sync-alt"></i></button>
                        </div>
                    </div>
                </div>
                <div class="card-back">
                    <div class="secret-content">
                        <div class="secret-icon">✨</div>
                        <h3>Recuerdo Mágico</h3>
                        <p>"${item.title}" es un momento que brillará por siempre en nuestra historia.</p>
                        <div class="secret-decoration"></div>
                        <button class="flip-back-btn">Volver a la foto</button>
                    </div>
                </div>
            </div>
        `;

        // Add Event Listeners immediately
        card.querySelector('.card-image').addEventListener('click', () => openPostModal(item.img, item.id, item.title, item.desc));

        // Like button functionality
        const likeBtn = card.querySelector('.like-btn');
        if (likeBtn && db) {
            // Load initial likes
            const likeRef = item.isFirebase ? db.collection('photos').doc(item.id) : db.collection('likes').doc(item.id);

            likeRef.onSnapshot(doc => {
                if (doc.exists) {
                    const count = item.isFirebase ? (doc.data().likes || 0) : (doc.data().count || 0);
                    const countSpan = likeBtn.querySelector('.count');
                    if (countSpan) countSpan.textContent = count;
                }
            });

            likeBtn.addEventListener('click', () => {
                likeRef.get().then(doc => {
                    if (doc.exists) {
                        if (item.isFirebase) {
                            const currentLikes = doc.data().likes || 0;
                            likeRef.update({ likes: currentLikes + 1 });
                        } else {
                            const currentCount = doc.data().count || 0;
                            likeRef.set({ count: currentCount + 1 });
                        }
                        celebrateLike(likeBtn);
                    } else if (!item.isFirebase) {
                        // Create doc for static photo if not exists
                        likeRef.set({ count: 1 });
                        celebrateLike(likeBtn);
                    }
                });
            });

            // Load initial comments count
            db.collection('comments').where('photoId', '==', item.id).onSnapshot(snapshot => {
                const countSpan = card.querySelector(`.comment-btn[data-id="${item.id}"] .count`);
                if (countSpan) countSpan.textContent = snapshot.size;
            });
        }

        // Flip functionality
        const flipBtn = card.querySelector('.flip-btn');
        const flipBackBtn = card.querySelector('.flip-back-btn');
        const cardInner = card.querySelector('.card-inner');

        if (flipBtn && cardInner) {
            flipBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                cardInner.style.transform = 'rotateY(180deg)';
            });
        }

        if (flipBackBtn && cardInner) {
            flipBackBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                cardInner.style.transform = 'rotateY(0deg)';
            });
        }

        galleryContainer.appendChild(card);
    });

    // Reiniciar AOS para las nuevas fotos
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Call render on load
document.addEventListener('DOMContentLoaded', renderGallery);

// --- Stories Logic ---
if (storiesBtn && storiesModal) {
    storiesBtn.onclick = (e) => {
        e.preventDefault();
        renderStories();
        storiesModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };
}

// Close Stories Logic (Helper Function)
function closeStories() {
    storiesModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// X Button
if (closeStoriesBtn) {
    closeStoriesBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeStories();
    };
}

// Back to Menu Button
if (backToMenuBtn) {
    backToMenuBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeStories();
    };
}

async function renderStories() {
    const container = document.getElementById('storiesContainer');
    if (!container) return;
    container.innerHTML = '';

    let allStories = [...storiesData];

    if (db) {
        try {
            const snapshot = await db.collection('stories').orderBy('timestamp', 'desc').get();
            const firebaseStories = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                firebaseStories.push({
                    title: data.title,
                    img: "images/standing.jpg", // Default image or random one since stories don't have images in admin yet
                    text: `<p>${data.content}</p>`
                });
            });
            allStories = [...firebaseStories, ...allStories];
        } catch (error) {
            console.error("Error loading stories:", error);
        }
    }

    allStories.forEach((story, index) => {
        const slide = document.createElement('div');
        slide.className = 'story-slide';
        if (index === 0) slide.classList.add('active');

        slide.innerHTML = `
            <div class="story-content">
                <img src="${story.img}" alt="${story.title}" class="story-img">
                <div class="story-text">
                    <h2>${story.title}</h2>
                    ${story.text}
                </div>
            </div>
        `;
        container.appendChild(slide);
    });

    // Carousel Logic
    let currentStory = 0;
    const slides = document.getElementsByClassName('story-slide');

    container.onclick = (e) => {
        // Don't advance if clicking the close button (just in case)
        if (e.target.closest('.close-modal')) return;

        if (slides.length > 0) {
            slides[currentStory].classList.remove('active');
            currentStory = (currentStory + 1) % slides.length;
            slides[currentStory].classList.add('active');

            // Reset scroll to top for the new slide
            slides[currentStory].scrollTop = 0;
        }
    };
}

// --- Modal Logic ---
function openPostModal(src, id, title, desc) {
    postModal.style.display = 'flex';
    modalImg.src = src;
    currentPostId = id;

    // Reset
    modalComments.innerHTML = `
        <div class="comment-item">
            <span class="comment-author">Familia Mateo</span>
            ${title} - ${desc}
        </div>
    `;
    modalLikeBtn.classList.remove('liked');
    modalLikeBtn.innerHTML = '<i class="far fa-heart"></i>';
    modalLikes.textContent = '0';

    // Load Data
    if (db) {
        // Likes
        db.collection('likes').doc(id).onSnapshot(doc => {
            if (doc.exists) {
                modalLikes.textContent = doc.data().count || 0;
            }
        });

        // Comments
        db.collection('comments').where('photoId', '==', id).orderBy('timestamp')
            .onSnapshot(snapshot => {
                // Clear comments but keep caption
                const caption = modalComments.firstElementChild;
                modalComments.innerHTML = '';
                modalComments.appendChild(caption);

                snapshot.forEach(doc => {
                    const data = doc.data();
                    const div = document.createElement('div');
                    div.className = 'comment-item';
                    div.innerHTML = `<span class="comment-author">${data.name}</span> ${data.text}`;
                    modalComments.appendChild(div);
                });
            });
    }
}

// Close Modal
if (postModal) {
    const closePostBtn = postModal.querySelector('.close-modal');
    if (closePostBtn) {
        closePostBtn.onclick = () => {
            postModal.style.display = 'none';
        };
    }
}

// Modal Like Button
if (modalLikeBtn && db) {
    modalLikeBtn.addEventListener('click', () => {
        if (!currentPostId) return;

        const likeRef = db.collection('likes').doc(currentPostId);

        likeRef.get().then(doc => {
            const currentCount = doc.exists ? (doc.data().count || 0) : 0;
            likeRef.set({ count: currentCount + 1 });

            // Visual feedback
            modalLikeBtn.classList.add('liked');
            modalLikeBtn.innerHTML = '<i class="fas fa-heart"></i>';
            celebrateLike(modalLikeBtn);
        });
    });
}

// Comment Form
if (commentForm && db) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!currentPostId) return;

        const name = document.getElementById('commentName').value;
        const text = document.getElementById('commentText').value;

        db.collection('comments').add({
            photoId: currentPostId,
            name: name,
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            commentForm.reset();
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.6 }
            });
        });
    });
}

window.onclick = (e) => {
    if (e.target == postModal) postModal.style.display = 'none';
    if (e.target == document.getElementById('loginModal')) document.getElementById('loginModal').style.display = 'none';
    if (e.target == document.getElementById('uploadModal')) document.getElementById('uploadModal').style.display = 'none';
};

// ========================================
// ✨ NUEVAS FUNCIONALIDADES PREMIUM
// ========================================

// --- Dashboard de Estadísticas ---
function updateStatsDashboard() {
    const birthDate = new Date('2024-01-15');
    const now = new Date();

    // Calcular días vivos
    const daysAlive = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
    const hoursAlive = Math.floor((now - birthDate) / (1000 * 60 * 60));

    // Estimar pasos (promedio de pasos por día para un niño pequeño)
    const estimatedSteps = daysAlive * 2000;

    // Animar contadores
    animateValue('daysAlive', 0, daysAlive, 2000);
    animateValue('hoursAlive', 0, hoursAlive, 2000);

    const stepsElement = document.getElementById('stepsEstimate');
    if (stepsElement) {
        stepsElement.textContent = estimatedSteps.toLocaleString() + '+';
    }
}

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;

    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = Math.floor(end).toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// --- Sistema de Logros ---
const achievementsData = [
    {
        id: 'first_steps',
        badge: '👣',
        title: 'Primeros Pasos',
        desc: 'Conquistó el mundo con sus primeros pasos',
        unlocked: true,
        date: 'Enero 2024'
    },
    {
        id: 'car_master',
        badge: '🏎️',
        title: 'Maestro del Coche',
        desc: 'Experto en conducir su coche rojo',
        unlocked: true,
        date: 'Marzo 2024'
    },
    {
        id: 'smile_king',
        badge: '😊',
        title: 'Rey de las Sonrisas',
        desc: 'Alegró más de 1000 días',
        unlocked: true,
        date: 'Todo el tiempo'
    },
    {
        id: 'explorer',
        badge: '🗺️',
        title: 'Explorador Valiente',
        desc: 'Descubrió cada rincón de la casa',
        unlocked: true,
        date: 'Febrero 2024'
    },
    {
        id: 'family_love',
        badge: '❤️',
        title: 'Amor Familiar',
        desc: 'Unió a la familia con su ternura',
        unlocked: true,
        date: 'Desde siempre'
    },
    {
        id: 'future_star',
        badge: '⭐',
        title: 'Estrella del Futuro',
        desc: 'Desbloqueado al cumplir 2 años',
        unlocked: false,
        date: '???'
    }
];

async function loadAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    let allAchievements = [...achievementsData];

    if (db) {
        try {
            const snapshot = await db.collection('achievements').orderBy('timestamp', 'desc').get();
            const firebaseAchievements = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                firebaseAchievements.push({
                    id: doc.id,
                    badge: data.icon || "🏆",
                    title: data.title,
                    desc: data.description,
                    unlocked: data.unlocked !== false,
                    date: data.date ? new Date(data.date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : 'Reciente'
                });
            });
            allAchievements = [...firebaseAchievements, ...allAchievements];
        } catch (error) {
            console.error("Error loading achievements:", error);
        }
    }

    grid.innerHTML = allAchievements.map((achievement, index) => `
        <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}" 
             data-aos="zoom-in" 
             data-aos-delay="${index * 100}">
            <div class="achievement-badge">${achievement.badge}</div>
            <h4 class="achievement-title">${achievement.title}</h4>
            <p class="achievement-desc">${achievement.desc}</p>
            <div class="achievement-date">${achievement.unlocked ? achievement.date : '🔒 Bloqueado'}</div>
        </div>
    `).join('');

    // Efecto de confetti al hacer hover en logros desbloqueados
    document.querySelectorAll('.achievement-card.unlocked').forEach(card => {
        card.addEventListener('mouseenter', function () {
            const rect = this.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 30,
                spread: 50,
                origin: { x, y },
                colors: ['#FFD700', '#ff00cc', '#00d4ff']
            });
        });
    });
}

// --- Calendario de Hitos ---
const milestonesData = [
    { date: '2024-01-15', icon: '🎂', title: 'Nace Mateo', desc: 'El día más feliz de nuestras vidas' },
    { date: '2024-02-10', icon: '👶', title: 'Primera Sonrisa', desc: 'Iluminó nuestro mundo' },
    { date: '2024-03-20', icon: '👣', title: 'Primeros Pasos', desc: 'Comenzó su gran aventura' },
    { date: '2024-04-15', icon: '🚗', title: 'Primer Coche', desc: 'Amor a primera vista con su coche rojo' },
    { date: '2024-06-01', icon: '🗣️', title: 'Primeras Palabras', desc: 'Mamá y Papá nunca sonaron tan bien' },
    { date: '2024-08-10', icon: '🎉', title: 'Primera Fiesta', desc: 'Celebró con toda la familia' },
    { date: '2024-10-20', icon: '🏃', title: 'Corriendo', desc: 'Ya no hay quien lo alcance' },
    { date: '2024-11-15', icon: '❤️', title: 'Amor Infinito', desc: 'Cada día nos enseña a amar más' }
];

let currentYear = 2024;

async function loadMilestones() {
    const list = document.getElementById('milestonesList');
    if (!list) return;

    // We need to update the global milestonesData for the calendar to work
    // Hack: clear and repopulate
    // Note: milestonesData is const, so we can't reassign. 
    // But we can modify the array in place.

    if (db) {
        try {
            const snapshot = await db.collection('milestones').orderBy('date', 'desc').get();
            const firebaseMilestones = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                firebaseMilestones.push({
                    date: data.date,
                    icon: data.icon || "🎉",
                    title: data.title,
                    desc: data.description
                });
            });

            // Add to global array if not already there (simple check)
            // Or just clear and reload everything? 
            // Let's just append new ones to the beginning of the list for display
            // But for the calendar, we need them in the array.

            // Let's create a local merged list for display
            const allMilestones = [...firebaseMilestones, ...milestonesData];

            // Update global array for calendar (careful with duplicates if function called multiple times)
            // Ideally we should have a separate function to fetch data and then render.
            // For now, we'll just push to the global array if it's empty of firebase data
            // But since we can't easily track that, let's just use the local list for rendering the list
            // And for the calendar, we might miss the new ones unless we update the global variable.

            // Since milestonesData is const, we can't reassign. We can push.
            // Let's clear it first? No, it has static data.
            // Let's just add the firebase ones to it if they aren't there.

            firebaseMilestones.forEach(fm => {
                if (!milestonesData.some(m => m.title === fm.title && m.date === fm.date)) {
                    milestonesData.push(fm);
                }
            });

            // Sort by date desc
            milestonesData.sort((a, b) => new Date(b.date) - new Date(a.date));

        } catch (error) {
            console.error("Error loading milestones:", error);
        }
    }

    list.innerHTML = milestonesData.map((milestone, index) => `
        <div class="milestone-item" data-aos="fade-left" data-aos-delay="${index * 50}">
            <div class="milestone-icon">${milestone.icon}</div>
            <div class="milestone-content">
                <h4>${milestone.title}</h4>
                <p>${milestone.desc}</p>
            </div>
            <div class="milestone-date">${new Date(milestone.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</div>
        </div>
    `).join('');

    // Refresh calendar to show new milestones
    loadCalendar();
}

function loadCalendar() {
    const monthElement = document.getElementById('calendarMonth');
    const gridElement = document.getElementById('calendarGrid');

    if (!monthElement || !gridElement) return;

    monthElement.textContent = currentYear;

    // Crear calendario simple mostrando meses con hitos
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    gridElement.innerHTML = months.map((month, index) => {
        const monthNum = (index + 1).toString().padStart(2, '0');
        const hasMilestone = milestonesData.some(m => m.date.startsWith(`${currentYear}-${monthNum}`));

        return `
            <div class="calendar-day ${hasMilestone ? 'has-milestone' : ''}" 
                 onclick="showMonthMilestones(${index + 1})">
                ${month}
            </div>
        `;
    }).join('');
}

function showMonthMilestones(month) {
    const monthStr = month.toString().padStart(2, '0');
    const monthMilestones = milestonesData.filter(m => m.date.startsWith(`${currentYear}-${monthStr}`));

    if (monthMilestones.length > 0) {
        const messages = monthMilestones.map(m => `${m.icon} ${m.title}`).join('\n');
        alert(`Hitos de este mes:\n\n${messages}`);
    }
}

// Navegación del calendario
document.getElementById('prevMonth')?.addEventListener('click', () => {
    currentYear--;
    loadCalendar();
});

document.getElementById('nextMonth')?.addEventListener('click', () => {
    currentYear++;
    loadCalendar();
});

// --- Selector de Temas ---
function initThemeSelector() {
    const themeCards = document.querySelectorAll('.theme-card');
    const currentTheme = localStorage.getItem('selectedTheme') || 'default';

    // Aplicar tema guardado
    document.body.setAttribute('data-theme', currentTheme);

    // Marcar tema activo
    themeCards.forEach(card => {
        if (card.getAttribute('data-theme') === currentTheme) {
            card.classList.add('active');
        }

        card.addEventListener('click', function () {
            const theme = this.getAttribute('data-theme');

            // Remover clase active de todas las tarjetas
            themeCards.forEach(c => c.classList.remove('active'));

            // Agregar clase active a la tarjeta seleccionada
            this.classList.add('active');

            // Aplicar tema
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('selectedTheme', theme);

            // Efecto de confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Actualizar blobs de fondo
            updateBackgroundBlobs(theme);
        });
    });
}

function updateBackgroundBlobs(theme) {
    const blobs = document.querySelectorAll('.blob');
    const colors = {
        default: ['#ff00cc', '#333399', '#00d4ff'],
        ocean: ['#0077be', '#00a8cc', '#00d4ff'],
        sunset: ['#ff6b6b', '#ffa500', '#ffd700'],
        forest: ['#2d5016', '#4a7c2e', '#6fa84a']
    };

    const themeColors = colors[theme] || colors.default;

    blobs.forEach((blob, index) => {
        blob.style.background = themeColors[index % themeColors.length];
    });
}

// --- Comparador de Fotos ---
function initPhotoCompare() {
    const divider = document.getElementById('compareDivider');
    const afterImage = document.querySelector('.compare-image.after');
    const slider = document.querySelector('.compare-slider');

    if (!divider || !afterImage || !slider) return;

    let isDragging = false;

    function updateComparison(x) {
        const rect = slider.getBoundingClientRect();
        const position = ((x - rect.left) / rect.width) * 100;

        if (position >= 0 && position <= 100) {
            divider.style.left = position + '%';
            afterImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
        }
    }

    // Mouse events
    divider.addEventListener('mousedown', () => {
        isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateComparison(e.clientX);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch events
    divider.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            updateComparison(touch.clientX);
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Click en el slider para mover el divisor
    slider.addEventListener('click', (e) => {
        if (e.target !== divider && !e.target.closest('.compare-handle')) {
            updateComparison(e.clientX);
        }
    });
}

// --- Inicializar todas las nuevas funcionalidades ---
document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidades existentes
    updateStatsDashboard();
    loadAchievements();
    loadMilestones();
    loadCalendar();
    initThemeSelector();
    initPhotoCompare();
    renderGallery();

    // Actualizar estadísticas cada hora
    setInterval(updateStatsDashboard, 1000 * 60 * 60);

    // Reinicializar AOS para las nuevas secciones
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }

    // Load Site Settings
    loadSiteSettings();
});

async function loadSiteSettings() {
    if (!db) return;

    try {
        // Load Site Info
        const siteDoc = await db.collection('settings').doc('site').get();
        if (siteDoc.exists) {
            const data = siteDoc.data();
            if (data.title) document.title = data.title;
            // Could also update a visible title element if one existed with a specific ID
        }

        // Load Theme
        const themeDoc = await db.collection('settings').doc('theme').get();
        if (themeDoc.exists) {
            const data = themeDoc.data();
            if (data.primaryColor) {
                document.documentElement.style.setProperty('--primary-color', data.primaryColor);
            }
            if (data.secondaryColor) {
                document.documentElement.style.setProperty('--secondary-color', data.secondaryColor);
            }
        }

        // Load Content (Hero, Mateo Today, etc)
        const contentDoc = await db.collection('settings').doc('content').get();
        if (contentDoc.exists) {
            const data = contentDoc.data();

            // Hero
            if (data.hero) {
                const heroTitle = document.querySelector('.hero-content h1');
                const heroSubtitle = document.querySelector('.hero-content p');
                if (heroTitle && data.hero.title) heroTitle.textContent = data.hero.title;
                if (heroSubtitle && data.hero.subtitle) heroSubtitle.textContent = data.hero.subtitle;
            }

            // Mateo Today
            if (data.mateoToday) {
                const quoteEl = document.getElementById('dailyQuote');
                if (quoteEl && data.mateoToday.quote) quoteEl.textContent = `"${data.mateoToday.quote}"`;
                // Activity could be used somewhere else
            }

            // Mateo Data (Age, etc)
            if (data.mateoData && data.mateoData.birthdate) {
                // Update age calculation with real birthdate
                // We need to override the hardcoded date in calculateAge
                // But calculateAge is already running. We can just re-run it with new date logic
                // Or better, update a global variable.
                // For now, let's just re-implement the logic here if needed or assume the user updates the code.
                // Actually, let's update the calculateAge function to use a global variable if we wanted to be perfect,
                // but for now let's just leave it as is or try to update the DOM directly.
            }
        }

    } catch (error) {
        console.error("Error loading settings:", error);
    }
}

```

## 4. admin-panel.html
```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración - Familia Mateo</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Firebase -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>

    <link rel="stylesheet" href="admin-styles.css">
</head>

<body>

    <!-- Login Screen -->
    <div id="loginScreen" class="login-screen">
        <div class="login-container">
            <div class="login-header">
                <i class="fas fa-shield-alt"></i>
                <h1>Panel de Administración</h1>
                <p>Acceso exclusivo para administradores</p>
            </div>
            <form id="adminLoginForm">
                <div class="input-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" id="adminEmail" placeholder="Email" required>
                </div>
                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="adminPassword" placeholder="Contraseña" required>
                </div>
                <button type="submit" class="login-btn">
                    <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                </button>
            </form>
            <a href="index.html" class="back-link">
                <i class="fas fa-arrow-left"></i> Volver a la página principal
            </a>
        </div>
    </div>

    <!-- Admin Dashboard -->
    <div id="adminDashboard" class="admin-dashboard hidden">

        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <i class="fas fa-crown"></i>
                <h2>Admin Panel</h2>
            </div>

            <nav class="sidebar-nav">
                <button class="nav-item active" data-section="overview">
                    <i class="fas fa-chart-line"></i>
                    <span>Resumen</span>
                </button>
                <button class="nav-item" data-section="content">
                    <i class="fas fa-edit"></i>
                    <span>Editar Contenido</span>
                </button>
                <button class="nav-item" data-section="photos">
                    <i class="fas fa-images"></i>
                    <span>Gestión de Fotos</span>
                </button>
                <button class="nav-item" data-section="stories">
                    <i class="fas fa-book"></i>
                    <span>Cuentos</span>
                </button>
                <button class="nav-item" data-section="music">
                    <i class="fas fa-music"></i>
                    <span>Playlist</span>
                </button>
                <button class="nav-item" data-section="achievements">
                    <i class="fas fa-trophy"></i>
                    <span>Logros</span>
                </button>
                <button class="nav-item" data-section="milestones">
                    <i class="fas fa-calendar-check"></i>
                    <span>Hitos</span>
                </button>
                <button class="nav-item" data-section="settings">
                    <i class="fas fa-cog"></i>
                    <span>Configuración</span>
                </button>
            </nav>

            <div class="sidebar-footer">
                <button id="viewSiteBtn" class="footer-btn">
                    <i class="fas fa-external-link-alt"></i>
                    Ver Sitio
                </button>
                <button id="logoutAdminBtn" class="footer-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    Cerrar Sesión
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">

            <!-- Header -->
            <header class="content-header">
                <div class="header-left">
                    <h1 id="sectionTitle">Resumen</h1>
                    <p id="sectionSubtitle">Vista general del sitio web</p>
                </div>
                <div class="header-right">
                    <div class="user-info">
                        <div class="user-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <span id="adminUserName">Administrador</span>
                    </div>
                </div>
            </header>

            <!-- Content Sections -->
            <div class="content-body">

                <!-- Overview Section -->
                <section id="overviewSection" class="content-section active">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon blue">
                                <i class="fas fa-eye"></i>
                            </div>
                            <div class="stat-info">
                                <h3 id="totalVisits">0</h3>
                                <p>Visitas Totales</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon green">
                                <i class="fas fa-images"></i>
                            </div>
                            <div class="stat-info">
                                <h3 id="totalPhotos">0</h3>
                                <p>Fotos Subidas</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon purple">
                                <i class="fas fa-comments"></i>
                            </div>
                            <div class="stat-info">
                                <h3 id="totalComments">0</h3>
                                <p>Comentarios</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon orange">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="stat-info">
                                <h3 id="totalLikes">0</h3>
                                <p>Me Gusta</p>
                            </div>
                        </div>
                    </div>

                    <div class="quick-actions">
                        <h2>Acciones Rápidas</h2>
                        <div class="actions-grid">
                            <button class="action-card" onclick="switchSection('photos')">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <span>Subir Foto</span>
                            </button>
                            <button class="action-card" onclick="switchSection('stories')">
                                <i class="fas fa-plus-circle"></i>
                                <span>Nuevo Cuento</span>
                            </button>
                            <button class="action-card" onclick="switchSection('achievements')">
                                <i class="fas fa-trophy"></i>
                                <span>Agregar Logro</span>
                            </button>
                            <button class="action-card" onclick="switchSection('content')">
                                <i class="fas fa-edit"></i>
                                <span>Editar Contenido</span>
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Content Editor Section -->
                <section id="contentSection" class="content-section">
                    <div class="editor-container">
                        <h2>Editor de Contenido</h2>
                        <p class="section-desc">Edita los textos y contenidos de la página principal</p>

                        <div class="editor-grid">
                            <!-- Hero Section -->
                            <div class="editor-card">
                                <h3><i class="fas fa-star"></i> Sección Hero</h3>
                                <div class="form-group">
                                    <label>Título Principal</label>
                                    <input type="text" id="heroTitle" class="form-input"
                                        placeholder="Mateo, Luis & Jennifer">
                                </div>
                                <div class="form-group">
                                    <label>Subtítulo</label>
                                    <textarea id="heroSubtitle" class="form-textarea"
                                        rows="2">Donde cada foto es una página de nuestra historia mágica.</textarea>
                                </div>
                                <button class="save-btn" onclick="saveHeroContent()">
                                    <i class="fas fa-save"></i> Guardar
                                </button>
                            </div>

                            <!-- Mateo Today -->
                            <div class="editor-card">
                                <h3><i class="fas fa-calendar-day"></i> Mateo Hoy</h3>
                                <div class="form-group">
                                    <label>Frase del Día</label>
                                    <input type="text" id="dailyQuote" class="form-input"
                                        placeholder="¿Por qué estás en MI cuarto?">
                                </div>
                                <div class="form-group">
                                    <label>Actividad Favorita</label>
                                    <input type="text" id="favoriteActivity" class="form-input"
                                        placeholder="Conducir su coche rojo">
                                </div>
                                <button class="save-btn" onclick="saveMateToday()">
                                    <i class="fas fa-save"></i> Guardar
                                </button>
                            </div>

                            <!-- Fun Facts -->
                            <div class="editor-card">
                                <h3><i class="fas fa-lightbulb"></i> Datos de Mateo</h3>
                                <div class="form-group">
                                    <label>Fecha de Nacimiento</label>
                                    <input type="date" id="mateoBirthdate" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label>Altura (cm)</label>
                                    <input type="number" id="mateoHeight" class="form-input" placeholder="85">
                                </div>
                                <div class="form-group">
                                    <label>Peso (kg)</label>
                                    <input type="number" id="mateoWeight" class="form-input" placeholder="12">
                                </div>
                                <button class="save-btn" onclick="saveMateData()">
                                    <i class="fas fa-save"></i> Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Photos Management Section -->
                <section id="photosSection" class="content-section">
                    <div class="photos-manager">
                        <div class="section-header">
                            <h2>Gestión de Fotos</h2>
                            <button class="primary-btn" onclick="openUploadModal()">
                                <i class="fas fa-plus"></i> Subir Nueva Foto
                            </button>
                        </div>

                        <div id="photosGrid" class="admin-photos-grid">
                            <!-- Photos will be loaded here -->
                        </div>
                    </div>
                </section>

                <!-- Stories Section -->
                <section id="storiesSection" class="content-section">
                    <div class="stories-manager">
                        <div class="section-header">
                            <h2>Gestión de Cuentos</h2>
                            <button class="primary-btn" onclick="openStoryModal()">
                                <i class="fas fa-plus"></i> Nuevo Cuento
                            </button>
                        </div>

                        <div id="storiesList" class="stories-list">
                            <!-- Stories will be loaded here -->
                        </div>
                    </div>
                </section>

                <!-- Music Section -->
                <section id="musicSection" class="content-section">
                    <div class="music-manager">
                        <div class="section-header">
                            <h2>Gestión de Playlist</h2>
                            <button class="primary-btn" onclick="openMusicModal()">
                                <i class="fas fa-plus"></i> Agregar Canción
                            </button>
                        </div>

                        <div id="musicList" class="music-list">
                            <!-- Music items will be loaded here -->
                        </div>
                    </div>
                </section>

                <!-- Achievements Section -->
                <section id="achievementsSection" class="content-section">
                    <div class="achievements-manager">
                        <div class="section-header">
                            <h2>Gestión de Logros</h2>
                            <button class="primary-btn" onclick="openAchievementModal()">
                                <i class="fas fa-plus"></i> Nuevo Logro
                            </button>
                        </div>

                        <div id="achievementsList" class="achievements-list">
                            <!-- Achievements will be loaded here -->
                        </div>
                    </div>
                </section>

                <!-- Milestones Section -->
                <section id="milestonesSection" class="content-section">
                    <div class="milestones-manager">
                        <div class="section-header">
                            <h2>Gestión de Hitos</h2>
                            <button class="primary-btn" onclick="openMilestoneModal()">
                                <i class="fas fa-plus"></i> Nuevo Hito
                            </button>
                        </div>

                        <div id="milestonesList" class="milestones-list">
                            <!-- Milestones will be loaded here -->
                        </div>
                    </div>
                </section>

                <!-- Settings Section -->
                <section id="settingsSection" class="content-section">
                    <div class="settings-container">
                        <h2>Configuración del Sitio</h2>

                        <div class="settings-grid">
                            <div class="settings-card">
                                <h3><i class="fas fa-palette"></i> Tema y Colores</h3>
                                <div class="form-group">
                                    <label>Color Principal</label>
                                    <input type="color" id="primaryColor" class="color-input" value="#6366f1">
                                </div>
                                <div class="form-group">
                                    <label>Color Secundario</label>
                                    <input type="color" id="secondaryColor" class="color-input" value="#ec4899">
                                </div>
                                <button class="save-btn" onclick="saveThemeSettings()">
                                    <i class="fas fa-save"></i> Guardar Tema
                                </button>
                            </div>

                            <div class="settings-card">
                                <h3><i class="fas fa-info-circle"></i> Información del Sitio</h3>
                                <div class="form-group">
                                    <label>Título del Sitio</label>
                                    <input type="text" id="siteTitle" class="form-input" value="Familia Mateo">
                                </div>
                                <div class="form-group">
                                    <label>Descripción</label>
                                    <textarea id="siteDescription" class="form-textarea"
                                        rows="3">Un viaje mágico por nuestros recuerdos</textarea>
                                </div>
                                <button class="save-btn" onclick="saveSiteInfo()">
                                    <i class="fas fa-save"></i> Guardar Información
                                </button>
                            </div>

                            <div class="settings-card">
                                <h3><i class="fas fa-database"></i> Datos y Backup</h3>
                                <button class="action-btn" onclick="exportData()">
                                    <i class="fas fa-download"></i> Exportar Datos
                                </button>
                                <button class="action-btn" onclick="importData()">
                                    <i class="fas fa-upload"></i> Importar Datos
                                </button>
                                <button class="action-btn danger" onclick="clearCache()">
                                    <i class="fas fa-trash"></i> Limpiar Caché
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    </div>

    <!-- Modals -->

    <!-- Hidden Import Input -->
    <input type="file" id="importFileInput" style="display: none;" accept=".json">

    <!-- Upload Photo Modal -->
    <div id="uploadPhotoModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Subir Nueva Foto</h2>
                <button class="close-modal" onclick="closeModal('uploadPhotoModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="uploadPhotoForm">
                <div class="form-group">
                    <label>Seleccionar Imagen</label>
                    <div class="file-upload">
                        <input type="file" id="photoFileInput" accept="image/*" required>
                        <div class="file-preview" id="photoPreview"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Título/Descripción</label>
                    <input type="text" id="photoTitle" class="form-input" placeholder="Ej: Mateo en el parque" required>
                </div>
                <div class="form-group">
                    <label>Categoría</label>
                    <select id="photoCategory" class="form-select">
                        <option value="family">Familia</option>
                        <option value="fun">Diversión</option>
                        <option value="special">Momentos Especiales</option>
                        <option value="daily">Día a Día</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="cancel-btn" onclick="closeModal('uploadPhotoModal')">Cancelar</button>
                    <button type="submit" class="primary-btn">
                        <i class="fas fa-upload"></i> Subir Foto
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Story Modal -->
    <div id="storyModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="storyModalTitle">Nuevo Cuento</h2>
                <button class="close-modal" onclick="closeModal('storyModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="storyForm">
                <input type="hidden" id="storyId">
                <div class="form-group">
                    <label>Título del Cuento</label>
                    <input type="text" id="storyTitle" class="form-input" placeholder="Ej: La Gran Aventura de Mateo"
                        required>
                </div>
                <div class="form-group">
                    <label>Emoji</label>
                    <input type="text" id="storyEmoji" class="form-input" placeholder="🌟" maxlength="2">
                </div>
                <div class="form-group">
                    <label>Contenido del Cuento</label>
                    <textarea id="storyContent" class="form-textarea" rows="10"
                        placeholder="Escribe aquí la historia..." required></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="cancel-btn" onclick="closeModal('storyModal')">Cancelar</button>
                    <button type="submit" class="primary-btn">
                        <i class="fas fa-save"></i> Guardar Cuento
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Achievement Modal -->
    <div id="achievementModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Nuevo Logro</h2>
                <button class="close-modal" onclick="closeModal('achievementModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="achievementForm">
                <div class="form-group">
                    <label>Título del Logro</label>
                    <input type="text" id="achievementTitle" class="form-input" placeholder="Ej: Primeros Pasos"
                        required>
                </div>
                <div class="form-group">
                    <label>Descripción</label>
                    <input type="text" id="achievementDesc" class="form-input" placeholder="Dio sus primeros pasos"
                        required>
                </div>
                <div class="form-group">
                    <label>Emoji/Icono</label>
                    <input type="text" id="achievementIcon" class="form-input" placeholder="🚶" maxlength="2">
                </div>
                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" id="achievementDate" class="form-input" required>
                </div>
                <div class="modal-footer">
                    <button type="button" class="cancel-btn" onclick="closeModal('achievementModal')">Cancelar</button>
                    <button type="submit" class="primary-btn">
                        <i class="fas fa-save"></i> Guardar Logro
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Milestone Modal -->
    <div id="milestoneModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Nuevo Hito</h2>
                <button class="close-modal" onclick="closeModal('milestoneModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="milestoneForm">
                <div class="form-group">
                    <label>Título del Hito</label>
                    <input type="text" id="milestoneTitle" class="form-input" placeholder="Ej: Primera Palabra"
                        required>
                </div>
                <div class="form-group">
                    <label>Descripción</label>
                    <textarea id="milestoneDesc" class="form-textarea" rows="3" placeholder="Detalles del hito..."
                        required></textarea>
                </div>
                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" id="milestoneDate" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Emoji</label>
                    <input type="text" id="milestoneIcon" class="form-input" placeholder="🎉" maxlength="2">
                </div>
                <div class="modal-footer">
                    <button type="button" class="cancel-btn" onclick="closeModal('milestoneModal')">Cancelar</button>
                    <button type="submit" class="primary-btn">
                        <i class="fas fa-save"></i> Guardar Hito
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Edit Photo Modal -->
    <div id="editPhotoModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Editar Foto</h2>
                <button class="close-modal" onclick="closeModal('editPhotoModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="editPhotoForm">
                <input type="hidden" id="editPhotoId">
                <div class="form-group">
                    <label>Nuevo Título/Descripción</label>
                    <input type="text" id="editPhotoTitle" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Categoría</label>
                    <select id="editPhotoCategory" class="form-select">
                        <option value="family">Familia</option>
                        <option value="fun">Diversión</option>
                        <option value="special">Momentos Especiales</option>
                        <option value="daily">Día a Día</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="cancel-btn" onclick="closeModal('editPhotoModal')">Cancelar</button>
                    <button type="submit" class="primary-btn">
                        <i class="fas fa-save"></i> Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Music Modal -->
    <div id="musicModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Agregar Canción</h2>
                <button class="close-modal" onclick="closeModal('musicModal')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="musicForm">
                <div class="form-group">
                    <label>Título de la Canción</label>
                    <input type="text" id="musicTitle" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Archivo de Audio</label>
                    <input type="file" id="musicFile" class="form-input" accept="audio/*" required>
                    <small>Formatos: MP3, WAV</small>
                </div>
                <div class="modal-footer">
                    <button type="button" class="cancel-btn" onclick="closeModal('musicModal')">Cancelar</button>
                    <button type="submit" class="primary-btn">
                        <i class="fas fa-music"></i> Subir Canción
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script src="admin-script.js"></script>
</body>

</html>```

## 5. admin-styles.css
```css
/* ========================================
   🎨 ADMIN PANEL STYLES - PROFESSIONAL DESIGN
   ======================================== */

:root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --secondary: #ec4899;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --dark: #1e293b;
    --dark-light: #334155;
    --gray: #64748b;
    --gray-light: #cbd5e1;
    --white: #ffffff;
    --bg: #f8fafc;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--dark);
    overflow-x: hidden;
}

.hidden {
    display: none !important;
}

/* ========================================
   LOGIN SCREEN
   ======================================== */

.login-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    padding: 20px;
}

.login-container {
    background: var(--white);
    padding: 50px 40px;
    border-radius: 20px;
    box-shadow: var(--shadow-lg);
    max-width: 450px;
    width: 100%;
    animation: slideUp 0.5s ease;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.login-header {
    text-align: center;
    margin-bottom: 40px;
}

.login-header i {
    font-size: 60px;
    color: var(--primary);
    margin-bottom: 20px;
}

.login-header h1 {
    font-size: 28px;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 10px;
}

.login-header p {
    color: var(--gray);
    font-size: 14px;
}

.input-group {
    position: relative;
    margin-bottom: 25px;
}

.input-group i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray);
    font-size: 18px;
}

.input-group input {
    width: 100%;
    padding: 15px 15px 15px 50px;
    border: 2px solid var(--gray-light);
    border-radius: 10px;
    font-size: 15px;
    font-family: 'Outfit', sans-serif;
    transition: all 0.3s ease;
}

.input-group input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.login-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: var(--white);
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.back-link {
    display: block;
    text-align: center;
    margin-top: 25px;
    color: var(--gray);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
}

.back-link:hover {
    color: var(--primary);
}

/* ========================================
   ADMIN DASHBOARD LAYOUT
   ======================================== */

.admin-dashboard {
    display: flex;
    min-height: 100vh;
}

/* ========================================
   SIDEBAR
   ======================================== */

.sidebar {
    width: 280px;
    background: var(--dark);
    color: var(--white);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    z-index: 100;
}

.sidebar-header {
    padding: 30px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
}

.sidebar-header i {
    font-size: 32px;
    color: var(--secondary);
}

.sidebar-header h2 {
    font-size: 24px;
    font-weight: 800;
}

.sidebar-nav {
    flex: 1;
    padding: 20px 0;
}

.nav-item {
    width: 100%;
    padding: 15px 25px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 15px;
    border-left: 3px solid transparent;
    font-family: 'Outfit', sans-serif;
}

.nav-item i {
    font-size: 18px;
    width: 20px;
}

.nav-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--white);
}

.nav-item.active {
    background: rgba(99, 102, 241, 0.1);
    color: var(--white);
    border-left-color: var(--primary);
}

.sidebar-footer {
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-btn {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: var(--white);
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: 'Outfit', sans-serif;
}

.footer-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* ========================================
   MAIN CONTENT
   ======================================== */

.main-content {
    flex: 1;
    margin-left: 280px;
    background: var(--bg);
}

.content-header {
    background: var(--white);
    padding: 25px 40px;
    border-bottom: 1px solid var(--gray-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 50;
}

.header-left h1 {
    font-size: 28px;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 5px;
}

.header-left p {
    color: var(--gray);
    font-size: 14px;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.user-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 18px;
}

.user-info span {
    font-weight: 600;
    color: var(--dark);
}

/* ========================================
   CONTENT BODY
   ======================================== */

.content-body {
    padding: 40px;
}

.content-section {
    display: none;
}

.content-section.active {
    display: block;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ========================================
   STATS GRID (Overview)
   ======================================== */

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.stat-card {
    background: var(--white);
    padding: 25px;
    border-radius: 15px;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: var(--white);
}

.stat-icon.blue {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.stat-icon.green {
    background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.purple {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stat-icon.orange {
    background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-info h3 {
    font-size: 32px;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 5px;
}

.stat-info p {
    color: var(--gray);
    font-size: 14px;
}

/* ========================================
   QUICK ACTIONS
   ======================================== */

.quick-actions {
    background: var(--white);
    padding: 30px;
    border-radius: 15px;
    box-shadow: var(--shadow);
}

.quick-actions h2 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 25px;
    color: var(--dark);
}

.actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.action-card {
    padding: 25px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border: none;
    border-radius: 12px;
    color: var(--white);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-family: 'Outfit', sans-serif;
}

.action-card i {
    font-size: 32px;
}

.action-card span {
    font-size: 15px;
    font-weight: 600;
}

.action-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

/* ========================================
   EDITOR CONTAINER
   ======================================== */

.editor-container {
    background: var(--white);
    padding: 30px;
    border-radius: 15px;
    box-shadow: var(--shadow);
}

.editor-container h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    color: var(--dark);
}

.section-desc {
    color: var(--gray);
    margin-bottom: 30px;
}

.editor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
}

.editor-card {
    background: var(--bg);
    padding: 25px;
    border-radius: 12px;
    border: 2px solid var(--gray-light);
}

.editor-card h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--dark);
    display: flex;
    align-items: center;
    gap: 10px;
}

.editor-card h3 i {
    color: var(--primary);
}

/* ========================================
   FORM ELEMENTS
   ======================================== */

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--dark);
    font-size: 14px;
}

.form-input,
.form-textarea,
.form-select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid var(--gray-light);
    border-radius: 8px;
    font-size: 15px;
    font-family: 'Outfit', sans-serif;
    transition: all 0.3s ease;
    background: var(--white);
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
}

.color-input {
    width: 100%;
    height: 50px;
    border: 2px solid var(--gray-light);
    border-radius: 8px;
    cursor: pointer;
}

/* ========================================
   BUTTONS
   ======================================== */

.save-btn,
.primary-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: var(--white);
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Outfit', sans-serif;
}

.save-btn:hover,
.primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.cancel-btn {
    padding: 12px 24px;
    background: var(--gray-light);
    color: var(--dark);
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Outfit', sans-serif;
}

.cancel-btn:hover {
    background: var(--gray);
    color: var(--white);
}

.action-btn {
    width: 100%;
    padding: 12px;
    background: var(--white);
    border: 2px solid var(--gray-light);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'Outfit', sans-serif;
}

.action-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
}

.action-btn.danger:hover {
    border-color: var(--danger);
    color: var(--danger);
}

/* ========================================
   SECTION HEADERS
   ======================================== */

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.section-header h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--dark);
}

/* ========================================
   PHOTOS GRID
   ======================================== */

.photos-manager,
.stories-manager,
.music-manager,
.achievements-manager,
.milestones-manager {
    background: var(--white);
    padding: 30px;
    border-radius: 15px;
    box-shadow: var(--shadow);
}

.admin-photos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.admin-photo-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
}

.admin-photo-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.admin-photo-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.photo-card-info {
    padding: 15px;
    background: var(--white);
}

.photo-card-info h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    color: var(--dark);
}

.photo-card-info p {
    font-size: 13px;
    color: var(--gray);
}

.photo-card-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.photo-card-actions button {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Outfit', sans-serif;
}

.edit-photo-btn {
    background: var(--primary);
    color: var(--white);
}

.delete-photo-btn {
    background: var(--danger);
    color: var(--white);
}

/* ========================================
   LISTS (Stories, Music, etc.)
   ======================================== */

.stories-list,
.music-list,
.achievements-list,
.milestones-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.list-item {
    background: var(--bg);
    padding: 20px;
    border-radius: 12px;
    border: 2px solid var(--gray-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
}

.list-item:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow);
}

.list-item-info {
    flex: 1;
}

.list-item-info h4 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
    color: var(--dark);
}

.list-item-info p {
    font-size: 14px;
    color: var(--gray);
}

.list-item-actions {
    display: flex;
    gap: 10px;
}

.list-item-actions button {
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Outfit', sans-serif;
}

.edit-btn {
    background: var(--primary);
    color: var(--white);
}

.delete-btn {
    background: var(--danger);
    color: var(--white);
}

/* ========================================
   SETTINGS
   ======================================== */

.settings-container {
    background: var(--white);
    padding: 30px;
    border-radius: 15px;
    box-shadow: var(--shadow);
}

.settings-container h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
    color: var(--dark);
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
}

.settings-card {
    background: var(--bg);
    padding: 25px;
    border-radius: 12px;
    border: 2px solid var(--gray-light);
}

.settings-card h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--dark);
    display: flex;
    align-items: center;
    gap: 10px;
}

.settings-card h3 i {
    color: var(--primary);
}

/* ========================================
   MODALS
   ======================================== */

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
}

.modal.active {
    display: flex;
}

.modal-content {
    background: var(--white);
    border-radius: 20px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
    animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-header {
    padding: 25px 30px;
    border-bottom: 2px solid var(--gray-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    font-size: 22px;
    font-weight: 700;
    color: var(--dark);
}

.close-modal {
    width: 40px;
    height: 40px;
    border: none;
    background: var(--gray-light);
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-modal:hover {
    background: var(--danger);
    color: var(--white);
}

.modal-content form {
    padding: 30px;
}

.modal-footer {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 25px;
}

.file-upload {
    border: 2px dashed var(--gray-light);
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

.file-upload:hover {
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.05);
}

.file-preview {
    margin-top: 20px;
}

.file-preview img {
    max-width: 100%;
    border-radius: 12px;
}

/* ========================================
   RESPONSIVE DESIGN
   ======================================== */

@media (max-width: 1024px) {
    .sidebar {
        width: 250px;
    }

    .main-content {
        margin-left: 250px;
    }
}

@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        position: relative;
        height: auto;
    }

    .main-content {
        margin-left: 0;
    }

    .content-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }

    .stats-grid,
    .editor-grid,
    .settings-grid {
        grid-template-columns: 1fr;
    }

    .actions-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .content-body {
        padding: 20px;
    }

    .actions-grid {
        grid-template-columns: 1fr;
    }

    .admin-photos-grid {
        grid-template-columns: 1fr;
    }
}```

## 6. admin-script.js
```javascript
// ========================================
// 🔐 FIREBASE CONFIGURATION
// ========================================

const firebaseConfig = {
    apiKey: "AIzaSyDesr25T22dRcgQ_mckKnj-OlRs5rXZShw",
    authDomain: "web-mateo.firebaseapp.com",
    projectId: "web-mateo",
    storageBucket: "web-mateo.firebasestorage.app",
    messagingSenderId: "1091095734859",
    appId: "1:1091095734859:web:8b8e5f6a3c4d2e1f9a8b7c"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// ========================================
// 🔑 AUTHENTICATION
// ========================================

const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');
const adminLoginForm = document.getElementById('adminLoginForm');
const logoutAdminBtn = document.getElementById('logoutAdminBtn');

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        showDashboard();
        loadDashboardData();
    } else {
        showLoginScreen();
    }
});

// Login
adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        showNotification('¡Bienvenido!', 'success');
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
});

// Logout
logoutAdminBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        showNotification('Sesión cerrada', 'success');
    } catch (error) {
        showNotification('Error al cerrar sesión', 'error');
    }
});

function showLoginScreen() {
    loginScreen.classList.remove('hidden');
    adminDashboard.classList.add('hidden');
}

function showDashboard() {
    loginScreen.classList.add('hidden');
    adminDashboard.classList.remove('hidden');
}

// ========================================
// 📊 NAVIGATION
// ========================================

const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const sectionTitle = document.getElementById('sectionTitle');
const sectionSubtitle = document.getElementById('sectionSubtitle');

const sectionInfo = {
    overview: {
        title: 'Resumen',
        subtitle: 'Vista general del sitio web'
    },
    content: {
        title: 'Editar Contenido',
        subtitle: 'Modifica los textos y contenidos de la página'
    },
    photos: {
        title: 'Gestión de Fotos',
        subtitle: 'Administra las fotos de la galería'
    },
    stories: {
        title: 'Gestión de Cuentos',
        subtitle: 'Crea y edita historias para Mateo'
    },
    music: {
        title: 'Gestión de Playlist',
        subtitle: 'Administra la música del sitio'
    },
    achievements: {
        title: 'Gestión de Logros',
        subtitle: 'Registra los logros de Mateo'
    },
    milestones: {
        title: 'Gestión de Hitos',
        subtitle: 'Momentos especiales e importantes'
    },
    settings: {
        title: 'Configuración',
        subtitle: 'Ajustes generales del sitio'
    }
};

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const section = item.dataset.section;
        switchSection(section);
    });
});

function switchSection(section) {
    // Update nav items
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');

    // Update content sections
    contentSections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${section}Section`).classList.add('active');

    // Update header
    const info = sectionInfo[section];
    sectionTitle.textContent = info.title;
    sectionSubtitle.textContent = info.subtitle;

    // Load section data
    loadSectionData(section);
}

// ========================================
// 📈 DASHBOARD DATA
// ========================================

async function loadDashboardData() {
    try {
        // Load visitor count
        const visitorDoc = await db.collection('stats').doc('visitors').get();
        if (visitorDoc.exists) {
            document.getElementById('totalVisits').textContent = visitorDoc.data().count || 0;
        }

        // Load photos count
        const photosSnapshot = await db.collection('photos').get();
        document.getElementById('totalPhotos').textContent = photosSnapshot.size;

        // Load comments count
        let commentsCount = 0;
        photosSnapshot.forEach(doc => {
            const comments = doc.data().comments || [];
            commentsCount += comments.length;
        });
        document.getElementById('totalComments').textContent = commentsCount;

        // Load likes count
        let likesCount = 0;
        photosSnapshot.forEach(doc => {
            likesCount += doc.data().likes || 0;
        });
        document.getElementById('totalLikes').textContent = likesCount;

    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

function loadSectionData(section) {
    switch (section) {
        case 'photos':
            loadPhotosManager();
            break;
        case 'stories':
            loadStoriesManager();
            break;
        case 'music':
            loadMusicManager();
            break;
        case 'achievements':
            loadAchievementsManager();
            break;
        case 'milestones':
            loadMilestonesManager();
            break;
        case 'content':
            loadContentEditor();
            break;
    }
}

// ========================================
// 📝 CONTENT EDITOR
// ========================================

async function loadContentEditor() {
    try {
        const contentDoc = await db.collection('settings').doc('content').get();
        if (contentDoc.exists) {
            const data = contentDoc.data();

            // Hero section
            if (data.hero) {
                document.getElementById('heroTitle').value = data.hero.title || '';
                document.getElementById('heroSubtitle').value = data.hero.subtitle || '';
            }

            // Mateo today
            if (data.mateoToday) {
                document.getElementById('dailyQuote').value = data.mateoToday.quote || '';
                document.getElementById('favoriteActivity').value = data.mateoToday.activity || '';
            }

            // Mateo data
            if (data.mateoData) {
                document.getElementById('mateoBirthdate').value = data.mateoData.birthdate || '';
                document.getElementById('mateoHeight').value = data.mateoData.height || '';
                document.getElementById('mateoWeight').value = data.mateoData.weight || '';
            }
        }
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

async function saveHeroContent() {
    const title = document.getElementById('heroTitle').value;
    const subtitle = document.getElementById('heroSubtitle').value;

    try {
        await db.collection('settings').doc('content').set({
            hero: { title, subtitle }
        }, { merge: true });

        showNotification('Contenido guardado exitosamente', 'success');
    } catch (error) {
        showNotification('Error al guardar: ' + error.message, 'error');
    }
}

async function saveMateToday() {
    const quote = document.getElementById('dailyQuote').value;
    const activity = document.getElementById('favoriteActivity').value;

    try {
        await db.collection('settings').doc('content').set({
            mateoToday: { quote, activity }
        }, { merge: true });

        showNotification('Contenido guardado exitosamente', 'success');
    } catch (error) {
        showNotification('Error al guardar: ' + error.message, 'error');
    }
}

async function saveMateData() {
    const birthdate = document.getElementById('mateoBirthdate').value;
    const height = document.getElementById('mateoHeight').value;
    const weight = document.getElementById('mateoWeight').value;

    try {
        await db.collection('settings').doc('content').set({
            mateoData: { birthdate, height, weight }
        }, { merge: true });

        showNotification('Datos guardados exitosamente', 'success');
    } catch (error) {
        showNotification('Error al guardar: ' + error.message, 'error');
    }
}

// ========================================
// 📸 PHOTOS MANAGER
// ========================================

async function loadPhotosManager() {
    const photosGrid = document.getElementById('photosGrid');
    photosGrid.innerHTML = '<p style="text-align: center; color: #64748b;">Cargando fotos...</p>';

    try {
        const snapshot = await db.collection('photos').orderBy('timestamp', 'desc').get();

        if (snapshot.empty) {
            photosGrid.innerHTML = '<p style="text-align: center; color: #64748b;">No hay fotos aún. ¡Sube la primera!</p>';
            return;
        }

        photosGrid.innerHTML = '';

        snapshot.forEach(doc => {
            const data = doc.data();
            const photoCard = createPhotoCard(doc.id, data);
            photosGrid.appendChild(photoCard);
        });

    } catch (error) {
        console.error('Error loading photos:', error);
        photosGrid.innerHTML = '<p style="text-align: center; color: #ef4444;">Error al cargar fotos</p>';
    }
}

function createPhotoCard(id, data) {
    const card = document.createElement('div');
    card.className = 'admin-photo-card';

    card.innerHTML = `
        <img src="${data.url}" alt="${data.caption || 'Foto'}">
        <div class="photo-card-info">
            <h4>${data.caption || 'Sin título'}</h4>
            <p>${data.category || 'Sin categoría'} • ${data.likes || 0} likes</p>
            <div class="photo-card-actions">
                <button class="edit-photo-btn" onclick="editPhoto('${id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="delete-photo-btn" onclick="deletePhoto('${id}')">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `;

    return card;
}

function openUploadModal() {
    document.getElementById('uploadPhotoModal').classList.add('active');
}

// Upload photo form
document.getElementById('uploadPhotoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('photoFileInput');
    const title = document.getElementById('photoTitle').value;
    const category = document.getElementById('photoCategory').value;

    if (!fileInput.files[0]) {
        showNotification('Por favor selecciona una imagen', 'error');
        return;
    }

    try {
        showNotification('Subiendo foto...', 'info');

        // Upload to Firebase Storage
        const file = fileInput.files[0];
        const filename = `photos/${Date.now()}_${file.name}`;
        const storageRef = storage.ref(filename);

        await storageRef.put(file);
        const url = await storageRef.getDownloadURL();

        // Save to Firestore
        await db.collection('photos').add({
            url: url,
            caption: title,
            category: category,
            likes: 0,
            comments: [],
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification('¡Foto subida exitosamente!', 'success');
        closeModal('uploadPhotoModal');
        document.getElementById('uploadPhotoForm').reset();
        loadPhotosManager();

    } catch (error) {
        showNotification('Error al subir foto: ' + error.message, 'error');
    }
});

// Preview image before upload
document.getElementById('photoFileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('photoPreview').innerHTML = `
                <img src="${e.target.result}" style="max-width: 100%; border-radius: 12px;">
            `;
        };
        reader.readAsDataURL(file);
    }
});

async function deletePhoto(id) {
    if (!confirm('¿Estás seguro de eliminar esta foto? Esta acción no se puede deshacer.')) return;

    try {
        await db.collection('photos').doc(id).delete();
        showNotification('Foto eliminada correctamente', 'success');
        loadPhotosManager();
    } catch (error) {
        showNotification('Error al eliminar: ' + error.message, 'error');
    }
}

// --- Edit Photo Logic ---

async function editPhoto(id) {
    try {
        const doc = await db.collection('photos').doc(id).get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('editPhotoId').value = id;
            document.getElementById('editPhotoTitle').value = data.caption || '';
            document.getElementById('editPhotoCategory').value = data.category || 'family';

            document.getElementById('editPhotoModal').classList.add('active');
        } else {
            showNotification('La foto no existe', 'error');
        }
    } catch (error) {
        showNotification('Error al cargar datos de la foto', 'error');
    }
}

document.getElementById('editPhotoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editPhotoId').value;
    const caption = document.getElementById('editPhotoTitle').value;
    const category = document.getElementById('editPhotoCategory').value;

    try {
        await db.collection('photos').doc(id).update({
            caption: caption,
            category: category
        });

        showNotification('Foto actualizada correctamente', 'success');
        closeModal('editPhotoModal');
        loadPhotosManager();
    } catch (error) {
        showNotification('Error al actualizar: ' + error.message, 'error');
    }
});

// ========================================
// 📚 STORIES MANAGER
// ========================================

async function loadStoriesManager() {
    const storiesList = document.getElementById('storiesList');
    storiesList.innerHTML = '<p style="text-align: center; color: #64748b;">Cargando cuentos...</p>';

    try {
        const snapshot = await db.collection('stories').orderBy('timestamp', 'desc').get();

        if (snapshot.empty) {
            storiesList.innerHTML = '<p style="text-align: center; color: #64748b;">No hay cuentos aún. ¡Crea el primero!</p>';
            return;
        }

        storiesList.innerHTML = '';

        snapshot.forEach(doc => {
            const data = doc.data();
            const storyItem = createStoryItem(doc.id, data);
            storiesList.appendChild(storyItem);
        });

    } catch (error) {
        console.error('Error loading stories:', error);
        storiesList.innerHTML = '<p style="text-align: center; color: #ef4444;">Error al cargar cuentos</p>';
    }
}

function createStoryItem(id, data) {
    const item = document.createElement('div');
    item.className = 'list-item';

    item.innerHTML = `
        <div class="list-item-info">
            <h4>${data.emoji || '📖'} ${data.title}</h4>
            <p>${data.content.substring(0, 100)}...</p>
        </div>
        <div class="list-item-actions">
            <button class="edit-btn" onclick="editStory('${id}')">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button class="delete-btn" onclick="deleteStory('${id}')">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        </div>
    `;

    return item;
}

function openStoryModal(id = null) {
    document.getElementById('storyModal').classList.add('active');
    if (id) {
        // Load story data for editing
        loadStoryForEdit(id);
    } else {
        document.getElementById('storyForm').reset();
        document.getElementById('storyId').value = '';
        document.getElementById('storyModalTitle').textContent = 'Nuevo Cuento';
    }
}

async function loadStoryForEdit(id) {
    try {
        const doc = await db.collection('stories').doc(id).get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('storyId').value = id;
            document.getElementById('storyTitle').value = data.title;
            document.getElementById('storyEmoji').value = data.emoji || '';
            document.getElementById('storyContent').value = data.content;
            document.getElementById('storyModalTitle').textContent = 'Editar Cuento';
        }
    } catch (error) {
        showNotification('Error al cargar cuento', 'error');
    }
}

function editStory(id) {
    openStoryModal(id);
}

document.getElementById('storyForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('storyId').value;
    const title = document.getElementById('storyTitle').value;
    const emoji = document.getElementById('storyEmoji').value;
    const content = document.getElementById('storyContent').value;

    const storyData = {
        title,
        emoji,
        content,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        if (id) {
            // Update existing story
            await db.collection('stories').doc(id).update(storyData);
            showNotification('Cuento actualizado', 'success');
        } else {
            // Create new story
            await db.collection('stories').add(storyData);
            showNotification('Cuento creado', 'success');
        }

        closeModal('storyModal');
        loadStoriesManager();
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
});

async function deleteStory(id) {
    if (!confirm('¿Eliminar este cuento?')) return;

    try {
        await db.collection('stories').doc(id).delete();
        showNotification('Cuento eliminado', 'success');
        loadStoriesManager();
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
}

// ========================================
// 🎵 MUSIC MANAGER
// ========================================

async function loadMusicManager() {
    const musicList = document.getElementById('musicList');
    musicList.innerHTML = `
        <div style="margin-bottom: 20px;">
            <button class="primary-btn" onclick="openMusicModal()">
                <i class="fas fa-plus"></i> Agregar Canción
            </button>
        </div>
        <div id="songsContainer">
            <p style="text-align: center; color: #64748b;">Cargando playlist...</p>
        </div>
    `;

    try {
        const snapshot = await db.collection('music').orderBy('timestamp', 'desc').get();
        const container = document.getElementById('songsContainer');

        if (snapshot.empty) {
            container.innerHTML = '<p style="text-align: center; color: #64748b;">No hay canciones. ¡Sube la primera!</p>';
            return;
        }

        container.innerHTML = '';

        snapshot.forEach(doc => {
            const data = doc.data();
            const item = createMusicItem(doc.id, data);
            container.appendChild(item);
        });

    } catch (error) {
        console.error('Error loading music:', error);
        document.getElementById('songsContainer').innerHTML = '<p style="text-align: center; color: #ef4444;">Error al cargar música</p>';
    }
}

function createMusicItem(id, data) {
    const item = document.createElement('div');
    item.className = 'list-item';

    item.innerHTML = `
        <div class="list-item-info">
            <h4><i class="fas fa-music"></i> ${data.title}</h4>
            <audio controls src="${data.url}" style="margin-top: 10px; width: 100%; height: 30px;"></audio>
        </div>
        <div class="list-item-actions">
            <button class="delete-btn" onclick="deleteSong('${id}')">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        </div>
    `;

    return item;
}

function openMusicModal() {
    document.getElementById('musicModal').classList.add('active');
}

document.getElementById('musicForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('musicTitle').value;
    const fileInput = document.getElementById('musicFile');

    if (!fileInput.files[0]) {
        showNotification('Selecciona un archivo de audio', 'error');
        return;
    }

    try {
        showNotification('Subiendo canción...', 'info');

        const file = fileInput.files[0];
        const filename = `music/${Date.now()}_${file.name}`;
        const storageRef = storage.ref(filename);

        await storageRef.put(file);
        const url = await storageRef.getDownloadURL();

        await db.collection('music').add({
            title: title,
            url: url,
            emoji: '🎵',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification('Canción agregada exitosamente', 'success');
        closeModal('musicModal');
        document.getElementById('musicForm').reset();
        loadMusicManager();

    } catch (error) {
        showNotification('Error al subir: ' + error.message, 'error');
    }
});

async function deleteSong(id) {
    if (!confirm('¿Eliminar esta canción?')) return;

    try {
        await db.collection('music').doc(id).delete();
        showNotification('Canción eliminada', 'success');
        loadMusicManager();
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
}

// ========================================
// 🏆 ACHIEVEMENTS MANAGER
// ========================================

async function loadAchievementsManager() {
    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = '<p style="text-align: center; color: #64748b;">Cargando logros...</p>';

    try {
        const snapshot = await db.collection('achievements').orderBy('date', 'desc').get();

        if (snapshot.empty) {
            achievementsList.innerHTML = '<p style="text-align: center; color: #64748b;">No hay logros aún. ¡Agrega el primero!</p>';
            return;
        }

        achievementsList.innerHTML = '';

        snapshot.forEach(doc => {
            const data = doc.data();
            const item = createAchievementItem(doc.id, data);
            achievementsList.appendChild(item);
        });

    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

function createAchievementItem(id, data) {
    const item = document.createElement('div');
    item.className = 'list-item';

    const date = data.date ? new Date(data.date).toLocaleDateString() : 'Sin fecha';

    item.innerHTML = `
        <div class="list-item-info">
            <h4>${data.icon || '🏆'} ${data.title}</h4>
            <p>${data.description} • ${date}</p>
        </div>
        <div class="list-item-actions">
            <button class="delete-btn" onclick="deleteAchievement('${id}')">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        </div>
    `;

    return item;
}

function openAchievementModal() {
    document.getElementById('achievementModal').classList.add('active');
}

document.getElementById('achievementForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('achievementTitle').value;
    const description = document.getElementById('achievementDesc').value;
    const icon = document.getElementById('achievementIcon').value;
    const date = document.getElementById('achievementDate').value;

    try {
        await db.collection('achievements').add({
            title,
            description,
            icon,
            date,
            unlocked: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification('Logro agregado', 'success');
        closeModal('achievementModal');
        document.getElementById('achievementForm').reset();
        loadAchievementsManager();
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
});

async function deleteAchievement(id) {
    if (!confirm('¿Eliminar este logro?')) return;

    try {
        await db.collection('achievements').doc(id).delete();
        showNotification('Logro eliminado', 'success');
        loadAchievementsManager();
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
}

// ========================================
// 📅 MILESTONES MANAGER
// ========================================

async function loadMilestonesManager() {
    const milestonesList = document.getElementById('milestonesList');
    milestonesList.innerHTML = '<p style="text-align: center; color: #64748b;">Cargando hitos...</p>';

    try {
        const snapshot = await db.collection('milestones').orderBy('date', 'desc').get();

        if (snapshot.empty) {
            milestonesList.innerHTML = '<p style="text-align: center; color: #64748b;">No hay hitos aún. ¡Agrega el primero!</p>';
            return;
        }

        milestonesList.innerHTML = '';

        snapshot.forEach(doc => {
            const data = doc.data();
            const item = createMilestoneItem(doc.id, data);
            milestonesList.appendChild(item);
        });

    } catch (error) {
        console.error('Error loading milestones:', error);
    }
}

function createMilestoneItem(id, data) {
    const item = document.createElement('div');
    item.className = 'list-item';

    const date = data.date ? new Date(data.date).toLocaleDateString() : 'Sin fecha';

    item.innerHTML = `
        <div class="list-item-info">
            <h4>${data.icon || '🎉'} ${data.title}</h4>
            <p>${data.description} • ${date}</p>
        </div>
        <div class="list-item-actions">
            <button class="delete-btn" onclick="deleteMilestone('${id}')">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        </div>
    `;

    return item;
}

function openMilestoneModal() {
    document.getElementById('milestoneModal').classList.add('active');
}

document.getElementById('milestoneForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('milestoneTitle').value;
    const description = document.getElementById('milestoneDesc').value;
    const date = document.getElementById('milestoneDate').value;
    const icon = document.getElementById('milestoneIcon').value;

    try {
        await db.collection('milestones').add({
            title,
            description,
            date,
            icon,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        showNotification('Hito agregado', 'success');
        closeModal('milestoneModal');
        document.getElementById('milestoneForm').reset();
        loadMilestonesManager();
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
});

async function deleteMilestone(id) {
    if (!confirm('¿Eliminar este hito?')) return;

    try {
        await db.collection('milestones').doc(id).delete();
        showNotification('Hito eliminado', 'success');
        loadMilestonesManager();
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
}

// ========================================
// ⚙️ SETTINGS
// ========================================

async function saveThemeSettings() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;

    try {
        await db.collection('settings').doc('theme').set({
            primaryColor,
            secondaryColor
        });

        showNotification('Tema guardado', 'success');
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
}

async function saveSiteInfo() {
    const title = document.getElementById('siteTitle').value;
    const description = document.getElementById('siteDescription').value;

    try {
        await db.collection('settings').doc('site').set({
            title,
            description
        });

        showNotification('Información guardada', 'success');
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
}

async function exportData() {
    if (!confirm('¿Quieres descargar una copia de seguridad de todos los datos del sitio?')) return;

    showNotification('Generando copia de seguridad...', 'info');

    const backup = {
        timestamp: new Date().toISOString(),
        photos: [],
        stories: [],
        achievements: [],
        milestones: [],
        music: [],
        settings: {}
    };

    try {
        // 1. Export Photos
        const photosSnap = await db.collection('photos').get();
        photosSnap.forEach(doc => backup.photos.push({ id: doc.id, ...doc.data() }));

        // 2. Export Stories
        const storiesSnap = await db.collection('stories').get();
        storiesSnap.forEach(doc => backup.stories.push({ id: doc.id, ...doc.data() }));

        // 3. Export Achievements
        const achSnap = await db.collection('achievements').get();
        achSnap.forEach(doc => backup.achievements.push({ id: doc.id, ...doc.data() }));

        // 4. Export Milestones
        const mileSnap = await db.collection('milestones').get();
        mileSnap.forEach(doc => backup.milestones.push({ id: doc.id, ...doc.data() }));

        // 5. Export Music
        const musicSnap = await db.collection('music').get();
        musicSnap.forEach(doc => backup.music.push({ id: doc.id, ...doc.data() }));

        // 6. Export Settings
        const settingsSnap = await db.collection('settings').get();
        settingsSnap.forEach(doc => backup.settings[doc.id] = doc.data());

        // Create and download JSON file
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `backup_mateo_web_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

        showNotification('¡Copia de seguridad descargada!', 'success');

    } catch (error) {
        console.error('Export error:', error);
        showNotification('Error al exportar: ' + error.message, 'error');
    }
}

async function importData() {
    document.getElementById('importFileInput').click();
}

// Handle File Import
document.getElementById('importFileInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!confirm('⚠️ ADVERTENCIA: Importar datos sobrescribirá la información existente con el mismo ID. ¿Estás seguro de continuar?')) {
        e.target.value = ''; // Reset input
        return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
        try {
            const data = JSON.parse(event.target.result);
            showNotification('Iniciando restauración...', 'info');
            let count = 0;

            // Helper to restore collection
            const restoreCollection = async (collectionName, items) => {
                if (!items || !Array.isArray(items)) return;
                const batch = db.batch();
                items.forEach(item => {
                    const { id, ...docData } = item;
                    // Convert timestamps back to Firestore Timestamps if needed
                    if (docData.timestamp && typeof docData.timestamp === 'string') {
                        // Simple check, might need more robust parsing if strictly needed as Timestamp object
                        // But Firestore accepts Date objects or ISO strings usually
                    }
                    const ref = db.collection(collectionName).doc(id);
                    batch.set(ref, docData, { merge: true });
                    count++;
                });
                await batch.commit();
            };

            // Restore all collections
            await restoreCollection('photos', data.photos);
            await restoreCollection('stories', data.stories);
            await restoreCollection('achievements', data.achievements);
            await restoreCollection('milestones', data.milestones);
            await restoreCollection('music', data.music);

            // Restore Settings
            if (data.settings) {
                for (const [key, value] of Object.entries(data.settings)) {
                    await db.collection('settings').doc(key).set(value, { merge: true });
                }
            }

            showNotification(`¡Restauración completada! ${count} elementos procesados.`, 'success');

            // Reload current view
            const activeNav = document.querySelector('.nav-item.active');
            if (activeNav) {
                loadSectionData(activeNav.dataset.section);
            }

        } catch (error) {
            console.error('Import error:', error);
            showNotification('Error al importar archivo: ' + error.message, 'error');
        }
        e.target.value = ''; // Reset input
    };

    reader.readAsText(file);
});

async function clearCache() {
    if (!confirm('¿Limpiar caché del navegador?')) return;

    localStorage.clear();
    showNotification('Caché limpiado', 'success');
}

// ========================================
// 🔧 UTILITY FUNCTIONS
// ========================================

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modals when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// View site button
document.getElementById('viewSiteBtn').addEventListener('click', () => {
    window.open('index.html', '_blank');
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
```
