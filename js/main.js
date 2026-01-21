// Simple script: theme toggle + load projects.json and render cards
const THEME_KEY = 'site:theme';
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function setTheme(t){
  if(t === 'dark') document.documentElement.setAttribute('data-theme','dark');
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem(THEME_KEY, t);
  toggleBtn.textContent = t === 'dark' ? '☀️ / 🌙' : '🌙 / ☀️';
}

function initTheme(){
  const stored = localStorage.getItem(THEME_KEY);
  if(stored) setTheme(stored);
  else {
    // prefer-system?
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

toggleBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  setTheme(cur === 'dark' ? 'light' : 'dark');
});

async function loadProjects(){
  try{
    const res = await fetch('projects.json', {cache: "no-store"});
    if(!res.ok) throw new Error('Unable to load projects.json');
    const projects = await res.json();
    renderProjects(projects);
  }catch(e){
    console.error(e);
    document.getElementById('projects').innerHTML = '<p class="muted">Failed to load projects.</p>';
  }
}

function renderProjects(list){
  const container = document.getElementById('projects');
  container.innerHTML = '';
  list.forEach(p=>{
    const a = document.createElement('a');
    a.className = 'card';
    a.href = p.url || '#';
    a.target = p.url ? '_self' : '_blank';
    a.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = p.image || 'assets/project-placeholder.png';
    img.alt = p.title || 'Project';

    const h3 = document.createElement('h3');
    h3.textContent = p.title;

    const desc = document.createElement('p');
    desc.textContent = p.description || '';

    const meta = document.createElement('div');
    meta.className = 'meta';
    const tech = document.createElement('span');
    tech.textContent = p.tech ? p.tech.join(' · ') : '';
    const date = document.createElement('span');
    date.textContent = p.date || '';

    meta.appendChild(tech);
    meta.appendChild(date);

    a.appendChild(img);
    a.appendChild(h3);
    a.appendChild(desc);
    a.appendChild(meta);

    container.appendChild(a);
  });
}

initTheme();
loadProjects();