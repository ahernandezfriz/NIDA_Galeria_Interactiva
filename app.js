// --- DATOS (Simulación de Base de Datos Local) ---
// Puedes reemplazar los URLs con rutas locales ej: 'img/foto1.jpg'
const db = [
    { id: 1, title: "Proyecto Alpha", desc: "Descripción detallada del proyecto Alpha. Innovación en diseño.", src: "https://picsum.photos/800/600?random=1" },
    { id: 2, title: "Diseño Beta", desc: "El enfoque minimalista permite una mejor usabilidad en este modelo.", src: "https://picsum.photos/800/600?random=2" },
    { id: 3, title: "Concepto Gamma", desc: "Exploración de colores y formas geométricas.", src: "https://picsum.photos/800/600?random=3" },
    { id: 4, title: "Estructura Delta", desc: "Arquitectura robusta para aplicaciones escalables.", src: "https://picsum.photos/800/600?random=4" },
    { id: 5, title: "Módulo Epsilon", desc: "Integración perfecta con sistemas legacy.", src: "https://picsum.photos/800/600?random=5" },
    { id: 6, title: "Interfaz Zeta", desc: "UI diseñada pensando en la accesibilidad.", src: "https://picsum.photos/800/600?random=6" },
    { id: 7, title: "Nucleo Eta", desc: "El centro de procesamiento de datos visuales.", src: "https://picsum.photos/800/600?random=7" },
    { id: 8, title: "Vector Theta", desc: "Gráficos vectoriales de alta resolución.", src: "https://picsum.photos/800/600?random=8" },
    { id: 9, title: "Pixel Iota", desc: "Manipulación de pixels a nivel individual.", src: "https://picsum.photos/800/600?random=9" },
];

// --- ESTADO DE LA APP ---
let currentIndex = 0;
let currentData = [];

// --- FUNCIONES DE NAVEGACIÓN ---

function loadGallery(category) {
    currentData = db;
    const grid = document.getElementById('grid-container');
    const title = document.getElementById('gallery-title');
    
    grid.innerHTML = '';
    title.innerText = "Galería: " + category.toUpperCase();

    switchScreen('screen-gallery');

    // Generación de elementos
    currentData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'grid-item'; // Empieza invisible por CSS
        div.innerHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy">`;
        div.onclick = () => openModal(index);
        grid.appendChild(div);

        // --- MAGIA DE ANIMACIÓN EN CASCADA ---
        // Retrasamos la aparición de cada cuadro 50ms * su posición
        setTimeout(() => {
            div.classList.add('visible');
        }, 50 * index); // 0ms, 50ms, 100ms, 150ms...
    });
}

function goHome() {
    switchScreen('screen-home');
}

function switchScreen(screenId) {
    // Ocultar todas
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    
    // Mostrar objetivo
    const target = document.getElementById(screenId);
    target.classList.remove('hidden');
    // Pequeño timeout para permitir que el display:flex se aplique antes de la opacidad
    setTimeout(() => target.classList.add('active'), 10);
}

// --- FUNCIONES DEL MODAL ---
// Variable global para controlar el tiempo de espera
let inactivityTimer;

// --- MODIFICAR: Función openModal existente ---
function openModal(index) {
    currentIndex = index;
    updateModalContent();
    
    const modal = document.getElementById('modal-overlay');
    modal.classList.remove('hidden');
    
    // INICIO: Empezar a contar inactividad al abrir
    resetInactivityTimer();
}

// --- MODIFICAR: Función closeModal existente ---
function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
    
    // LIMPIEZA: Detener timer y quitar animaciones al cerrar
    clearTimeout(inactivityTimer);
    removePulseEffect();
}

function updateModalContent() {
    const item = currentData[currentIndex];
    
    document.getElementById('modal-img').src = item.src;
    document.getElementById('modal-title').innerText = item.title;
    document.getElementById('modal-desc').innerText = item.desc;
}




function changeImage(direction) {
     // 1. Feedback inmediato: El usuario interactuó, reiniciamos el timer
    resetInactivityTimer();

    const imgElement = document.getElementById('modal-img');
    const titleElement = document.getElementById('modal-title');
    const descElement = document.getElementById('modal-desc');

    // 1. Ocultar contenido actual (Fade Out)
    imgElement.classList.add('slide-change');
    titleElement.style.opacity = 0;
    descElement.style.opacity = 0;
    
    // Esperar a que se oculte (200ms coincide con CSS)
    setTimeout(() => {
        // Calcular nuevo índice
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = currentData.length - 1;
        else if (currentIndex >= currentData.length) currentIndex = 0;

        // Actualizar contenido
        updateModalContent();

        // 2. Mostrar contenido nuevo (Fade In)
        imgElement.classList.remove('slide-change');
        titleElement.style.opacity = 1;
        descElement.style.opacity = 1;
        
        // Añadir transición suave al texto también
        titleElement.style.transition = 'opacity 0.3s';
        descElement.style.transition = 'opacity 0.3s';

    }, 200);
}

function resetInactivityTimer() {
    // 1. Quitar la animación si ya estaba activa (el usuario "despertó")
    removePulseEffect();
    
    // 2. Limpiar cualquier timer pendiente
    clearTimeout(inactivityTimer);

    // 3. Configurar nuevo timer: Si no hace nada en 4000ms (4s), activar pulso
    inactivityTimer = setTimeout(() => {
        const btns = document.querySelectorAll('.nav-btn');
        btns.forEach(btn => btn.classList.add('attention'));
    }, 4000); 
}

function removePulseEffect() {
    const btns = document.querySelectorAll('.nav-btn');
    btns.forEach(btn => btn.classList.remove('attention'));
}

// Cerrar modal con tecla ESC (útil para pruebas en desarrollo)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'ArrowLeft') changeImage(-1);
});