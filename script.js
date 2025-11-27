// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDesr25T22dRcgQ_mckKnj-OlRs5rXZShw",
    authDomain: "web-mateo.firebaseapp.com",
    projectId: "web-mateo",
    storageBucket: "web-mateo.firebasestorage.app",
    messagingSenderId: "1022636533086",
    appId: "1:1022636533086:web:5fa482ea817a3d74409bcf",
    measurementId: "G-G6RCZJC2DJ"
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
        colors: ['#ff00cc', '#FFD700', '#00d4ff']
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

function loadPlaylist() {
    const playlistContainer = document.getElementById('playlistItems');
    if (!playlistContainer) return;

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
            colors: ['#ff00cc', '#FFD700', '#00d4ff']
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
            gradient.addColorStop(0, '#ff00cc');
            gradient.addColorStop(0.5, '#FFD700');
            gradient.addColorStop(1, '#00d4ff');

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
function renderGallery() {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = '<p style="text-align: center; color: #fff; padding: 40px;">Cargando fotos...</p>';

    // Cargar fotos desde Firebase en tiempo real
    if (db) {
        db.collection('photos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            // Reiniciar la lista con las fotos estáticas base
            let currentPhotos = [...galleryData];

            snapshot.forEach(doc => {
                const data = doc.data();
                // Agregar fotos de Firebase al principio
                currentPhotos.unshift({
                    id: doc.id,
                    img: data.url,
                    title: data.caption || 'Sin título',
                    desc: data.category || 'Foto de la familia',
                    isFirebase: true
                });
            });

            // Renderizar la galería actualizada
            renderPhotosToDOM(currentPhotos);
        });
    } else {
        // Si no hay base de datos, mostrar solo las estáticas
        renderPhotosToDOM(galleryData);
    }
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
                    <button class="action-btn share-btn"><i class="far fa-paper-plane"></i></button>
                </div>
            </div>
        `;

        // Add Event Listeners immediately
        card.querySelector('.card-image').addEventListener('click', () => openPostModal(item.img, item.id, item.title, item.desc));

        // Like button functionality
        const likeBtn = card.querySelector('.like-btn');
        if (likeBtn && db) {
            likeBtn.addEventListener('click', () => {
                const photoId = item.id;

                // Para fotos de Firebase, usar la colección 'photos'
                if (item.isFirebase) {
                    const photoRef = db.collection('photos').doc(photoId);
                    photoRef.get().then(doc => {
                        if (doc.exists) {
                            const currentLikes = doc.data().likes || 0;
                            photoRef.update({ likes: currentLikes + 1 });
                            celebrateLike(likeBtn);
                        }
                    });
                } else {
                    // Para fotos estáticas, usar la colección 'likes'
                    const likeRef = db.collection('likes').doc(photoId);
                    likeRef.get().then(doc => {
                        const currentCount = doc.exists ? (doc.data().count || 0) : 0;
                        likeRef.set({ count: currentCount + 1 });
                        celebrateLike(likeBtn);
                    });
                }
            });

            // Load initial comments count
            db.collection('comments').where('photoId', '==', item.id).onSnapshot(snapshot => {
                const countSpan = card.querySelector(`.comment-btn[data-id="${item.id}"] .count`);
                if (countSpan) countSpan.textContent = snapshot.size;
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

function renderStories() {
    const container = document.getElementById('storiesContainer');
    if (!container) return;
    container.innerHTML = '';

    storiesData.forEach((story, index) => {
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

        slides[currentStory].classList.remove('active');
        currentStory = (currentStory + 1) % slides.length;
        slides[currentStory].classList.add('active');

        // Reset scroll to top for the new slide
        slides[currentStory].scrollTop = 0;
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

function loadAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    grid.innerHTML = achievementsData.map((achievement, index) => `
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

function loadMilestones() {
    const list = document.getElementById('milestonesList');
    if (!list) return;

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

    // Actualizar estadísticas cada hora
    setInterval(updateStatsDashboard, 1000 * 60 * 60);

    // Reinicializar AOS para las nuevas secciones
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

