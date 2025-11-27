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
    console.error("Firebase init error (Expected if keys are missing):", e);
}

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const uploadBtn = document.getElementById('uploadBtn');
const loginModal = document.getElementById('loginModal');
const uploadModal = document.getElementById('uploadModal');
const closeLogin = document.getElementById('closeLogin');
const closeUpload = document.getElementById('closeUpload');
const loginForm = document.getElementById('loginForm');
const uploadForm = document.getElementById('uploadForm');
const galleryGrid = document.getElementById('galleryGrid');

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');
const commentsList = document.getElementById('commentsList');
const commentForm = document.getElementById('commentForm');
let currentImageId = null;

// --- Initialize Particles.js ---
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#667eea' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#667eea',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });
}

// --- Initialize AOS ---
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// --- Authentication ---

// Check Auth State
if (auth) {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("User logged in:", user.email);
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            uploadBtn.classList.remove('hidden');
        } else {
            console.log("User logged out");
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            uploadBtn.classList.add('hidden');
        }
    });
}

// Login
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                loginModal.style.display = "none";
                loginForm.reset();
                alert("¡Bienvenido Luis!");
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut();
    });
}

// --- Modals ---
if (loginBtn) loginBtn.onclick = () => loginModal.style.display = "flex";
if (closeLogin) closeLogin.onclick = () => loginModal.style.display = "none";
if (uploadBtn) uploadBtn.onclick = () => uploadModal.style.display = "flex";
if (closeUpload) closeUpload.onclick = () => uploadModal.style.display = "none";

window.onclick = (event) => {
    if (event.target == loginModal) loginModal.style.display = "none";
    if (event.target == uploadModal) uploadModal.style.display = "none";
    if (event.target == lightbox) lightbox.style.display = "none";
}

// --- Uploads ---
if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const file = document.getElementById('photoFile').files[0];
        const caption = document.getElementById('photoCaption').value;

        if (!file) return;

        const storageRef = storage.ref('photos/' + new Date().getTime() + '_' + file.name);
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed',
            (snapshot) => {
                console.log('Upload is ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '% done');
            },
            (error) => {
                alert("Error al subir: " + error.message);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    db.collection("photos").add({
                        url: downloadURL,
                        caption: caption,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                        .then(() => {
                            uploadModal.style.display = "none";
                            uploadForm.reset();
                            alert("¡Foto subida con éxito!");
                        });
                });
            }
        );
    });
}

// --- Lightbox & Comments ---

// Add click events to photo cards
document.querySelectorAll('.photo-frame').forEach(frame => {
    frame.addEventListener('click', () => {
        const img = frame.querySelector('img');
        openLightbox(img.src, 'static_' + img.alt);
    });
});

function openLightbox(url, id) {
    lightbox.style.display = 'flex';
    lightboxImg.src = url;
    currentImageId = id;
    loadComments(id);
}

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

// Load Comments
function loadComments(photoId) {
    commentsList.innerHTML = '<p>Cargando comentarios...</p>';

    if (!db) {
        commentsList.innerHTML = '<p>Conecta Firebase para ver comentarios.</p>';
        return;
    }

    db.collection("comments").where("photoId", "==", photoId).orderBy("timestamp")
        .onSnapshot((snapshot) => {
            commentsList.innerHTML = '';
            if (snapshot.empty) {
                commentsList.innerHTML = '<p>Sé el primero en comentar.</p>';
            }
            snapshot.forEach(doc => {
                const data = doc.data();
                const p = document.createElement('div');
                p.className = 'comment';
                p.innerHTML = `<strong>${data.name}</strong> ${data.text}`;
                commentsList.appendChild(p);
            });
        });
}

// Post Comment
if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('commentName').value;
        const text = document.getElementById('commentText').value;

        if (db && currentImageId) {
            db.collection("comments").add({
                photoId: currentImageId,
                name: name,
                text: text,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                commentForm.reset();
            });
        } else {
            alert("Configura Firebase primero.");
        }
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
