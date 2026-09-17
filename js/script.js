document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ACTUALIZADOR DE FECHA AUTOMÁTICO (Estilo Periódico)
    const updateDate = () => {
        const dateElement = document.getElementById("current-date");
        if (dateElement) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const today = new Date().toLocaleDateString('es-ES', options);
            dateElement.innerText = today.toUpperCase();
        }
    };
    updateDate();

    // 2. EFECTO REVEAL AL HACER SCROLL
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.article-card, #perfil, .story-item').forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });

    // 3. PARALAJE SUTIL EN EL HERO
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroText = document.querySelector('h1');
        if (heroText) {
            heroText.style.transform = `translateY(${scrolled * 0.15}px)`;
            heroText.style.opacity = 1 - (scrolled / 700);
        }
    });

    // 4. SONIDO HOVER (Volumen corregido)
    const hoverSound = new Audio('https://www.soundjay.com/buttons/sounds/button-21.mp3');
    hoverSound.volume = 0.05;

    document.querySelectorAll('.grid-item, a, .read-more').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const s = hoverSound.cloneNode();
            s.volume = 0.05;
            s.play().catch(() => {}); // El catch evita errores si el navegador bloquea audio sin interacción
        });
    });

    // 5. CONFIGURACIÓN DE CIERRE DE MODAL
    const closeBtn = document.querySelector(".close-modal");
    if (closeBtn) closeBtn.onclick = closeModal;

    window.onclick = function(event) {
        const modal = document.getElementById("storyModal");
        if (event.target == modal) {
            closeModal();
        }
    };
});

/* --- LÓGICA DEL SLIDER PARA HISTORIAS --- */
// (Esta función debe quedar fuera del DOMContentLoaded para que el 'onclick' del HTML la encuentre)

function openStory(type) {
    const modal = document.getElementById("storyModal");
    const container = document.getElementById("modalBody");
    let fotosHtml = "";

    if(type === 'historia1') {
        fotosHtml = `
            <img src="img/colores/colores1(1).jpg" alt="Página 1">
            <img src="img/colores/colores1(2).jpg" alt="Página 2">
            <img src="img/colores/colores1(3).jpg" alt="Página 3">
            <img src="img/colores/colores1(4).jpg" alt="Página 4">
        `;
    } 
    else if(type === 'historia2') {
        fotosHtml = `
            <img src="img/historias/migracion1.jpg" alt="Página 1">
            <img src="img/historias/migracion2.jpg" alt="Página 2">
            <img src="img/historias/migracion3.jpg" alt="Página 3">
        `;
    }

    container.innerHTML = fotosHtml;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("storyModal");
    if (modal) {
        modal.style.display = "none";
        document.getElementById("modalBody").innerHTML = ""; 
        document.body.style.overflow = "auto";
    }
}