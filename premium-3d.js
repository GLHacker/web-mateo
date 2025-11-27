/**
 * 🎭 ANIMACIONES 3D ULTRA-PREMIUM
 * Efectos cinematográficos avanzados
 */

/**
 * 💎 Hero Section con Parallax 3D Profundo
 */
function initAdvanced3DParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Crear capas 3D
    const layers = {
        content: document.querySelector('.hero-content'),
        background: document.querySelector('.bg-animation')
    };

    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        // Parallax en contenido con perspectiva
        if (layers.content) {
            layers.content.style.transform = `
                perspective(1000px)
                rotateY(${xAxis}deg)
                rotateX(${-yAxis}deg)
                translateZ(50px)
            `;
        }

        // Parallax en fondo
        if (layers.background) {
            layers.background.style.transform = `
                translate(${-xAxis * 2}px, ${-yAxis * 2}px)
                scale(1.1)
            `;
        }
    });

    // Resetear al salir
    hero.addEventListener('mouseleave', () => {
        if (layers.content) {
            layers.content.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
        }
        if (layers.background) {
            layers.background.style.transform = 'translate(0, 0) scale(1)';
        }
    });
}

/**
 * 🎴 Cards Flotantes con Rotación 3D Completa
 */
function initFloating3DCards() {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach((card, index) => {
        // Añadir animación flotante con delay único
        card.style.animation = `floatCard 6s ease-in-out infinite`;
        card.style.animationDelay = `${index * 0.2}s`;

        // Hover con rotación 3D extrema
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        });

        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 5;
            const rotateY = (centerX - x) / 5;

            this.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
                translateZ(20px)
            `;

            // Efecto de brillo que sigue al mouse
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            this.style.background = `
                radial-gradient(circle at ${glowX}% ${glowY}%, 
                    rgba(255, 215, 0, 0.2) 0%, 
                    transparent 50%),
                var(--glass)
            `;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)';
            this.style.background = 'var(--glass)';
        });
    });
}

/**
 * ✨ Secciones con Efecto de Capas 3D
 */
function init3DLayeredSections() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'sectionReveal 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards';

                // Animar elementos hijos con stagger
                const children = entry.target.querySelectorAll('.section-title, .glass-card, .fact-card, .stat-card');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(50px) rotateX(-15deg)';

                    setTimeout(() => {
                        child.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) rotateX(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
}

/**
 * 🎯 Timeline 3D Interactivo Real
 */
function initInteractive3DTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    const timelineItems = timeline.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        // Posicionar en 3D alternando lados
        const side = index % 2 === 0 ? 1 : -1;
        item.style.transform = `
            perspective(1000px)
            translateZ(${side * 50}px)
            rotateY(${side * 10}deg)
        `;

        // Hover effect dramático
        item.addEventListener('mouseenter', function () {
            this.style.transform = `
                perspective(1000px)
                translateZ(${side * 100}px)
                rotateY(0deg)
                scale(1.1)
            `;
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = `
                perspective(1000px)
                translateZ(${side * 50}px)
                rotateY(${side * 10}deg)
                scale(1)
            `;
            this.style.zIndex = '1';
        });
    });
}

/**
 * 🎨 Botones con Efectos Líquidos
 */
function initLiquidButtons() {
    const buttons = document.querySelectorAll('.nav-btn, .gradient-btn, button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'liquid-ripple';

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * 🖼️ Galería con Flip Cards 3D (Controlado por Botones)
 */
function initFlipCardGallery() {
    // Usar delegación de eventos para elementos dinámicos
    document.addEventListener('click', (e) => {
        // Botón de Flip (Front -> Back)
        const flipBtn = e.target.closest('.flip-btn');
        if (flipBtn) {
            e.preventDefault();
            e.stopPropagation();
            const card = flipBtn.closest('.glass-card');
            if (card) {
                card.classList.add('flipped');
            }
        }

        // Botón de Volver (Back -> Front)
        const flipBackBtn = e.target.closest('.flip-back-btn');
        if (flipBackBtn) {
            e.preventDefault();
            e.stopPropagation();
            const card = flipBackBtn.closest('.glass-card');
            if (card) {
                card.classList.remove('flipped');
            }
        }
    });
}

/**
 * 📐 Efecto Tilt 3D para Cards de 'Mateo Hoy'
 */
function init3DTiltForTodayCards() {
    const cards = document.querySelectorAll('.today-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 10; // Invertido para tilt natural
            const rotateY = (x - centerX) / 10;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/**
 * 💫 Texto con Efectos de Neón Pulsante
 */
function initNeonText() {
    const titles = document.querySelectorAll('.section-title, h1, .gradient-text');

    titles.forEach(title => {
        title.style.textShadow = `
            0 0 10px currentColor,
            0 0 20px currentColor,
            0 0 30px currentColor,
            0 0 40px currentColor
        `;
        title.style.animation = 'neonPulse 2s ease-in-out infinite';
    });
}

/**
 * 🌊 Morphing Shapes Entre Secciones
 */
function initMorphingDividers() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
        if (index === 0) return; // Skip first section

        const divider = document.createElement('div');
        divider.className = 'morphing-divider';
        divider.innerHTML = `
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                      class="shape-fill"></path>
            </svg>
        `;
        section.insertBefore(divider, section.firstChild);
    });
}

// Inicializar todas las animaciones premium
document.addEventListener('DOMContentLoaded', () => {
    initAdvanced3DParallax();
    initFloating3DCards();
    init3DLayeredSections();
    initInteractive3DTimeline();
    initLiquidButtons();
    initFlipCardGallery();
    initNeonText();
    initMorphingDividers();

    console.log('🎭 Animaciones 3D Premium activadas');
});
