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

let currentSection = null;
let inactivityTimer;

// =========================================
// DATOS DE LAS TARJETAS (Claves: 'uno', 'dos', 'tres')
// =========================================

const cardsData = {
    'uno': [
        { name: "Paola Medina", city: "Xalapa - México", icon: "📜" },
        { name: "Dagne Cobo", city: "Bogotá - Colombia", icon: "📜" },
        { name: "Denise Gonçalves", city: "Santiago - Chile", icon: "📜" },
        { name: "Luisa Rojas", city: "Lima - Perú", icon: "📜" },
        { name: "Elena Soto", city: "Buenos Aires - Arg", icon: "📜" },
        { name: "Sofía Cruz", city: "Madrid - España", icon: "📜" },
        { name: "Isabel Díaz", city: "Quito - Ecuador", icon: "📜" },
        { name: "Marta Gil", city: "Caracas - Venezuela", icon: "📜" },
        { name: "Laura Sanz", city: "La Habana - Cuba", icon: "📜" }
    ],
    'dos': [
        { name: "Valeria López", city: "CDMX - México", icon: "🏛️" },
        { name: "Julia Silva", city: "Rio - Brasil", icon: "🏛️" },
        { name: "Mariana Costa", city: "Montevideo - Uruguay", icon: "🏛️" },
        { name: "Fernanda Paz", city: "Asunción - Paraguay", icon: "🏛️" },
        { name: "Gabriela Mix", city: "La Paz - Bolivia", icon: "🏛️" },
        { name: "Natalia Vives", city: "San José - C. Rica", icon: "🏛️" },
        { name: "Olivia Neri", city: "Roma - Italia", icon: "🏛️" },
        { name: "Camila Rosso", city: "Milán - Italia", icon: "🏛️" },
        { name: "Daniela Fux", city: "Berlín - Alemania", icon: "🏛️" }
    ],
    'tres': [
        { name: "Emma Stone", city: "New York - USA", icon: "✨" },
        { name: "Akira Sato", city: "Tokyo - Japón", icon: "✨" },
        { name: "Li Wei", city: "Beijing - China", icon: "✨" },
        { name: "Sarah Connor", city: "Los Angeles - USA", icon: "✨" },
        { name: "Michelle O.", city: "Chicago - USA", icon: "✨" },
        { name: "Emily Blunt", city: "Londres - UK", icon: "✨" },
        { name: "Amélie Poulain", city: "París - Francia", icon: "✨" },
        { name: "Greta Thunberg", city: "Estocolmo - Suecia", icon: "✨" },
        { name: "Frida Kahlo", city: "Coyoacán - México", icon: "✨" }
    ]
};

// =========================================
// FUNCIONES DE NAVEGACIÓN
// =========================================

function handleNavClick(element, sectionKey) {
    // 1. Obtener datos visuales de la columna clickeada (Número y Texto)
    const numberContent = element.querySelector('.big-number').textContent;
    const textContent = element.querySelector('.col-text').textContent;

    // 2. Poblar el sidebar de la siguiente pantalla
    sidebarNumber.textContent = numberContent;
    sidebarShortDesc.textContent = textContent;
    
    // Ocultamos explícitamente el título (H2) en la pantalla 2
    if (sidebarTitle) {
        sidebarTitle.style.display = 'none'; 
    }

    // 3. Efecto visual de selección activa en la home
    document.querySelectorAll('.col-nav').forEach(col => col.classList.remove('active-col'));
    element.classList.add('active-col');

    // 4. Transición a la pantalla de galería
    currentSection = sectionKey;
    
    setTimeout(() => {
        // Ocultar Home
        screenHome.classList.remove('active');
        screenHome.classList.add('hidden');
        
        // Mostrar Galería
        screenGallery.classList.remove('hidden');
        // Forzar reflow para reiniciar animación CSS
        void screenGallery.offsetWidth; 
        screenGallery.classList.add('active');
        
        // 5. Cargar las tarjetas correspondientes a la sección ('uno', 'dos' o 'tres')
        loadCards(sectionKey);
    }, 600); // Espera a la transición de la columna
}

function goHome() {
    // Limpiar grid
    cardsGridContainer.innerHTML = '';
    
    // Ocultar Galería
    screenGallery.classList.remove('active');
    screenGallery.classList.add('hidden');
    
    // Mostrar Home
    screenHome.classList.remove('hidden');
    void screenHome.offsetWidth; 
    screenHome.classList.add('active');
    
    // Resetear estado visual de columnas
    document.querySelectorAll('.col-nav').forEach(col => col.classList.remove('active-col'));
    currentSection = null;
}


// =========================================
// LÓGICA DE CARGA DE TARJETAS
// =========================================

function loadCards(sectionKey) {
    cardsGridContainer.innerHTML = ''; // Limpiar contenedor anterior
    
    // Obtener el array de datos
    const data = cardsData[sectionKey];

    if (!data) {
        console.error("No hay datos para la sección:", sectionKey);
        return;
    }

    data.forEach((item, index) => {
        // Crear tarjeta
        const card = document.createElement('article');
        card.className = 'woman-card';
        
        // Retraso escalonado para animación
        card.style.transitionDelay = `${index * 0.05}s`;

        // Insertar contenido
        card.innerHTML = `
            <div class="card-icon">${item.icon}</div>
            <h3 class="card-name">${item.name}</h3>
            <p class="card-city">${item.city}</p>
        `;

        // Agregar al DOM
        cardsGridContainer.appendChild(card);

        // Hacer visible tras breve delay
        setTimeout(() => {
            card.classList.add('visible');
        }, 50);
    });
}


// =========================================
// GESTIÓN DE INACTIVIDAD (Kiosco)
// =========================================
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    // Si NO estamos en home, volver a home tras 2 mins
    if (!screenHome.classList.contains('active')) {
        inactivityTimer = setTimeout(goHome, 120000); 
    }
}

['touchstart', 'click', 'scroll', 'mousemove'].forEach(evt => {
    document.addEventListener(evt, resetInactivityTimer, { passive: true });
});

resetInactivityTimer();