/* ========================================
   JAVASCRIPT PRINCIPAL - HERMANOS CATTANEO
   Funcionalidades interactivas del sitio
   ======================================== */

// ============ VARIABLES GLOBALES ============
let currentSlide = 0;
let slideInterval;

// ============ MENU MOBILE ============
// INICIO FUNCIONALIDAD: Menú hamburguesa responsive
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.navbar-menu a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navbarMenu.contains(event.target);
      const isClickOnToggle = navbarToggle.contains(event.target);

      if (!isClickInsideMenu && !isClickOnToggle && navbarMenu.classList.contains('active')) {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      }
    });
  }
});
// FIN FUNCIONALIDAD: Menú hamburguesa

// ============ MARCAR PÁGINA ACTIVA EN NAVBAR ============
// INICIO FUNCIONALIDAD: Destacar página actual en menú
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuLinks = document.querySelectorAll('.navbar-menu a');

  menuLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage ||
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
});
// FIN FUNCIONALIDAD: Destacar página actual

// ============ CARRUSEL DE IMÁGENES ============
// INICIO FUNCIONALIDAD: Carrusel automático con controles
function initCarousel() {
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const dotsContainer = document.querySelector('.carousel-controls');
  const prevArrow = document.querySelector('.carousel-arrow.prev');
  const nextArrow = document.querySelector('.carousel-arrow.next');

  if (!carouselContainer || slides.length === 0) return;

  // Crear puntos de navegación
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  // Función para ir a un slide específico
  function goToSlide(n) {
    currentSlide = n;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    const offset = -currentSlide * 100;
    carouselContainer.style.transform = `translateX(${offset}%)`;

    // Actualizar puntos activos
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  // Siguiente slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Slide anterior
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Event listeners para flechas
  if (prevArrow) prevArrow.addEventListener('click', prevSlide);
  if (nextArrow) nextArrow.addEventListener('click', nextSlide);

  // Auto-play del carrusel
  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
  }

  // Iniciar auto-play
  startAutoPlay();

  // Pausar auto-play al pasar el mouse
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  // Soporte para deslizar en móvil
  let touchStartX = 0;
  let touchEndX = 0;

  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initCarousel);
// FIN FUNCIONALIDAD: Carrusel

// ============ ANIMACIONES AL HACER SCROLL ============
// INICIO FUNCIONALIDAD: Revelar elementos al hacer scroll
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.scroll-animate');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);
// FIN FUNCIONALIDAD: Animaciones scroll

// ============ NAVBAR STICKY CON SOMBRA ============
// INICIO FUNCIONALIDAD: Cambiar apariencia del navbar al hacer scroll
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });
}

document.addEventListener('DOMContentLoaded', initNavbarScroll);
// FIN FUNCIONALIDAD: Navbar scroll

// ============ BOTÓN VOLVER ARRIBA ============
// INICIO FUNCIONALIDAD: Scroll suave al hacer clic en enlaces ancla
document.addEventListener('DOMContentLoaded', function() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
// FIN FUNCIONALIDAD: Scroll suave

// ============ VALIDACIÓN DE FORMULARIO DE CONTACTO ============
// INICIO FUNCIONALIDAD: Validar formulario antes de enviar
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validaciones básicas
    if (nombre === '' || apellido === '' || email === '' || mensaje === '') {
      alert('Por favor, complete todos los campos obligatorios.');
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return false;
    }

    // Si todas las validaciones pasan
    alert('¡Gracias por contactarnos! Nos pondremos en contacto con usted pronto.');

    // NOTA PARA EL DESARROLLADOR:
    // Aquí debe agregar la lógica para enviar el formulario
    // Puede usar EmailJS, FormSpree, o conectar con su backend
    // Por ejemplo:
    // - Enviar a un servicio de email
    // - Guardar en una base de datos
    // - Enviar a un webhook

    // Resetear formulario después de enviar
    contactForm.reset();

    return false;
  });
}

document.addEventListener('DOMContentLoaded', initFormValidation);
// FIN FUNCIONALIDAD: Validación formulario

// ============ GALERÍA LIGHTBOX (para páginas de proyectos) ============
// INICIO FUNCIONALIDAD: Abrir imágenes en lightbox
function initLightbox() {
  const galleryImages = document.querySelectorAll('.gallery-image');

  if (galleryImages.length === 0) return;

  // Crear elemento lightbox
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
      <img src="" alt="Imagen ampliada">
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-prev">&#8249;</button>
      <button class="lightbox-next">&#8250;</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentImageIndex = 0;
  const imagesArray = Array.from(galleryImages);

  // Abrir lightbox
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', function() {
      currentImageIndex = index;
      showImage(currentImageIndex);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

  // Mostrar imagen
  function showImage(index) {
    lightboxImg.src = imagesArray[index].src;
    lightboxImg.alt = imagesArray[index].alt;
  }

  // Navegación
  prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    showImage(currentImageIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    showImage(currentImageIndex);
  });

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
}

document.addEventListener('DOMContentLoaded', initLightbox);
// FIN FUNCIONALIDAD: Lightbox

// ============ CONTADOR ANIMADO (opcional) ============
// INICIO FUNCIONALIDAD: Animar números al hacer scroll
function initCounters() {
  const counters = document.querySelectorAll('.counter-number');

  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
}

document.addEventListener('DOMContentLoaded', initCounters);
// FIN FUNCIONALIDAD: Contador animado

// ============ WHATSAPP FLOTANTE ============
// INICIO FUNCIONALIDAD: Configuración del botón de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
  const whatsappButton = document.querySelector('.whatsapp-button');

  if (whatsappButton) {
    // CONFIGURACIÓN: Número de WhatsApp de la empresa
    // IMPORTANTE: Cambiar este número por el de la empresa
    const phoneNumber = '+543875545569'; // Formato: código de país + código de área + número (sin espacios ni guiones)
    const message = encodeURIComponent('Hola, me gustaría obtener más información sobre sus servicios.');

    // Detectar si es móvil o desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Construir URL según el dispositivo
    const whatsappURL = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    whatsappButton.setAttribute('href', whatsappURL);
  }
});
// FIN FUNCIONALIDAD: WhatsApp

// ============ EFECTOS DE HOVER EN TARJETAS ============
// INICIO FUNCIONALIDAD: Agregar efectos interactivos a las tarjetas
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});
// FIN FUNCIONALIDAD: Efectos en tarjetas

// ============ CARGA DIFERIDA DE IMÁGENES (Lazy Loading) ============
// INICIO FUNCIONALIDAD: Cargar imágenes solo cuando sean visibles
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if (lazyImages.length === 0) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', initLazyLoading);
// FIN FUNCIONALIDAD: Lazy loading

// ============ GOOGLE MAPS (para página de contacto) ============
// NOTA: Si usa la API de Google Maps, agregue su código aquí
// Ejemplo básico con iframe ya está en el HTML

console.log('✅ JavaScript de Hermanos Cattaneo cargado correctamente');
