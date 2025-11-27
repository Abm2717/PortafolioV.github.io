const API_URL = 'https://portfolio-api-three-black.vercel.app/api/v1';
const ITSON_ID = '251914';

const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = document.querySelector('.close-btn');

menuBtn?.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeBtn?.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

async function loadProjects() {
    const container = document.getElementById('projectsContainer');
    
    try {
        const response = await fetch(`${API_URL}/publicProjects/${ITSON_ID}`);
        
        if (!response.ok) {
            throw new Error('Error al cargar proyectos');
        }

        const projects = await response.json();

        container.innerHTML = '';

        if (!projects || !Array.isArray(projects) || projects.length === 0) {
            container.innerHTML = '<div class="loading">No hay proyectos disponibles</div>';
            return;
        }

        projects.forEach(project => {
            const card = createProjectCard(project);
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div class="loading">Error al cargar los proyectos</div>';
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    let imageUrl = 'https://placehold.co/400x200/e3f2fd/0277bd?text=Proyecto';
    if (project.images && Array.isArray(project.images) && project.images.length > 0) {
        imageUrl = project.images[0];
    }

    let technologies = [];
    if (typeof project.technologies === 'string') {
        technologies = project.technologies.split(',').map(t => t.trim());
    } else if (Array.isArray(project.technologies)) {
        technologies = project.technologies;
    }

    const techTags = technologies.map(tech => 
        `<span>${tech}</span>`
    ).join('');

    card.innerHTML = `
        <img src="${imageUrl}" 
             alt="${project.title}" 
             class="project-image"
             onerror="this.onerror=null; this.src='https://placehold.co/400x200/e3f2fd/0277bd?text=Sin+Imagen';">
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            ${technologies.length > 0 ? `
                <div class="project-tags">${techTags}</div>
            ` : ''}
            <div class="project-links">
                ${project.repository ? `
                    <a href="${project.repository}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="project-link">Repositorio</a>
                ` : ''}
            </div>
        </div>
    `;

    return card;
}

const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Gracias por contactarme.');
    contactForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});