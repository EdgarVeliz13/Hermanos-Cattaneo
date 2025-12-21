# Sitio Web - Hermanos Cattaneo

## Empresa Constructora Familiar

Este es el sitio web completo y funcional para **Hermanos Cattaneo**, una empresa constructora especializada en construcción de casas, edificios y pavimentación.

---

## Estructura del Proyecto

```
proyecto/
├── index.html                           # Página principal
├── quienes-somos.html                   # Página Quiénes Somos
├── servicios.html                       # Página Servicios
├── proyectos.html                       # Página Proyectos (listado)
├── proyecto-casa-moderna.html           # Ejemplo de proyecto individual
├── proyecto-edificio-san-martin.html    # Ejemplo de proyecto individual
├── contacto.html                        # Página Contacto
├── css/
│   └── styles.css                       # Estilos CSS globales
├── js/
│   └── main.js                          # JavaScript con todas las funcionalidades
└── LEEME.md                             # Este archivo
```

---

## Características del Sitio

### Páginas Incluidas

1. **Inicio (index.html)**
   - Carrusel automático con 3 slides
   - Presentación de la empresa
   - Servicios destacados
   - Proyectos destacados
   - Llamada a la acción

2. **Quiénes Somos (quienes-somos.html)**
   - Historia de la empresa
   - Misión, Visión y Valores
   - Objetivos empresariales

3. **Servicios (servicios.html)**
   - Construcción de Casas
   - Construcción de Edificios (PB, 1er piso, 2do piso)
   - Pavimentación - Adoquinado
   - Pavimentación - Concreto

4. **Proyectos (proyectos.html)**
   - Grid de tarjetas con todos los proyectos
   - Enlaces a páginas individuales de proyectos
   - Filtrable y expandible

5. **Proyectos Individuales**
   - Página ejemplo: Casa Familiar Moderna
   - Página ejemplo: Edificio San Martín
   - Con galería de imágenes y lightbox
   - Ficha técnica detallada

6. **Contacto (contacto.html)**
   - Formulario de contacto funcional
   - Información de contacto (teléfono, email, dirección)
   - Google Maps embebido

### Funcionalidades Implementadas

- **Carrusel automático**: Cambia de imagen cada 5 segundos
- **Menú responsive**: Menú hamburguesa para móviles
- **Animaciones scroll**: Elementos se revelan al hacer scroll
- **Botón flotante de WhatsApp**: Presente en todas las páginas
- **Lightbox para galerías**: Click en imágenes para ampliar
- **Formulario validado**: Validaciones básicas en el formulario de contacto
- **Diseño 100% responsive**: Adaptable a móviles, tablets y desktop

---

## Cómo Usar el Sitio

### 1. Visualizar el Sitio

Para ver el sitio web en acción:

1. Abrí el archivo `index.html` en tu navegador web
2. O usa un servidor local (recomendado):
   ```bash
   # Opción 1: Con Python 3
   python -m http.server 8000

   # Opción 2: Con Node.js
   npx serve .

   # Luego abrí: http://localhost:8000
   ```

### 2. Personalizar el Contenido

#### Cambiar Información de Contacto

En **TODAS las páginas HTML**, buscar y reemplazar:

- **Teléfono**: `+54 9 123 456-7890` → Tu número real
- **Email**: `contacto@hermanoscattaneo.com` → Tu email
- **Dirección**: `Calle Ejemplo 123, Ciudad, Provincia` → Tu dirección

#### Configurar WhatsApp

1. Abrir `js/main.js`
2. Buscar la línea 380 (aproximadamente)
3. Cambiar el número de teléfono:
   ```javascript
   const phoneNumber = '5491234567890'; // CAMBIAR AQUÍ
   ```
   **Formato**: Código de país + código de área + número (sin espacios ni guiones)

#### Cambiar Imágenes

Todas las imágenes actualmente usan URLs de **Pexels** (fotos de stock gratuitas). Para usar tus propias imágenes:

1. **Crear carpeta de imágenes**: `img/` en la raíz del proyecto
2. **Guardar tus fotos** en esa carpeta
3. **Reemplazar URLs** en los archivos HTML:

   Buscar:
   ```html
   src="https://images.pexels.com/..."
   ```

   Reemplazar por:
   ```html
   src="img/tu-foto.jpg"
   ```

#### Personalizar Textos

Cada archivo HTML tiene comentarios que indican dónde editar:

```html
<!-- EDITAR: Título del proyecto -->
<h1>Tu Título Aquí</h1>
```

Buscar todos los comentarios `<!-- EDITAR:` para encontrar secciones editables.

#### Configurar Google Maps

En `contacto.html`, buscar el iframe de Google Maps y reemplazarlo:

1. Ir a [Google Maps](https://www.google.com/maps)
2. Buscar tu dirección
3. Click en **Compartir** → **Insertar un mapa**
4. Copiar el código HTML
5. Reemplazar el iframe actual en `contacto.html`

#### Cambiar Colores

Los colores principales están definidos en `css/styles.css`:

```css
:root {
  --color-amarillo: #FFD700;    /* Cambiar aquí */
  --color-naranja: #FF8C00;     /* Cambiar aquí */
  --color-dorado: #DAA520;      /* Cambiar aquí */
}
```

---

## Agregar Contenido Nuevo

### Agregar un Nuevo Proyecto

1. **Duplicar** `proyecto-casa-moderna.html`
2. **Renombrar** el archivo (ej: `proyecto-mi-nuevo-proyecto.html`)
3. **Editar** el contenido:
   - Cambiar título, descripción, imágenes
   - Actualizar ficha técnica
   - Agregar fotos a la galería
4. **Agregar tarjeta** en `proyectos.html`:
   ```html
   <div class="project-card scroll-animate" onclick="window.location.href='proyecto-mi-nuevo-proyecto.html'">
     <img src="img/mi-proyecto.jpg" alt="Mi Proyecto" class="project-card-image">
     <div class="project-card-content">
       <span class="project-card-badge">Casa</span>
       <h3 class="project-card-title">Mi Nuevo Proyecto</h3>
       <p class="project-card-text">Descripción breve...</p>
       <div class="project-card-details">
         <span><i class="fas fa-ruler-combined"></i> 200m²</span>
         <span><i class="fas fa-bed"></i> 4 Habitaciones</span>
       </div>
     </div>
   </div>
   ```

### Agregar un Nuevo Servicio

En `servicios.html`, duplicar un bloque `.service-card-large` y editar el contenido.

---

## Configurar el Formulario de Contacto

El formulario actualmente tiene **validaciones básicas** pero no envía emails automáticamente. Para hacerlo funcional:

### Opción 1: Usar FormSpree (Gratis y Simple)

1. Ir a [https://formspree.io](https://formspree.io)
2. Crear cuenta gratuita
3. Crear un nuevo formulario
4. Copiar el endpoint
5. En `contacto.html`, agregar al formulario:
   ```html
   <form id="contact-form" action="https://formspree.io/f/TU_ID_AQUI" method="POST">
   ```

### Opción 2: Usar EmailJS

1. Ir a [https://www.emailjs.com](https://www.emailjs.com)
2. Seguir su guía de configuración
3. Modificar `js/main.js` función `initFormValidation`

### Opción 3: Backend Propio

Si tenés un servidor backend, podés enviar los datos mediante AJAX/Fetch a tu API.

---

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica del sitio
- **CSS3**: Estilos, animaciones y diseño responsive
- **JavaScript (ES6+)**: Interactividad y funcionalidades
- **Font Awesome**: Iconos
- **Google Fonts**: Tipografía Poppins

**No se utilizaron frameworks** como React, Vue o Angular. Todo es código HTML/CSS/JS puro y editable.

---

## Responsive Design

El sitio está optimizado para:

- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

---

## Navegadores Compatibles

- Chrome (recomendado)
- Firefox
- Safari
- Edge
- Opera

---

## Despliegue en Producción

### Opción 1: Hosting Tradicional (cPanel, FTP)

1. Subir todos los archivos al servidor via FTP
2. Asegurarse de que `index.html` esté en la raíz
3. Listo, el sitio está online

### Opción 2: Netlify (Gratis)

1. Crear cuenta en [Netlify](https://www.netlify.com)
2. Arrastrar la carpeta del proyecto
3. Listo, tenés un dominio gratuito

### Opción 3: GitHub Pages

1. Subir el proyecto a GitHub
2. Ir a Settings → Pages
3. Seleccionar la rama main
4. Tu sitio estará en `tu-usuario.github.io/nombre-repo`

---

## Checklist de Personalización

Antes de publicar, asegurate de:

- [ ] Cambiar **todos** los números de teléfono
- [ ] Cambiar **todos** los emails
- [ ] Actualizar dirección física
- [ ] Configurar número de WhatsApp en `main.js`
- [ ] Reemplazar **todas** las imágenes por las tuyas
- [ ] Cambiar Google Maps por tu ubicación
- [ ] Configurar formulario de contacto
- [ ] Actualizar textos y descripciones
- [ ] Verificar enlaces de redes sociales
- [ ] Probar en móvil y desktop
- [ ] Verificar que todos los enlaces funcionen

---

## Soporte y Ayuda

### Estructura de Comentarios

El código está **completamente comentado en español** con indicaciones claras:

```html
<!-- INICIO SECCIÓN: Nombre de la sección -->
...contenido...
<!-- FIN SECCIÓN: Nombre de la sección -->

<!-- EDITAR: Descripción de qué editar -->
```

### Encontrar Secciones Editables

Buscar en Visual Studio Code:
- `<!-- EDITAR:` para encontrar todas las secciones editables
- `// EDITAR:` para encontrar configuraciones en JavaScript

---

## Mantenimiento

- **Agregar proyectos nuevos** regularmente
- **Actualizar imágenes** con fotos de alta calidad
- **Revisar formulario** de contacto periódicamente
- **Actualizar información** de contacto si cambia

---

## Licencia y Créditos

- Imágenes de ejemplo: [Pexels](https://www.pexels.com) (Licencia Gratuita)
- Iconos: [Font Awesome](https://fontawesome.com) (Licencia Gratuita)
- Tipografía: [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins) (Licencia Gratuita)

---

**Desarrollado con atención al detalle para Hermanos Cattaneo**

Para cualquier consulta, revisá los comentarios en el código o abrí los archivos HTML en tu editor favorito.
