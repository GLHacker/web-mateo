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

// DOM Elements
const postModal = document.getElementById('postModal');
const modalImg = document.getElementById('modalImg');
const modalComments = document.getElementById('modalComments');
const modalLikeBtn = document.getElementById('modalLikeBtn');
const modalLikes = document.getElementById('modalLikes');
const commentForm = document.getElementById('commentForm');

let currentPostId = null;

// --- Modal Logic ---
document.querySelectorAll('.glass-card').forEach(card => {
    // Click on image or view button opens modal
    const openModal = () => {
        const img = card.querySelector('img');
        const id = card.getAttribute('data-id');
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;

        openPostModal(img.src, id, title, desc);
    };

    card.querySelector('.card-image').addEventListener('click', openModal);
});

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
