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

// --- Data: Gallery ---
const galleryData = [
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
        img: "https://picsum.photos/id/1042/800/600", // Placeholder: Space/Night
        text: "Había una vez una pequeña estrella que quería ver el mundo de día. Un día, bajó del cielo y aterrizó en el jardín de Mateo. Juntos descubrieron que la luz más brillante no está en el cielo, sino en la sonrisa de un niño feliz."
    },
    {
        title: "El Bosque de los Susurros",
        img: "https://picsum.photos/id/1039/800/600", // Placeholder: Forest/Nature
        text: "En el bosque mágico, los árboles cuentan historias si te quedas muy quieto. Mateo aprendió a escuchar al viento y descubrió que cada hoja guarda un secreto de amistad y valentía."
    },
    {
        title: "El Océano de Nubes",
        img: "https://picsum.photos/id/1053/800/600", // Placeholder: Water/Sky
        text: "Mateo construyó un barco de papel y navegó por un mar de nubes blancas. Allí conoció a peces voladores que le enseñaron que los sueños, si crees en ellos, pueden llevarte a cualquier lugar."
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

let currentPostId = null;

// --- Render Gallery ---
function renderGallery() {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = '';

    galleryData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.setAttribute('data-aos', 'zoom-in-up');
        card.setAttribute('data-aos-delay', (index % 5) * 100); // Stagger animations
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

        // Load initial likes count
        if (db) {
            db.collection('likes').doc(item.id).onSnapshot(doc => {
                if (doc.exists) {
                    const count = doc.data().count || 0;
                    const countSpan = card.querySelector(`.like-btn[data-id="${item.id}"] .count`);
                    if (countSpan) countSpan.textContent = count;
                }
            });
        }

        galleryContainer.appendChild(card);
    });
}

// Call render on load
document.addEventListener('DOMContentLoaded', renderGallery);

// --- Stories Logic ---
if (storiesBtn) {
    storiesBtn.onclick = () => {
        renderStories();
        storiesModal.style.display = 'flex';
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
                    <p>${story.text}</p>
                </div>
            </div>
        `;
        container.appendChild(slide);
    });

    // Simple Carousel Logic
    let currentStory = 0;
    const slides = document.querySelectorAll('.story-slide');

    // Auto play or manual controls can be added here
    // For now, just click to advance
    container.onclick = () => {
        slides[currentStory].classList.remove('active');
        currentStory = (currentStory + 1) % slides.length;
        slides[currentStory].classList.add('active');
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
document.querySelector('.close-modal').onclick = () => {
    postModal.style.display = 'none';
};

window.onclick = (e) => {
    if (e.target == postModal) postModal.style.display = 'none';
    if (e.target == document.getElementById('loginModal')) document.getElementById('loginModal').style.display = 'none';
    if (e.target == document.getElementById('uploadModal')) document.getElementById('uploadModal').style.display = 'none';
};

// --- Interactions ---

// Like
modalLikeBtn.onclick = () => {
    if (!db) return alert('Conecta Firebase');

    const isLiked = modalLikeBtn.classList.contains('liked');
    const ref = db.collection('likes').doc(currentPostId);

    if (isLiked) {
        modalLikeBtn.classList.remove('liked');
        modalLikeBtn.innerHTML = '<i class="far fa-heart"></i>';
        ref.get().then(doc => {
            const count = doc.exists ? (doc.data().count || 0) : 0;
            ref.set({ count: Math.max(0, count - 1) });
        });
    } else {
        modalLikeBtn.classList.add('liked');
        modalLikeBtn.innerHTML = '<i class="fas fa-heart"></i>';
        ref.get().then(doc => {
            const count = doc.exists ? (doc.data().count || 0) : 0;
            ref.set({ count: count + 1 });
        });
    }
};

// Comment
commentForm.onsubmit = (e) => {
    e.preventDefault();
    if (!db) return alert('Conecta Firebase');

    const name = document.getElementById('commentName').value;
    const text = document.getElementById('commentText').value;

    db.collection('comments').add({
        photoId: currentPostId,
        name: name,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        commentForm.reset();
    });
};

// --- Admin ---
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const uploadBtn = document.getElementById('uploadBtn');
const loginModal = document.getElementById('loginModal');
const uploadModal = document.getElementById('uploadModal');

if (auth) {
    auth.onAuthStateChanged(user => {
        if (user) {
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            uploadBtn.classList.remove('hidden');
        } else {
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            uploadBtn.classList.add('hidden');
        }
    });
}

loginBtn.onclick = () => loginModal.style.display = 'flex';
document.querySelector('.close-simple-modal').onclick = () => loginModal.style.display = 'none';

document.getElementById('loginForm').onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => loginModal.style.display = 'none')
        .catch(err => alert(err.message));
};

logoutBtn.onclick = () => auth.signOut();

uploadBtn.onclick = () => uploadModal.style.display = 'flex';

document.getElementById('uploadForm').onsubmit = (e) => {
    e.preventDefault();
    const file = document.getElementById('photoFile').files[0];
    if (!file) return;

    const ref = storage.ref('photos/' + Date.now() + '_' + file.name);
    ref.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
            db.collection('photos').add({
                url: url,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                uploadModal.style.display = 'none';
                alert('Foto subida');
            });
        });
    });
};
