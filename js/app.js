// Utility to display errors
function showError(msg) {
  let box = document.getElementById('errors');
  if (!box) {
    box = document.createElement('div');
    box.id = 'errors';
    box.style.cssText = 'position:fixed;right:12px;bottom:12px;max-width:420px;background:#fff3f3;color:#a40000;border:1px solid #f0bdbd;padding:12px 14px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.08);font:14px system-ui,sans-serif;z-index:9999';
    document.body.appendChild(box);
  }
  const p = document.createElement('div');
  p.textContent = msg;
  box.appendChild(p);
  console.error(msg);
}

// Copyright Year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Dark Mode Toggle
document.getElementById('modeToggle')?.addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.classList.toggle('dark');
  localStorage.setItem('mode', dark ? 'dark' : 'light');
});
if (localStorage.getItem('mode') === 'dark') document.documentElement.classList.add('dark');

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Close menu when clicking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });
}

// Fetching Data
const bust = '?v=' + Date.now();
async function getJSON(url) {
  try {
    const r = await fetch(url + bust, { cache: 'no-store' });
    if (!r.ok) throw new Error(`HTTP ${r.status} al cargar ${url}`);
    return await r.json();
  } catch (err) {
    showError(`No se pudo cargar ${url}: ${err.message}`);
    throw err;
  }
}

async function getIcon(name) {
  try {
    const r = await fetch('assets/icons/' + name + '.svg' + bust, { cache: 'no-store' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.text();
  } catch (err) {
    // console.warn(`No se pudo cargar el ícono ${name}.svg`);
    return '';
  }
}

// --- Content Loading ---

// HERO (content/hero.json)
getJSON('content/hero.json').then(data => {
  const hero = document.getElementById('hero-content');
  if (!hero) return;
  function br(text) { return (text || '').replace(/\n/g, '<br>'); }
  hero.innerHTML = `
    <h2 class="hero-title">Laboratorio en Inteligencia Artificial y Desarrollo de Software</h2>
    <p class="hero-text">${br(data.descripcion)}</p>
    
    <div class="hero-grid">
        <div class="hero-card">
            <div class="icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="feature-icon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                </svg>
            </div>
            <div>
                <h4>Misión</h4>
                <p>${br(data.mision)}</p>
            </div>
        </div>
        
        <div class="hero-card">
            <div class="icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="feature-icon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </div>
            <div>
                <h4>Visión</h4>
                <p>${br(data.vision)}</p>
            </div>
        </div>

        <div class="hero-card">
            <div class="icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="feature-icon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            </div>
            <div>
                <h4>Valores</h4>
                <p>${br(data.valores)}</p>
            </div>
        </div>

        <div class="hero-card">
            <div class="icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="feature-icon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
            </div>
            <div>
                <h4>Ética</h4>
                <p>${br(data.etica)}</p>
            </div>
        </div>
    </div>
    <div class="hero-actions">
        <a class="btn primary" href="#proyectos">Ver proyectos</a>
        <a class="btn ghost" href="#contacto">Colabora con nosotros</a>
    </div>
  `;
}).catch(() => { });

// AREAS (content/areas.json)
getJSON('content/areas.json').then(items => {
  const grid = document.getElementById('areas');
  if (!grid) return;
  items.forEach(a => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `<h4>${a.title}</h4><p>${a.description || ''}</p>`;
    grid.appendChild(el);
  });
}).catch(() => { });

// TEAM (content/team.json)
getJSON('content/team.json').then(async members => {
  const grid = document.getElementById('team');
  if (!grid) return;
  for (const m of members) {
    const el = document.createElement('div');
    el.className = 'team-card';

    // Social icons generation
    const socials = [['scholar', 'scholar'], ['orcid', 'orcid'], ['github', 'github'], ['linkedin', 'linkedin']];
    let iconHtml = '';

    for (const [key, iconName] of socials) {
      if (m[key]) {
        const iconSvg = await getIcon(iconName);
        iconHtml += `<a href="${m[key]}" target="_blank" rel="noopener">${iconSvg}</a>`;
      }
    }
    const iconRow = iconHtml ? `<div class="icon-row">${iconHtml}</div>` : '';

    el.innerHTML = `
        <img class="team-photo" src="${m.photo}" alt="${m.name}">
        ${iconRow}
        <div class="meta">
            <strong>${m.name}</strong>
            <span>${m.role || ''}</span>
            ${m.email ? `<a href="mailto:${m.email}" style="font-size:0.9rem;">${m.email}</a>` : ''}
        </div>`;

    grid.appendChild(el);
  }
}).catch(() => { });

// BLOG INDEX (content/blog_index.json)
getJSON('content/blog_index.json').then(items => {
  const grid = document.getElementById('projects');
  if (!grid) return;
  items.forEach(p => {
    const el = document.createElement('article');
    el.className = 'card project-card';
    el.style.cursor = 'pointer';

    // Add click event to open post
    el.addEventListener('click', () => {
      openPost(p.slug);
    });

    const tags = (p.tags || []).map(t => `<span class="badge">${t}</span>`).join('');
    const status = p.status ? `<span class="badge">${p.status}</span>` : '';

    el.innerHTML = `
      <h4>${p.title}</h4>
      <p>${p.summary || ''}</p>
      <div class="project-meta">${status}${tags}</div>
    `;
    grid.appendChild(el);
  });
}).catch(() => { });


// --- Routing & Post View ---

function openPost(slug) {
  // Update URL without reload
  const url = new URL(window.location);
  url.searchParams.set('view', 'post');
  url.searchParams.set('slug', slug);
  window.history.pushState({}, '', url);
  renderPostView(slug);
}

function renderPostView(slug) {
  const mainSections = document.getElementById('home-sections');
  const postSection = document.getElementById('post-detail');
  const heroSection = document.getElementById('hero-section');
  const postContent = document.getElementById('post-content');

  // Fetch the specific post JSON
  getJSON(`content/posts/${slug}.json`).then(post => {
    // Toggle visibility
    if (mainSections) mainSections.style.display = 'none';
    if (postSection) postSection.style.display = 'block';
    if (heroSection) heroSection.style.display = 'none';

    // Render content
    postContent.innerHTML = `
            <h1>${post.title}</h1>
            <div class="post-meta">
                <span>${post.date || ''}</span> • 
                <span>${post.author || ''}</span>
            </div>
            ${post.image ? `<img src="${post.image}" alt="${post.title}" style="max-width:100%;border-radius:12px;margin:20px 0;">` : ''}
            <div class="post-body">
                ${post.body || ''}
            </div>
        `;
    // Scroll to top
    window.scrollTo(0, 0);
  }).catch(err => {
    showError("No se pudo cargar el post: " + slug);
  });
}

function renderHomeView() {
  const mainSections = document.getElementById('home-sections');
  const postSection = document.getElementById('post-detail');
  const heroSection = document.getElementById('hero-section');

  if (mainSections) mainSections.style.display = 'block';
  if (postSection) postSection.style.display = 'none';
  if (heroSection) heroSection.style.display = 'block';

  // Clean URL
  if (window.location.search) {
    window.history.pushState({}, '', '/');
  }
}

// Back button
document.getElementById('back-btn')?.addEventListener('click', () => {
  renderHomeView();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  checkUrlParams();
});

// Initial load check
function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('view') === 'post' && params.get('slug')) {
    renderPostView(params.get('slug'));
  } else {
    renderHomeView();
  }
}

checkUrlParams();
