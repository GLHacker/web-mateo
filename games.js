// ==========================================
// 🎮 MATEO WEB - GAMES LOGIC
// ==========================================

let currentGame = null;
let gameInterval = null;
let gameScore = 0;
let activeTimeouts = [];

// --- UTILITIES ---

/**
 * Safe Speech Synthesis
 * @param {string} text - Text to speak
 */
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
    }
}

/**
 * Safe Timeout wrapper to track and clear timeouts
 */
function safeTimeout(callback, delay) {
    const id = setTimeout(() => {
        callback();
        activeTimeouts = activeTimeouts.filter(t => t !== id);
    }, delay);
    activeTimeouts.push(id);
    return id;
}

// --- GAME LIFECYCLE ---

function startGame(gameType) {
    const modal = document.getElementById('gameModal');
    const container = document.getElementById('gameContainer');

    if (!modal || !container) return;

    modal.classList.remove('hidden');
    currentGame = gameType;
    container.innerHTML = '';
    gameScore = 0;

    // Clear any previous state
    cleanupGame();

    try {
        switch (gameType) {
            case 'shapes':
                initShapeSorter(container);
                speak("¡Arrastra las formas a sus lugares!");
                break;
            case 'colors':
                initColorMixer(container);
                speak("¡Vamos a mezclar colores!");
                break;
            case 'counting':
                initCountingFun(container);
                speak("¡Cuenta los objetos!");
                break;
            case 'animals':
                initAnimalQuiz(container);
                speak("¡Encuentra los animales!");
                break;
            case 'music':
                initMusicMaker(container);
                speak("¡Crea tu propia música!");
                break;
            default:
                console.error("Unknown game type:", gameType);
                closeGame();
        }
    } catch (error) {
        console.error("Error starting game:", error);
        container.innerHTML = '<div class="error-message">Error al iniciar el juego.</div>';
    }
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    if (modal) modal.classList.add('hidden');

    document.getElementById('gameContainer').innerHTML = '';
    cleanupGame();
    currentGame = null;
}

function cleanupGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }

    // Clear all tracked timeouts
    activeTimeouts.forEach(id => clearTimeout(id));
    activeTimeouts = [];

    window.speechSynthesis.cancel();

    // Reset global game variables
    window.shapes = null;
    window.shapesPlaced = 0;
    window.selectedColors = [];
}

// --- GAME 1: SHAPE SORTER ---

function initShapeSorter(container) {
    const shapes = [
        { name: 'Círculo', emoji: '🔵', color: '#3b82f6' },
        { name: 'Cuadrado', emoji: '🟥', color: '#ef4444' },
        { name: 'Triángulo', emoji: '🔺', color: '#22c55e' },
        { name: 'Estrella', emoji: '⭐', color: '#fbbf24' }
    ];

    container.innerHTML = `
        <div class="game-wrapper">
            <h2 class="game-title">Clasificador de Formas</h2>
            
            <div class="drop-zones-grid">
                ${shapes.map((s, i) => `
                    <div id="zone-${i}" class="drop-zone" 
                         style="border-color: ${s.color}"
                         ondrop="dropShape(event, ${i})" ondragover="allowDrop(event)">
                        <span class="zone-label">${s.name}</span>
                    </div>
                `).join('')}
            </div>
            
            <div id="shapesArea" class="shapes-area">
                ${shapes.map((s, i) => `
                    <div id="shape-${i}" draggable="true" ondragstart="dragShape(event, ${i})"
                         class="draggable-shape">
                        ${s.emoji}
                    </div>
                `).join('')}
            </div>
            
            <div id="shapeScore" class="game-score">
                ¡Arrastra cada forma a su lugar!
            </div>
        </div>
    `;

    window.shapes = shapes;
    window.shapesPlaced = 0;
}

window.dragShape = (e, index) => {
    e.dataTransfer.setData('shapeIndex', index);
};

window.allowDrop = (e) => {
    e.preventDefault();
};

window.dropShape = (e, zoneIndex) => {
    e.preventDefault();
    const shapeIndex = parseInt(e.dataTransfer.getData('shapeIndex'));

    if (shapeIndex === zoneIndex) {
        const shape = document.getElementById(`shape-${shapeIndex}`);
        const zone = document.getElementById(`zone-${zoneIndex}`);

        if (!shape || !zone) return;

        // Correct match
        zone.innerHTML = window.shapes[shapeIndex].emoji;
        zone.classList.add('matched');
        zone.style.backgroundColor = window.shapes[shapeIndex].color + '20'; // Light background
        shape.remove();

        speak(`¡Muy bien! ${window.shapes[shapeIndex].name}`);
        confetti({ particleCount: 30, spread: 50 });

        window.shapesPlaced++;
        if (window.shapesPlaced === 4) {
            safeTimeout(() => {
                const scoreEl = document.getElementById('shapeScore');
                if (scoreEl) scoreEl.innerHTML = '🎉 ¡Perfecto! ¡Todas las formas en su lugar!';
                speak('¡Excelente trabajo!');
                confetti({ particleCount: 100, spread: 70 });
            }, 300);
        }
    } else {
        speak('Inténtalo de nuevo');
    }
};

// --- GAME 2: COLOR MIXER ---

function initColorMixer(container) {
    container.innerHTML = `
        <div class="game-wrapper center-content">
            <h2 class="game-title">Mezclador de Colores</h2>
            <p class="game-instruction">¡Toca dos colores para mezclarlos!</p>
            
            <div class="colors-row">
                <div onclick="selectColor('rojo', '#ef4444')" class="color-btn bg-red" id="color-rojo"></div>
                <div onclick="selectColor('azul', '#3b82f6')" class="color-btn bg-blue" id="color-azul"></div>
                <div onclick="selectColor('amarillo', '#fbbf24')" class="color-btn bg-yellow" id="color-amarillo"></div>
            </div>
            
            <div id="mixResult" class="mix-result">?</div>
            
            <div id="mixMessage" class="game-message">
                Selecciona dos colores
            </div>
        </div>
    `;

    window.selectedColors = [];
}

window.selectColor = (name, hex) => {
    if (window.selectedColors.length < 2) {
        window.selectedColors.push({ name, hex });
        const btn = document.getElementById(`color-${name}`);
        if (btn) btn.classList.add('selected');

        speak(name);

        if (window.selectedColors.length === 2) {
            mixColors();
        }
    }
};

window.mixColors = () => {
    const c1 = window.selectedColors[0].name;
    const c2 = window.selectedColors[1].name;
    let result = { color: '#94a3b8', name: '???' };

    // Logic for color mixing
    const pair = [c1, c2].sort().join('-');

    if (pair === 'azul-rojo') result = { color: '#8b5cf6', name: 'Morado', emoji: '💜' };
    else if (pair === 'amarillo-rojo') result = { color: '#f97316', name: 'Naranja', emoji: '🧡' };
    else if (pair === 'amarillo-azul') result = { color: '#22c55e', name: 'Verde', emoji: '💚' };

    const resultEl = document.getElementById('mixResult');
    const msgEl = document.getElementById('mixMessage');

    if (resultEl && msgEl) {
        resultEl.style.background = result.color;
        resultEl.innerHTML = result.emoji || '?';
        resultEl.classList.add('pop-animation');
        msgEl.innerHTML = `¡${c1} + ${c2} = ${result.name}!`;
    }

    speak(`¡${result.name}!`);
    confetti({ particleCount: 50, spread: 60 });

    safeTimeout(() => {
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('selected'));
        window.selectedColors = [];
        if (resultEl) {
            resultEl.style.background = '#334155';
            resultEl.innerHTML = '?';
            resultEl.classList.remove('pop-animation');
        }
        if (msgEl) msgEl.innerHTML = 'Selecciona dos colores';
    }, 3000);
};

// --- GAME 3: COUNTING FUN ---

function initCountingFun(container) {
    const emojis = ['🍎', '🚗', '⭐', '🌈', '🎈'];
    const targetCount = Math.floor(Math.random() * 5) + 1;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    container.innerHTML = `
        <div class="game-wrapper">
            <h2 class="game-title">¡A Contar!</h2>
            
            <div class="counting-area">
                ${Array(targetCount).fill(emoji).map(() => `<span class="count-item">${emoji}</span>`).join('')}
            </div>
            
            <div class="numbers-row">
                ${[1, 2, 3, 4, 5].map(n => `
                    <button onclick="checkCount(${n}, ${targetCount}, '${emoji}')" class="number-btn">
                        ${n}
                    </button>
                `).join('')}
            </div>
            
            <div id="countMessage" class="game-message">
                ¿Cuántos hay?
            </div>
        </div>
    `;

    speak(`¿Cuántos hay?`);
}

window.checkCount = (selected, correct, emoji) => {
    const msgEl = document.getElementById('countMessage');
    if (selected === correct) {
        if (msgEl) {
            msgEl.innerHTML = `¡Perfecto! Hay ${correct} ${emoji}`;
            msgEl.className = 'game-message success';
        }
        speak(`¡Muy bien! Hay ${correct}`);
        confetti({ particleCount: 50, spread: 70 });
        safeTimeout(() => initCountingFun(document.getElementById('gameContainer')), 2000);
    } else {
        if (msgEl) {
            msgEl.innerHTML = '¡Inténtalo de nuevo!';
            msgEl.className = 'game-message error';
        }
        speak('Inténtalo de nuevo');
    }
};

// --- GAME 4: ANIMAL QUIZ ---

function initAnimalQuiz(container) {
    const animals = [
        { name: 'Perro', emoji: '🐶', sound: 'Guau Guau' },
        { name: 'Gato', emoji: '🐱', sound: 'Miau Miau' },
        { name: 'Vaca', emoji: '🐮', sound: 'Muuu' },
        { name: 'Pato', emoji: '🦆', sound: 'Cuac Cuac' },
        { name: 'León', emoji: '🦁', sound: 'Grrrr' },
        { name: 'Cerdo', emoji: '🐷', sound: 'Oink Oink' }
    ];

    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    const options = [randomAnimal];

    while (options.length < 3) {
        const random = animals[Math.floor(Math.random() * animals.length)];
        if (!options.includes(random)) options.push(random);
    }
    options.sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="game-wrapper center-content">
            <h2 class="game-title">Quiz de Animales</h2>
            
            <button onclick="speakAnimalSound('${randomAnimal.name}', '${randomAnimal.sound}')" class="sound-btn">
                🔊
            </button>
            
            <p class="game-instruction">¿Qué animal hace este sonido?</p>
            
            <div class="animals-grid">
                ${options.map(a => `
                    <button onclick="selectAnimal('${a.name}', '${randomAnimal.name}')" class="animal-card">
                        <div class="animal-emoji">${a.emoji}</div>
                        <div class="animal-name">${a.name}</div>
                    </button>
                `).join('')}
            </div>
            
            <div id="quizMessage" class="game-message"></div>
        </div>
    `;

    safeTimeout(() => speak(`¿Qué animal hace este sonido? ${randomAnimal.sound}`), 500);
}

window.speakAnimalSound = (name, sound) => {
    speak(`${sound}`);
};

window.selectAnimal = (selected, correct) => {
    const msgEl = document.getElementById('quizMessage');
    if (selected === correct) {
        if (msgEl) {
            msgEl.innerHTML = '🎉 ¡Correcto!';
            msgEl.className = 'game-message success';
        }
        speak('¡Muy bien!');
        confetti({ particleCount: 50, spread: 60 });
        safeTimeout(() => initAnimalQuiz(document.getElementById('gameContainer')), 2000);
    } else {
        if (msgEl) {
            msgEl.innerHTML = '❌ Inténtalo de nuevo';
            msgEl.className = 'game-message error';
        }
        speak('Inténtalo de nuevo');
    }
};

// --- GAME 5: MUSIC MAKER ---

function initMusicMaker(container) {
    const instruments = [
        { name: 'Piano', emoji: '🎹', sound: 'Ding' },
        { name: 'Tambor', emoji: '🥁', sound: 'Boom' },
        { name: 'Guitarra', emoji: '🎸', sound: 'Tun' },
        { name: 'Trompeta', emoji: '🎺', sound: 'Paa' },
        { name: 'Flauta', emoji: '🎵', sound: 'Fiuu' },
        { name: 'Campana', emoji: '🔔', sound: 'Ding Dong' }
    ];

    container.innerHTML = `
        <div class="game-wrapper">
            <h2 class="game-title">Creador Musical</h2>
            
            <div class="instruments-grid">
                ${instruments.map(i => `
                    <button onclick="playInstrument('${i.name}', '${i.sound}', this)" class="instrument-btn">
                        <span class="inst-emoji">${i.emoji}</span>
                        <span class="inst-name">${i.name}</span>
                    </button>
                `).join('')}
            </div>
            
            <div id="musicMessage" class="game-score">
                ¡Toca los instrumentos para crear música!
            </div>
        </div>
    `;
}

window.playInstrument = (name, sound, btn) => {
    speak(`${sound}`);
    const msgEl = document.getElementById('musicMessage');
    if (msgEl) msgEl.innerHTML = `¡${name}! ${sound}`;

    // Visual feedback
    btn.classList.add('playing');
    safeTimeout(() => {
        btn.classList.remove('playing');
    }, 200);
};
