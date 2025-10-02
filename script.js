function showError(msg){
  let box=document.getElementById('errors');
  if(!box){
    box=document.createElement('div');
    box.id='errors';
    box.style.cssText='position:fixed;right:12px;bottom:12px;max-width:420px;background:#fff3f3;color:#a40000;border:1px solid #f0bdbd;padding:12px 14px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.08);font:14px system-ui,sans-serif;z-index:9999';
    document.body.appendChild(box);
  }
  const p=document.createElement('div');
  p.textContent=msg; box.appendChild(p); console.error(msg);
}
const year=document.getElementById('year'); if(year) year.textContent=new Date().getFullYear();

document.getElementById('modeToggle')?.addEventListener('click',()=>{
  const root=document.documentElement; const dark=root.classList.toggle('dark');
  localStorage.setItem('mode', dark?'dark':'light');
});
if(localStorage.getItem('mode')==='dark') document.documentElement.classList.add('dark');

const bust='?v='+Date.now();
async function getJSON(url){
  try{
    const r=await fetch(url+bust,{cache:'no-store'});
    if(!r.ok) throw new Error(`HTTP ${r.status} al cargar ${url}`);
    return await r.json();
  }catch(err){ showError(`No se pudo cargar ${url}: ${err.message}`); throw err; }
}
async function getIcon(name){
  try{
    const r=await fetch('assets/icons/'+name+'.svg'+bust,{cache:'no-store'});
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.text();
  }catch(err){ showError(`No se pudo cargar el ícono ${name}.svg: ${err.message}`); return ''; }
}

// AREAS (areas.json)
getJSON('areas.json').then(items=>{
  const grid=document.getElementById('areas'); if(!grid) return;
  items.forEach(a=>{
    const el=document.createElement('article'); el.className='card';
    el.innerHTML = `<h4>${a.title}</h4><p>${a.description||''}</p>`;
    grid.appendChild(el);
  });
}).catch(()=>{});


// TEAM (icons below photo)
getJSON('team.json').then(async members=>{
  const grid=document.getElementById('team'); if(!grid) return;
  for(const m of members){
    const el=document.createElement('div'); el.className='team-card';
    el.innerHTML=`
      <div class="left">
        <img class="team-photo" src="${m.photo}" alt="${m.name}">
        <div class="icon-row"></div>
      </div>
      <div class="meta">
        <strong>${m.name}</strong><br>
        <span>${m.role||''}</span><br>
        ${m.email ? `<a href="mailto:${m.email}">${m.email}</a>` : ''}
      </div>`;
    const row=el.querySelector('.icon-row');
    const socials=[['scholar','scholar'],['orcid','orcid'],['github','github'],['linkedin','linkedin']];
    for(const [key, iconName] of socials){
      if(m[key]){
        const a=document.createElement('a'); a.href=m[key]; a.target='_blank'; a.rel='noopener';
        a.innerHTML=await getIcon(iconName); row.appendChild(a);
      }
    }
    grid.appendChild(el);
  }
}).catch(()=>{});

// PROJECTS (minimal)
getJSON('projects.json').then(items=>{
  const grid=document.getElementById('projects'); if(!grid) return;
  items.forEach(p=>{
    const el=document.createElement('article'); el.className='card';
    const tags=(p.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('');
    const status=p.status ? `<span class="badge">${p.status}</span>` : '';
    el.innerHTML = `
      <h4>${p.title}</h4>
      <p>${p.summary||''}</p>
      <div class="project-meta">${status}${tags}</div>
      ${p.members && p.members.length ? `<div class="people-mini">Integrantes: ${p.members.join(', ')}</div>`:''}
    `;
    grid.appendChild(el);
  });
}).catch(()=>{});

// HERO (hero.json)
getJSON('hero.json').then(data => {
  const hero = document.getElementById('hero-content');
  if (!hero) return;
  function br(text) {
    return (text || '').replace(/\n/g, '<br>');
  }
  hero.innerHTML = `
    <h2 class="hero-title">Laboratorio en Inteligencia Artificial y Desarrollo de Software</h2>
    <p class="hero-text">${br(data.descripcion)}</p>
    <div class="hero-extra">
      <h4>Misión</h4>
      <p>${br(data.mision)}</p>
      <h4>Visión</h4>
      <p>${br(data.vision)}</p>
      <h4>Valores</h4>
      <p>${br(data.valores)}</p>
      <h4>Ética</h4>
      <p>${br(data.etica)}</p>
    </div>
    <div class="hero-actions">
      <a class="btn primary" href="#proyectos">Ver proyectos</a>
      <a class="btn ghost" href="#contacto">Colabora con nosotros</a>
    </div>
  `;
}).catch(()=>{});
