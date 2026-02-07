// =========================================
// VARIABLES Y ELEMENTOS DOM
// =========================================
const screenHome = document.getElementById('screen-home');
const screenGallery = document.getElementById('screen-gallery');
const cardsGridContainer = document.getElementById('cards-grid-container');

// Elementos del Sidebar en Pantalla 2
const sidebarNumber = document.getElementById('sidebar-number');
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarShortDesc = document.getElementById('sidebar-short-desc');

// Elementos del MODAL
const modalOverlay = document.getElementById('modal-overlay');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

// Variables de Estado
let currentSection = null; // 'uno', 'dos', 'tres'
let currentIndex = 0;      // Índice de la foto actual en el modal
let inactivityTimer;

// =========================================
// DATOS (Ahora con IMAGEN y DESCRIPCIÓN)
// =========================================
// Nota: Uso imágenes de Picsum para demo. Luego pondrás tus rutas locales "img/foto1.jpg"

const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.";

const cardsData = {
    'uno': [
        { name: "Paola Medina", city: "Xalapa - México", icon: "📜", img: "https://picsum.photos/id/1011/800/600", desc: loremText },
        { name: "Ana Ruiz", city: "Bogotá - Colombia", icon: "📜", img: "https://picsum.photos/id/1012/800/600", desc: loremText },
        { name: "Carmen Vega", city: "Santiago - Chile", icon: "📜", img: "https://picsum.photos/id/1013/800/600", desc: loremText },
        { name: "Luisa Rojas", city: "Lima - Perú", icon: "📜", img: "https://picsum.photos/id/1014/800/600", desc: loremText },
        { name: "Elena Soto", city: "Buenos Aires - Arg", icon: "📜", img: "https://picsum.photos/id/1015/800/600", desc: loremText },
        { name: "Sofía Cruz", city: "Madrid - España", icon: "📜", img: "https://picsum.photos/id/1016/800/600", desc: loremText },
        { name: "Isabel Díaz", city: "Quito - Ecuador", icon: "📜", img: "https://picsum.photos/id/1018/800/600", desc: loremText },
        { name: "Marta Gil", city: "Caracas - Venezuela", icon: "📜", img: "https://picsum.photos/id/1019/800/600", desc: loremText },
        { name: "Laura Sanz", city: "La Habana - Cuba", icon: "📜", img: "https://picsum.photos/id/1020/800/600", desc: loremText }
    ],
    'dos': [
        { name: "Valeria López", city: "CDMX - México", icon: "🏛️", img: "https://picsum.photos/id/1021/800/600", desc: loremText },
        { name: "Julia Silva", city: "Rio - Brasil", icon: "🏛️", img: "https://picsum.photos/id/1022/800/600", desc: loremText },
        { name: "Mariana Costa", city: "Montevideo - Uruguay", icon: "🏛️", img: "https://picsum.photos/id/1023/800/600", desc: loremText },
        { name: "Fernanda Paz", city: "Asunción - Paraguay", icon: "🏛️", img: "https://picsum.photos/id/1024/800/600", desc: loremText },
        { name: "Gabriela Mix", city: "La Paz - Bolivia", icon: "🏛️", img: "https://picsum.photos/id/1025/800/600", desc: loremText },
        { name: "Natalia Vives", city: "San José - C. Rica", icon: "🏛️", img: "https://picsum.photos/id/1026/800/600", desc: loremText },
        { name: "Olivia Neri", city: "Roma - Italia", icon: "🏛️", img: "https://picsum.photos/id/1027/800/600", desc: loremText },
        { name: "Camila Rosso", city: "Milán - Italia", icon: "🏛️", img: "https://picsum.photos/id/1028/800/600", desc: loremText },
        { name: "Daniela Fux", city: "Berlín - Alemania", icon: "🏛️", img: "https://picsum.photos/id/1029/800/600", desc: loremText }
    ],
    'tres': [
        { name: "Emma Stone", city: "New York - USA", icon: "✨", img: "https://picsum.photos/id/1031/800/600", desc: loremText },
        { name: "Akira Sato", city: "Tokyo - Japón", icon: "✨", img: "https://picsum.photos/id/1032/800/600", desc: loremText },
        { name: "Li Wei", city: "Beijing - China", icon: "✨", img: "https://picsum.photos/id/1033/800/600", desc: loremText },
        { name: "Sarah Connor", city: "Los Angeles - USA", icon: "✨", img: "https://picsum.photos/id/1035/800/600", desc: loremText },
        { name: "Michelle O.", city: "Chicago - USA", icon: "✨", img: "https://picsum.photos/id/1036/800/600", desc: loremText },
        { name: "Emily Blunt", city: "Londres - UK", icon: "✨", img: "https://picsum.photos/id/1037/800/600", desc: loremText },
        { name: "Amélie Poulain", city: "París - Francia", icon: "✨", img: "https://picsum.photos/id/1038/800/600", desc: loremText },
        { name: "Greta Thunberg", city: "Estocolmo - Suecia", icon: "✨", img: "https://picsum.photos/id/1039/800/600", desc: loremText },
        { name: "Frida Kahlo", city: "Coyoacán - México", icon: "✨", img: "https://picsum.photos/id/1040/800/600", desc: loremText }
    ]
};

// =========================================
// NAVEGACIÓN ENTRE PANTALLAS
// =========================================

function handleNavClick(element, sectionKey) {
    const numberContent = element.querySelector('.big-number').textContent;
    const textContent = element.querySelector('.col-text').textContent;

    // Poblar Sidebar
    sidebarNumber.textContent = numberContent;
    sidebarShortDesc.textContent = textContent;
    if (sidebarTitle) sidebarTitle.style.display = 'none'; 

    // Visual
    document.querySelectorAll('.col-nav').forEach(col => col.classList.remove('active-col'));
    element.classList.add('active-col');

    currentSection = sectionKey;
    
    setTimeout(() => {
        screenHome.classList.remove('active');
        screenHome.classList.add('hidden');
        screenGallery.classList.remove('hidden');
        void screenGallery.offsetWidth; 
        screenGallery.classList.add('active');
        loadCards(sectionKey);
    }, 600);
}

function goHome() {
    cardsGridContainer.innerHTML = '';
    screenGallery.classList.remove('active');
    screenGallery.classList.add('hidden');
    screenHome.classList.remove('hidden');
    void screenHome.offsetWidth; 
    screenHome.classList.add('active');
    document.querySelectorAll('.col-nav').forEach(col => col.classList.remove('active-col'));
    currentSection = null;
}

// =========================================
// CARGA DE TARJETAS
// =========================================

function loadCards(sectionKey) {
    cardsGridContainer.innerHTML = ''; 
    const data = cardsData[sectionKey];

    if (!data) return;

    data.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'woman-card';
        card.style.transitionDelay = `${index * 0.05}s`;
        
        // Hacemos que la tarjeta sea clickeable y abra el modal
        card.onclick = () => openModal(index);
        
        // Cursor pointer para indicar click
        card.style.cursor = "pointer"; 

        card.innerHTML = `
            <div class="card-icon">${item.icon}</div>
            <h3 class="card-name">${item.name}</h3>
            <p class="card-city">${item.city}</p>
        `;

        cardsGridContainer.appendChild(card);
        setTimeout(() => card.classList.add('visible'), 50);
    });
}

// =========================================
// LÓGICA DEL MODAL (POPUP)
// =========================================

function openModal(index) {
    currentIndex = index; // Guardamos cuál se abrió para poder usar Next/Prev
    updateModalContent();
    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
}

function changeImage(direction) {
    // Calcular nuevo índice
    const sectionData = cardsData[currentSection];
    let newIndex = currentIndex + direction;

    // Loop infinito (si llega al final, vuelve al principio)
    if (newIndex < 0) newIndex = sectionData.length - 1;
    if (newIndex >= sectionData.length) newIndex = 0;

    currentIndex = newIndex;

    // Efecto visual de cambio
    modalImg.classList.add('slide-change');
    setTimeout(() => {
        updateModalContent();
        modalImg.classList.remove('slide-change');
    }, 200);
}

function updateModalContent() {
    const item = cardsData[currentSection][currentIndex];
    
    modalImg.src = item.img;
    modalTitle.textContent = item.name;
    // Combinamos Ciudad + Descripción para el texto del modal
    modalDesc.innerHTML = `<strong>${item.city}</strong><br><br>${item.desc}`;
}

// =========================================
// GESTIÓN DE INACTIVIDAD
// =========================================
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    if (!screenHome.classList.contains('active')) {
        inactivityTimer = setTimeout(goHome, 120000); 
    }
}

['touchstart', 'click', 'scroll', 'mousemove'].forEach(evt => {
    document.addEventListener(evt, resetInactivityTimer, { passive: true });
});

resetInactivityTimer();