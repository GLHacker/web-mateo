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
    const imageFile = document.getElementById('storyImage').files[0];

    try {
        let imageUrl = null;

        // Upload image if selected
        if (imageFile) {
            showNotification('Subiendo imagen...', 'info');
            const filename = `stories/${Date.now()}_${imageFile.name}`;
            const storageRef = storage.ref(filename);
            await storageRef.put(imageFile);
            imageUrl = await storageRef.getDownloadURL();
        }

        const storyData = {
            title,
            emoji,
            content,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (imageUrl) {
            storyData.imageUrl = imageUrl;
        }

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
