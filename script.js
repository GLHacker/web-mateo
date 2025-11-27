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
        img: "https://picsum.photos/id/1042/800/600",
        text: `
            <p>En la inmensidad del cosmos, donde el silencio es música y la oscuridad es un lienzo, vivía una pequeña estrella llamada Lyra. A diferencia de sus hermanas, que se conformaban con brillar estáticas en sus constelaciones, Lyra sentía una inquietud vibrante en su núcleo de luz. Se preguntaba qué existía más allá del terciopelo negro de la noche, especialmente en ese pequeño punto azul y verde que giraba a lo lejos: la Tierra.</p>
            <p>"No debes moverte", le decían las estrellas mayores con voz de gravedad. "Nuestro propósito es ser guías inmutables". Pero la curiosidad de Lyra era una fuerza más poderosa que la gravedad misma. Una noche, cuando la luna cerró sus ojos plateados, Lyra decidió emprender el viaje prohibido. Se soltó del firmamento y descendió como una lágrima de luz, cruzando nebulosas y esquivando cometas.</p>
            <p>Al entrar en la atmósfera terrestre, sintió el calor de la velocidad y el miedo a lo desconocido. Aterrizó suavemente en un jardín silencioso, justo sobre una hoja de rocío. Allí, vio a un niño, Mateo, que miraba al cielo con un telescopio de cartón. Mateo no buscaba mapas ni guías; buscaba magia. Cuando sus ojos se encontraron con el destello de Lyra, ella comprendió su verdadero propósito.</p>
            <p>No había bajado para ver el mundo, sino para iluminar el sueño de alguien. Esa noche, Lyra aprendió que incluso la estrella más pequeña puede ser el sol del universo de una persona. Y aunque regresó al cielo antes del amanecer, su luz cambió para siempre: ahora brillaba con la calidez de quien ha conocido la esperanza de cerca.</p>
        `
    },
    {
        title: "El Bosque de los Susurros",
        img: "https://picsum.photos/id/1039/800/600",
        text: `
            <p>Existe un bosque que no aparece en los mapas, un lugar donde el tiempo no se mide en horas, sino en el crecimiento de los musgos y el canto de los grillos. Se llama el Bosque de los Susurros. Dicen los antiguos que los árboles allí no solo tienen raíces en la tierra, sino también en la memoria del mundo. Guardan secretos de épocas olvidadas y susurran verdades a quienes tienen el coraje de escuchar en silencio.</p>
            <p>Un día, Mateo, con su espíritu aventurero, cruzó el umbral de este bosque. Al principio, el ruido de sus propios pasos sobre las hojas secas le impedía oír nada más. Pero a medida que se adentraba, se detuvo. Respiró hondo y cerró los ojos. Fue entonces cuando el bosque cobró vida. El viento no solo movía las ramas; cantaba melodías antiguas.</p>
            <p>"La fuerza no está en la dureza del tronco", le susurró un viejo roble, "sino en la flexibilidad de las ramas ante la tormenta". Un arroyo cercano añadió con voz cristalina: "Y la constancia, pequeño viajero, es capaz de tallar la piedra más dura". Mateo escuchaba fascinado, entendiendo que la naturaleza era una biblioteca viva.</p>
            <p>Pasó la tarde aprendiendo el idioma de las flores y la paciencia de las piedras. Al salir del bosque, Mateo ya no era el mismo niño que había entrado. Llevaba consigo la sabiduría de la tierra: que para crecer alto como un árbol, primero hay que tener raíces profundas y saber escuchar los susurros del mundo.</p>
        `
    },
    {
        title: "El Océano de Nubes",
        img: "https://picsum.photos/id/1053/800/600",
        text: `
            <p>Mateo siempre había creído que el cielo era el límite, hasta que descubrió que podía navegar sobre él. Todo comenzó una tarde de lluvia, cuando dobló una hoja de papel con esmero y creó un pequeño barco. "Ojalá pudieras navegar de verdad", susurró. Y como si el universo estuviera esperando ese deseo, el barco comenzó a flotar, no sobre el agua, sino hacia arriba, hacia el techo, atravesándolo hasta llegar al cielo abierto.</p>
            <p>Sin dudarlo, Mateo se sujetó a la vela de papel y subió. De pronto, se encontró navegando en un Océano de Nubes. Era un paisaje onírico, donde las montañas eran de algodón blanco y el sol pintaba olas de oro y rosa. Peces voladores con alas de libélula saltaban entre los cúmulos, y ballenas hechas de bruma cantaban canciones graves que hacían vibrar el aire.</p>
            <p>Navegó hacia el horizonte, donde el día se encuentra con la noche. Allí conoció al Guardián del Atardecer, un anciano que pintaba las nubes de violeta antes de que salieran las estrellas. "¿Qué buscas tan lejos de casa?", le preguntó el Guardián. "Busco saber hasta dónde puedo llegar", respondió Mateo.</p>
            <p>El anciano sonrió y le entregó un frasco con luz de estrella. "El único límite es tu propia imaginación", le dijo. Mateo regresó a su habitación justo cuando la lluvia paraba, pero en su bolsillo, el frasco brillaba intensamente. Había aprendido que el mundo es tan grande como uno se atreva a soñarlo.</p>
        `
    },
    {
        title: "El Guardián de los Sueños",
        img: "https://picsum.photos/id/1016/800/600",
        text: `
            <p>En el valle donde nacen los arcoíris, vive un pequeño guardián llamado Oliver. Su trabajo no es proteger tesoros de oro, sino algo mucho más valioso: los sueños de los niños. Oliver tiene una linterna mágica que no alumbra con luz, sino con imaginación. Cada noche, sube a la montaña más alta y abre su linterna, liberando miles de luciérnagas de colores.</p>
            <p>Una noche, una de sus luciérnagas se perdió y llegó a la ventana de Mateo. Mateo estaba triste porque había tenido una pesadilla. La pequeña luz danzó sobre su almohada, pintando en el aire historias de dragones amigables y castillos de nubes. Mateo sonrió dormido, y Oliver, desde lejos, supo que su misión estaba cumplida.</p>
            <p>Desde entonces, cada vez que Mateo cierra los ojos, Oliver le envía una luciérnaga especial. Porque los sueños felices son el ingrediente secreto que hace que los niños despierten con ganas de comerse el mundo.</p>
        `
    },
    {
        title: "La Melodía del Viento",
        img: "https://picsum.photos/id/1025/800/600",
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
if (storiesBtn && storiesModal) {
    storiesBtn.onclick = (e) => {
        e.preventDefault();
        renderStories();
        storiesModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };
}

// Close Stories Logic
if (closeStoriesBtn) {
    closeStoriesBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop event bubbling
        storiesModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
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
