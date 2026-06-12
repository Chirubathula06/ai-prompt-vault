const API = '';
let token = localStorage.getItem('token') || '';
let user = JSON.parse(localStorage.getItem('user') || 'null');
let prompts = [];
let currentFilter = 'all';
let isRegister = false;

const $ = (id) => document.getElementById(id);

function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2500);
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

async function request(url, options = {}) {
  const res = await fetch(API + url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

function setAuthMode(register) {
  isRegister = register;
  $('registerTab').classList.toggle('active', register);
  $('loginTab').classList.toggle('active', !register);
  $('nameGroup').classList.toggle('hidden', !register);
  $('authSubmit').textContent = register ? 'Create Account' : 'Login';
}

function showApp() {
  $('authScreen').classList.add('hidden');
  $('appScreen').classList.remove('hidden');
  $('welcomeText').textContent = `Welcome back, ${user?.name || 'User'} 👋`;
  loadPrompts();
}

function showAuth() {
  $('appScreen').classList.add('hidden');
  $('authScreen').classList.remove('hidden');
}

async function handleAuth(e) {
  e.preventDefault();
  const payload = {
    email: $('email').value.trim(),
    password: $('password').value
  };
  if (isRegister) payload.name = $('name').value.trim();

  try {
    const data = await request(`/api/auth/${isRegister ? 'register' : 'login'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (isRegister) {
  showToast('Account created successfully. Please login now.');
  setAuthMode(false);
  $('authForm').reset();
  return;
}

token = data.token;
user = { name: data.name, email: data.email, id: data._id };
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
showToast('Login successful!');
showApp();
  } catch (err) {
    showToast(err.message);
  }
}

async function loadPrompts() {
  try {
    prompts = await request('/api/prompts', { headers: authHeaders() });
    renderPrompts();
  } catch (err) {
    showToast(err.message);
  }
}

async function searchPrompts() {
  const q = $('searchInput').value.trim();
  if (!q) return loadPrompts();
  try {
    prompts = await request(`/api/prompts/search?q=${encodeURIComponent(q)}`, { headers: authHeaders() });
    renderPrompts();
  } catch (err) {
    showToast(err.message);
  }
}

function filteredPrompts() {
  if (currentFilter === 'favorite') return prompts.filter((p) => p.favorite);
  if (currentFilter === 'all') return prompts;
  return prompts.filter((p) => p.category === currentFilter);
}

function renderStats() {
  const categories = new Set(prompts.map((p) => p.category));
  $('totalCount').textContent = prompts.length;
  $('favoriteCount').textContent = prompts.filter((p) => p.favorite).length;
  $('categoryCount').textContent = categories.size;
}

function renderPrompts() {
  renderStats();
  const list = filteredPrompts();
  const grid = $('promptGrid');
  grid.innerHTML = '';
  $('emptyState').classList.toggle('hidden', list.length > 0);

  list.forEach((prompt) => {
    const card = document.createElement('article');
    card.className = 'prompt-card';
    card.innerHTML = `
      <div class="card-top">
        <h3>${escapeHtml(prompt.title)}</h3>
        <button class="fav ${prompt.favorite ? 'active' : ''}" data-action="favorite" data-id="${prompt._id}">${prompt.favorite ? '⭐' : '☆'}</button>
      </div>
      <span class="category">${escapeHtml(prompt.category || 'General')}</span>
      <p class="content">${escapeHtml(shorten(prompt.content, 180))}</p>
      <div class="tags">${(prompt.tags || []).map((tag) => `<span class="tag">#${escapeHtml(tag)}</span>`).join('')}</div>
      <div class="card-actions">
        <button data-action="copy" data-id="${prompt._id}">Copy</button>
        <button data-action="edit" data-id="${prompt._id}">Edit</button>
        <button class="delete" data-action="delete" data-id="${prompt._id}">Delete</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openModal(prompt = null) {
  $('modal').classList.remove('hidden');
  $('modalTitle').textContent = prompt ? 'Edit Prompt' : 'Create Prompt';
  $('promptId').value = prompt?._id || '';
  $('promptTitle').value = prompt?.title || '';
  $('promptCategory').value = prompt?.category || 'Writing';
  $('promptTags').value = (prompt?.tags || []).join(', ');
  $('promptContent').value = prompt?.content || '';
}

function closeModal() {
  $('modal').classList.add('hidden');
  $('promptForm').reset();
  $('promptId').value = '';
}

async function savePrompt(e) {
  e.preventDefault();
  const id = $('promptId').value;
  const payload = {
    title: $('promptTitle').value.trim(),
    category: $('promptCategory').value,
    tags: $('promptTags').value.split(',').map((t) => t.trim()).filter(Boolean),
    content: $('promptContent').value.trim()
  };

  try {
    await request(id ? `/api/prompts/${id}` : '/api/prompts', {
      method: id ? 'PUT' : 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });
    closeModal();
    showToast(id ? 'Prompt updated!' : 'Prompt created!');
    loadPrompts();
  } catch (err) {
    showToast(err.message);
  }
}

async function handleCardAction(e) {
  const button = e.target.closest('button');
  if (!button?.dataset.action) return;
  const action = button.dataset.action;
  const id = button.dataset.id;
  const prompt = prompts.find((p) => p._id === id);

  try {
    if (action === 'copy') {
      await navigator.clipboard.writeText(prompt.content);
      showToast('Prompt copied!');
    }
    if (action === 'edit') openModal(prompt);
    if (action === 'favorite') {
      await request(`/api/prompts/${id}/favorite`, { method: 'PATCH', headers: authHeaders() });
      await loadPrompts();
    }
    if (action === 'delete') {
      if (!confirm('Delete this prompt?')) return;
      await request(`/api/prompts/${id}`, { method: 'DELETE', headers: authHeaders() });
      showToast('Prompt deleted');
      await loadPrompts();
    }
  } catch (err) {
    showToast(err.message);
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  token = '';
  user = null;
  showAuth();
}

function shorten(text, max) {
  return text.length > max ? text.slice(0, max) + '...' : text;
}

function escapeHtml(str = '') {
  return String(str).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}

$('loginTab').addEventListener('click', () => setAuthMode(false));
$('registerTab').addEventListener('click', () => setAuthMode(true));
$('authForm').addEventListener('submit', handleAuth);
$('newPromptBtn').addEventListener('click', () => openModal());
$('closeModalBtn').addEventListener('click', closeModal);
$('modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });
$('promptForm').addEventListener('submit', savePrompt);
$('promptGrid').addEventListener('click', handleCardAction);
$('logoutBtn').addEventListener('click', logout);
$('searchInput').addEventListener('input', debounce(searchPrompts, 350));
$('clearSearchBtn').addEventListener('click', () => { $('searchInput').value = ''; loadPrompts(); });

document.querySelectorAll('.side-link').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.side-link').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderPrompts();
  });
});

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

if (token && user) showApp();
else showAuth();
