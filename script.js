// ==========================================
// 🚀 MATEO WEB - CORE LOGIC
// ==========================================

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyDesr25T22dRcgQ_mckKnj-OlRs5rXZShw",
    authDomain: "web-mateo.firebaseapp.com",
    projectId: "web-mateo",
    storageBucket: "web-mateo.firebasestorage.app",
    messagingSenderId: "1091095734859",
    appId: "1:1091095734859:web:8b8e5f6a3c4d2e1f9a8b7c"
};

// --- Initialization ---
let app, auth, db, storage;

try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    console.log("✅ Firebase initialized successfully");
} catch (e) {
    console.error("❌ Firebase init error:", e);
    showError("No se pudo conectar con el servidor. Algunas funciones pueden no estar disponibles.");
}

// --- Utility Functions ---

/**
 * Displays a user-friendly error message
 * @param {string} message - The error message to display
 */
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-toast';
    errorDiv.innerText = message;
    document.body.appendChild(errorDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.classList.add('fade-out');
        setTimeout(() => errorDiv.remove(), 500);
    }, 5000);
}

/**
 * Safe Speech Synthesis
 * @param {string} text - Text to speak
 */
function safeSpeak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
}

// --- Story Management ---

/**
 * Fetches stories from Firestore with error handling
 */
async function fetchStories() {
    if (!db) return [];
    try {
        const snapshot = await db.collection('stories').orderBy('timestamp', 'desc').get();
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error loading stories:", error);
        showError("Error al cargar los cuentos. Revisa tu conexión.");
        return null;
    }
}

/**
 * Renders stories grid
 */
async function renderStories() {
    const grid = document.getElementById('storiesGrid');
    if (!grid) return;

    grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin fa-2x"></i><p>Cargando cuentos...</p></div>';

    const stories = await fetchStories();

    if (!stories) {
        grid.innerHTML = '<div class="error-message"><p>⚠️ No se pudieron cargar los cuentos.</p></div>';
        return;
    }

    if (stories.length === 0) {
        grid.innerHTML = '<div class="empty-message"><p>No hay cuentos disponibles aún.</p></div>';
        return;
    }

    grid.innerHTML = '';

    stories.forEach((story, index) => {
        const card = document.createElement('div');
        card.className = 'story-card';
        const imgUrl = story.imageUrl || story.img || 'https://via.placeholder.com/400x300?text=Cuento';

        card.innerHTML = `
            <img src="${imgUrl}" alt="${story.title}" loading="lazy">
            <div class="story-card-content">
                <h3>${story.emoji || ''} ${story.title}</h3>
                <button class="read-btn" aria-label="Leer ${story.title}">Leer Historia</button>
            </div>
        `;
        card.onclick = () => openStoryModal(stories, index);
        grid.appendChild(card);
    });
}

// --- Story Reader (Full Screen with 3D Effects) ---

function openStoryModal(stories, startIndex) {
    const modal = document.getElementById('storyModal');
    const content = document.getElementById('storyContentModal');

    if (!modal || !content) return;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    const story = stories[startIndex];
    const imgUrl = story.imageUrl || story.img || 'https://via.placeholder.com/800x400?text=Cuento';

    content.innerHTML = `
        <div class="story-particles" id="storyParticles"></div>
        
        <div class="reader-header">
            <span class="reader-title">${story.emoji || ''} ${story.title}</span>
            <button class="close-reader-btn" onclick="closeStoryModal()" aria-label="Cerrar cuento">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="reader-content">
            <img src="${imgUrl}" alt="${story.title}" class="reader-hero-img" id="heroImage">
            <div class="reader-text">
                ${formatStoryText(story.content)}
            </div>
        </div>
    `;

    // Reset container styles
    Object.assign(content.style, {
        background: 'transparent',
        boxShadow: 'none',
        maxWidth: '100%',
        padding: '0',
        height: '100%',
        borderRadius: '0'
    });

    initStoryParticles();
    initParallaxEffect();
}

function closeStoryModal() {
    const modal = document.getElementById('storyModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling

        // Cleanup particles
        const particlesContainer = document.getElementById('storyParticles');
        if (particlesContainer) particlesContainer.innerHTML = '';
    }
}

// --- 3D Effects Optimization ---

function initStoryParticles() {
    const container = document.getElementById('storyParticles');
    if (!container) return;

    // Limit particles for performance
    const particles = ['✨', '⭐', '💫', '🌟'];
    const particleCount = window.innerWidth < 768 ? 8 : 15; // Fewer particles on mobile

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        fragment.appendChild(particle);
    }

    container.appendChild(fragment);
}

function initParallaxEffect() {
    const modal = document.getElementById('storyModal');
    const heroImg = document.getElementById('heroImage');

    if (!heroImg || !modal) return;

    // Use requestAnimationFrame for smooth performance
    let ticking = false;

    modal.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = modal.scrollTop;
                if (scrolled < 500) { // Only animate when visible
                    heroImg.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0001})`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

function formatStoryText(text) {
    if (!text) return '';

    const emojiMap = {
        'luna': '🌙', 'sol': '☀️', 'estrella': '⭐', 'mar': '🌊',
        'dragón': '🐉', 'castillo': '🏰', 'tesoro': '💎', 'pirata': '🏴‍☠️',
        'nube': '☁️', 'bosque': '🌲', 'árbol': '🌳', 'flor': '🌸',
        'risa': '😄', 'magia': '✨', 'juguete': '🧸', 'música': '🎵'
    };

    return text.split('\n').map(p => {
        if (p.trim().length === 0) return '';

        let enhanced = p;
        // Add illustrations sparingly (30% chance per paragraph)
        if (Math.random() > 0.7) {
            for (const [keyword, emoji] of Object.entries(emojiMap)) {
                if (enhanced.toLowerCase().includes(keyword)) {
                    enhanced = enhanced.replace(
                        new RegExp(`\\b${keyword}\\b`, 'gi'),
                        `$&<span class="story-illustration">${emoji}</span>`
                    );
                    break;
                }
            }
        }
        return `<p>${enhanced}</p>`;
    }).join('');
}

// --- Social Feed Logic ---

async function fetchPosts() {
    if (!db) return [];
    try {
        const snapshot = await db.collection('posts').orderBy('timestamp', 'desc').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error loading posts:", error);
        return null;
    }
}

async function renderFeed() {
    const feed = document.getElementById('socialFeed');
    if (!feed) return;

    feed.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';

    const posts = await fetchPosts();

    if (!posts) {
        feed.innerHTML = '<div class="error-message"><p>Error al cargar el feed.</p></div>';
        return;
    }

    if (posts.length === 0) {
        feed.innerHTML = '<div class="empty-message"><p>No hay publicaciones aún.</p></div>';
        return;
    }

    feed.innerHTML = '';

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'social-card';

        const isLiked = localStorage.getItem(`liked_${post.id}`) === 'true';
        const likeClass = isLiked ? 'liked' : '';
        const likeIcon = isLiked ? 'fas fa-heart' : 'far fa-heart';

        // Safe comments rendering
        const commentsHtml = (post.comments || []).map(c => `
            <div class="comment">
                <span class="username">${escapeHtml(c.user)}:</span> ${escapeHtml(c.text)}
            </div>
        `).join('');

        card.innerHTML = `
            <div class="social-header">
                <img src="images/standing.jpg" class="social-avatar" alt="User" loading="lazy">
                <div class="social-user-info">
                    <h4>Familia Mateo</h4>
                    <span>${post.location || 'En Casa'}</span>
                </div>
            </div>
            <img src="${post.imageUrl}" class="social-image" alt="Post" loading="lazy">
            <div class="social-actions">
                <button class="action-btn ${likeClass}" onclick="toggleLike('${post.id}', this)" aria-label="Me gusta">
                    <i class="${likeIcon}"></i>
                </button>
                <button class="action-btn" aria-label="Comentar"><i class="far fa-comment"></i></button>
                <button class="action-btn" aria-label="Compartir"><i class="far fa-paper-plane"></i></button>
            </div>
            <div class="social-content">
                <span class="likes-count" id="likes-${post.id}">${post.likes || 0} Me gusta</span>
                <div class="caption">
                    <span class="username">Familia Mateo</span> ${post.caption}
                </div>
                <div class="comments-list" id="comments-${post.id}">
                    ${commentsHtml}
                </div>
                <div class="comment-input-area">
                    <input type="text" placeholder="Agrega un comentario..." id="input-${post.id}" aria-label="Escribir comentario">
                    <button onclick="addComment('${post.id}')">Publicar</button>
                </div>
            </div>
        `;
        feed.appendChild(card);
    });
}

// --- Interactions ---

async function toggleLike(postId, btn) {
    if (!db) return;

    try {
        const isLiked = localStorage.getItem(`liked_${postId}`) === 'true';
        const newStatus = !isLiked;

        // Optimistic UI update
        const icon = btn.querySelector('i');
        const likesCount = document.getElementById(`likes-${postId}`);
        let currentLikes = parseInt(likesCount.innerText);

        if (newStatus) {
            btn.classList.add('liked');
            icon.className = 'fas fa-heart';
            currentLikes++;
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
        } else {
            btn.classList.remove('liked');
            icon.className = 'far fa-heart';
            currentLikes--;
        }

        likesCount.innerText = `${currentLikes} Me gusta`;
        localStorage.setItem(`liked_${postId}`, newStatus);

        // Update Firebase
        const postRef = db.collection('posts').doc(postId);
        await postRef.update({
            likes: firebase.firestore.FieldValue.increment(newStatus ? 1 : -1)
        });
    } catch (error) {
        console.error("Error toggling like:", error);
        showError("No se pudo dar like. Intenta de nuevo.");
    }
}

async function addComment(postId) {
    if (!db) return;

    const input = document.getElementById(`input-${postId}`);
    const text = input.value.trim();

    if (!text) return;

    try {
        const comment = {
            user: "Invitado",
            text: text,
            timestamp: new Date().toISOString()
        };

        // Optimistic UI update
        const commentsList = document.getElementById(`comments-${postId}`);
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `<span class="username">${comment.user}:</span> ${escapeHtml(comment.text)}`;
        commentsList.appendChild(newComment);

        input.value = '';

        // Update Firebase
        const postRef = db.collection('posts').doc(postId);
        await postRef.update({
            comments: firebase.firestore.FieldValue.arrayUnion(comment)
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        showError("No se pudo publicar el comentario.");
    }
}

// --- Navigation ---

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(el => el.classList.add('hidden'));

    // Show target section
    const target = document.getElementById(sectionId + 'Section');
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('fade-in');
    }

    // Update active nav state
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-item[onclick="showSection('${sectionId}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Load content if needed
    if (sectionId === 'stories') renderStories();
    if (sectionId === 'gallery') renderFeed();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Helpers ---

function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js background if available
    if (typeof initThreeJS === 'function') initThreeJS();

    // Load default section
    showSection('home');
});

// --- 3D Background (Three.js) ---
const initThreeJS = () => {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particlesCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1, // Primary Indigo
        transparent: true,
        opacity: 0.4,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    renderStories();
    renderGallery();

    // Default to Home or Stories? Let's default to Home
    showSection('home');
});
