// Firebase Configuration
// REPLACE THESE VALUES WITH YOUR OWN FROM FIREBASE CONSOLE
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

// Logout
logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

// --- Modals ---
loginBtn.onclick = () => loginModal.style.display = "flex";
closeLogin.onclick = () => loginModal.style.display = "none";
uploadBtn.onclick = () => uploadModal.style.display = "flex";
closeUpload.onclick = () => uploadModal.style.display = "none";

window.onclick = (event) => {
    if (event.target == loginModal) loginModal.style.display = "none";
    if (event.target == uploadModal) uploadModal.style.display = "none";
    if (event.target == lightbox) lightbox.style.display = "none";
}

// --- Uploads ---
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = document.getElementById('photoFile').files[0];
    const caption = document.getElementById('photoCaption').value;

    if (!file) return;

    // Create a reference to 'images/mountains.jpg'
    const storageRef = storage.ref('photos/' + new Date().getTime() + '_' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Progress function ...
            console.log('Upload is ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '% done');
        },
        (error) => {
            alert("Error al subir: " + error.message);
        },
        () => {
            // Complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // Save to Firestore
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

// --- Gallery & Real-time Updates ---
if (db) {
    db.collection("photos").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        // Clear current grid (except static ones if we want to keep them, but let's replace for dynamic)
        // For this demo, we will APPEND to the static ones or just use static ones if DB is empty

        // Note: In a real app, we might want to clear and rebuild, or just prepend new ones.
        // Let's just log for now as we don't have the DB connected yet.
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                renderPhoto(change.doc);
            }
        });
    });
}

function renderPhoto(doc) {
    const data = doc.data();
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${data.url}" alt="${data.caption}" loading="lazy">
        <div class="overlay"><span><i class="fas fa-heart"></i></span></div>
    `;
    div.addEventListener('click', () => openLightbox(data.url, doc.id));

    // Prepend to grid
    galleryGrid.insertBefore(div, galleryGrid.firstChild);
}

// --- Lightbox & Comments ---

// Add click events to static images too
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        // Use a dummy ID for static images
        openLightbox(img.src, 'static_' + img.src);
    });
});

function openLightbox(url, id) {
    lightbox.style.display = 'flex';
    lightboxImg.src = url;
    currentImageId = id;
    loadComments(id);
}

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

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
