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

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');
const commentsList = document.getElementById('commentsList');
const commentForm = document.getElementById('commentForm');
let currentImageId = null;

// --- Authentication ---
if (auth) {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("User logged in:", user.email);
            if (loginBtn) loginBtn.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
            if (uploadBtn) uploadBtn.classList.remove('hidden');
        } else {
            console.log("User logged out");
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
            if (uploadBtn) uploadBtn.classList.add('hidden');
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
                alert("¡Bienvenido!");
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

// --- Like Functionality ---
document.querySelectorAll('.like-btn').forEach(btn => {
    const photoId = btn.getAttribute('data-photo');

    // Load like count
    if (db) {
        db.collection('likes').doc(photoId).onSnapshot(doc => {
            if (doc.exists) {
                const count = doc.data().count || 0;
                btn.querySelector('.count').textContent = count;
            }
        });
    }

    btn.addEventListener('click', () => {
        if (!db) {
            alert('Conecta Firebase para dar me gusta');
            return;
        }

        const icon = btn.querySelector('i');
        const countSpan = btn.querySelector('.count');

        // Toggle like
        if (btn.classList.contains('liked')) {
            btn.classList.remove('liked');
            icon.classList.remove('fas');
            icon.classList.add('far');

            // Decrease count
            db.collection('likes').doc(photoId).get().then(doc => {
                const currentCount = doc.exists ? (doc.data().count || 0) : 0;
                const newCount = Math.max(0, currentCount - 1);
                db.collection('likes').doc(photoId).set({ count: newCount });
            });
        } else {
            btn.classList.add('liked');
            icon.classList.remove('far');
            icon.classList.add('fas');

            // Increase count
            db.collection('likes').doc(photoId).get().then(doc => {
                const currentCount = doc.exists ? (doc.data().count || 0) : 0;
                db.collection('likes').doc(photoId).set({ count: currentCount + 1 });
            });
        }
    });
});

// --- Comment Functionality ---
document.querySelectorAll('.comment-btn').forEach(btn => {
    const photoId = btn.getAttribute('data-photo');

    // Load comment count
    if (db) {
        db.collection('comments').where('photoId', '==', 'static_' + photoId).onSnapshot(snapshot => {
            btn.querySelector('.count').textContent = snapshot.size;
        });
    }

    btn.addEventListener('click', () => {
        const photoItem = btn.closest('.photo-item');
        const img = photoItem.querySelector('img');
        openLightbox(img.src, 'static_' + photoId);
    });
});

// --- Share Functionality ---
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const photoItem = btn.closest('.photo-item');
        const caption = photoItem.querySelector('.photo-caption').textContent;

        if (navigator.share) {
            navigator.share({
                title: 'Familia Mateo',
                text: caption,
                url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: copy link
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('¡Enlace copiado al portapapeles!');
            });
        }
    });
});

// --- Lightbox & Comments ---
document.querySelectorAll('.photo-item img').forEach(img => {
    img.addEventListener('click', () => {
        const photoItem = img.closest('.photo-item');
        const likeBtn = photoItem.querySelector('.like-btn');
        const photoId = likeBtn.getAttribute('data-photo');
        openLightbox(img.src, 'static_' + photoId);
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

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
