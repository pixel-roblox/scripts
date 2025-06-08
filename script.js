// Simple owner password (change this to something secure!)
const OWNER_PASSWORD = 'changeme';

// Store scripts in localStorage for demo (replace with backend for production)
function getScripts() {
    return JSON.parse(localStorage.getItem('scripts') || '{}');
}
function setScripts(scripts) {
    localStorage.setItem('scripts', JSON.stringify(scripts));
}

function login() {
    const pw = document.getElementById('ownerPassword').value;
    if (pw === OWNER_PASSWORD) {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('ownerSection').classList.remove('hidden');
        renderOwnerScripts();
    } else {
        alert('Wrong password!');
    }
}

function saveScript() {
    const name = document.getElementById('scriptName').value.trim();
    const content = document.getElementById('scriptContent').value;
    if (!name || !content) {
        alert('Please enter both name and content.');
        return;
    }
    const scripts = getScripts();
    scripts[name] = content;
    setScripts(scripts);
    document.getElementById('scriptName').value = '';
    document.getElementById('scriptContent').value = '';
    renderOwnerScripts();
    renderPublicScripts();
}

function renderOwnerScripts() {
    const scripts = getScripts();
    const list = document.getElementById('scriptsList');
    list.innerHTML = '<h3>Saved Scripts</h3>';
    Object.keys(scripts).forEach(name => {
        list.innerHTML += `<div class="script-block"><b>${name}</b><br><span class="script-raw-link" onclick="showRaw('${name}', true)">View Raw</span></div>`;
    });
}

function renderPublicScripts() {
    const scripts = getScripts();
    const list = document.getElementById('publicScriptsList');
    list.innerHTML = '';
    Object.keys(scripts).forEach(name => {
        list.innerHTML += `<div class="script-block"><b>${name}</b><br><span class="script-raw-link" onclick="showRaw('${name}', false)">View Raw</span></div>`;
    });
}

function showRaw(name, isOwner) {
    const scripts = getScripts();
    let content = '';
    if (isOwner) {
        content = scripts[name] || '';
    } else {
        content = 'Go away, not allowed.';
    }
    const win = window.open('', '_blank');
    win.document.write(content);
    win.document.title = name;
}

// On page load
window.onload = function() {
    renderPublicScripts();
}; 