let prompts = JSON.parse(localStorage.getItem('promptLibrary')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || ["Generative", "Agentic", "Coding", "Chat"];
let contentTypes = JSON.parse(localStorage.getItem('contentTypes')) || ["Image", "Video", "Audio", "App"];

function init() {
    updateAllDropdowns();
    renderPrompts();

    // Load saved background toggle status from localStorage
    const savedBgStatus = localStorage.getItem('bgToggleStatus');
    if (savedBgStatus !== null) {
        document.getElementById('bgToggle').checked = savedBgStatus === 'true';
        toggleBackgroundVisibility();
    }

    // Generate random circles for the background
    generateCircles();
}

function generateCircles() {
    const bgContainer = document.getElementById('bg-animation');
    const circleCount = 12;

    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';

        // Randomize properties
        const size = Math.floor(Math.random() * (80 - 40) + 40); // Smaller sizes: 40px to 80px
        const left = Math.floor(Math.random() * 100);
        const delay = Math.floor(Math.random() * 30);
        const duration = Math.floor(Math.random() * (40 - 20) + 20);

        circle.style.left = `${left}%`;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.animationDelay = `${delay}s`;
        circle.style.animationDuration = `${duration}s`;

        bgContainer.appendChild(circle);
    }
}

function updateAllDropdowns() {
    const filterCat = document.getElementById('filterCategory');
    const promptCat = document.getElementById('category');
    const filterType = document.getElementById('filterType');
    const promptType = document.getElementById('contentType');

    if (filterCat) {
        filterCat.innerHTML = `<option value="All">All Categories</option>` +
            categories.map(c => `<option value="${c}">${c}</option>`).join('');
    }
    if (promptCat) {
        promptCat.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
    }
    if (filterType) {
        filterType.innerHTML = `<option value="All">All Types</option>` +
            contentTypes.map(t => `<option value="${t}">${t}</option>`).join('');
    }
    if (promptType) {
        promptType.innerHTML = contentTypes.map(t => `<option value="${t}">${t}</option>`).join('');
    }
}

function savePrompt(e) {
    e.preventDefault();
    const id = document.getElementById('editId').value;

    const newPrompt = {
        id: id ? parseInt(id) : Date.now(),
        title: document.getElementById('title').value.trim(),
        category: document.getElementById('category').value,
        contentType: document.getElementById('contentType').value,
        promptContent: document.getElementById('promptContent').value.trim(),
        tags: document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t),
        timestamp: id ? prompts.find(p => p.id == id).timestamp : Date.now()
    };

    if (id) {
        const index = prompts.findIndex(p => p.id == id);
        prompts[index] = newPrompt;
    } else {
        prompts.push(newPrompt);
    }

    localStorage.setItem('promptLibrary', JSON.stringify(prompts));
    closeModal();
    renderPrompts();
}

function renderPrompts() {
    const grid = document.getElementById('promptGrid');
    const catFilter = document.getElementById('filterCategory').value;
    const typeFilter = document.getElementById('filterType').value;
    const sortBy = document.getElementById('sortBy').value;
    const search = document.getElementById('searchInput').value.toLowerCase();

    let filtered = prompts.filter(p => {
        const matchesCat = catFilter === 'All' || p.category === catFilter;
        const matchesType = typeFilter === 'All' || p.contentType === typeFilter;
        const matchesSearch = p.title.toLowerCase().includes(search) ||
            p.promptContent.toLowerCase().includes(search) ||
            p.tags.some(t => t.toLowerCase().includes(search));
        return matchesCat && matchesType && matchesSearch;
    });

    filtered.sort((a, b) => {
        if (sortBy === 'newest') return b.timestamp - a.timestamp;
        if (sortBy === 'oldest') return a.timestamp - b.timestamp;
        if (sortBy === 'az') return a.title.localeCompare(b.title);
        if (sortBy === 'za') return a.title.localeCompare(a.title);
    });

    grid.innerHTML = filtered.map(p => `
        <div class="glass-card p-6 rounded-3xl animate-fade-in">
            <div class="flex justify-between items-start mb-4">
                <div class="flex flex-wrap gap-1">
                    <span class="px-2 py-0.5 bg-gray-800 text-gray-300 text-[10px] font-bold uppercase rounded-md">${p.category}</span>
                    <span class="px-2 py-0.5 bg-gray-800 text-gray-300 text-[10px] font-bold uppercase rounded-md">${p.contentType}</span>
                </div>
                <div class="flex gap-2">
                    <button onclick="copyPrompt('${p.id}')" class="text-gray-500 hover:text-white transition p-1" title="Copy Prompt">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button onclick="editPrompt(${p.id})" class="text-gray-500 hover:text-blue-400 transition p-1">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button onclick="deletePrompt(${p.id})" class="text-gray-500 hover:text-red-400 transition p-1">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2 text-white">${p.title}</h3>
            <div class="bg-[#0a0a0a] p-4 rounded-xl mb-4 max-h-48 overflow-y-auto custom-scrollbar text-sm text-gray-400 text-left">
                ${p.promptContent}
            </div>
            <div class="flex flex-wrap gap-2 mt-4">
                ${p.tags.map(t => `<span class="text-[10px] bg-[#2a2a2a] px-2 py-1 rounded-full text-gray-500">#${t}</span>`).join('')}
            </div>
            <div class="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-600">
                <span>${new Date(p.timestamp).toLocaleString()}</span>
            </div>
        </div>
    `).join('');

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-20 text-center text-gray-600">No prompts found matching your filters.</div>`;
    }
}

function openModal() {
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('promptForm').reset();
    document.getElementById('editId').value = '';
    document.getElementById('modalTitle').innerText = 'Add New Prompt';
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Category CRUD Logic
function openCategoryModal() {
    document.getElementById('categoryModal').classList.remove('hidden');
    renderCategories();
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.add('hidden');
}

function renderCategories() {
    const list = document.getElementById('categoryList');
    if (!list) return;
    list.innerHTML = categories.map((c, index) => `
        <div class="flex justify-between items-center bg-[#2a2a2a] p-3 rounded-xl mb-2">
            <span>${c}</span>
            <button onclick="deleteCategory(${index})" class="text-red-500 hover:text-red-400">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function addCategory() {
    const input = document.getElementById('newCatName');
    const name = input.value.trim();
    if (name && !categories.includes(name)) {
        categories.push(name);
        localStorage.setItem('categories', JSON.stringify(categories));
        input.value = '';
        renderCategories();
        updateAllDropdowns();
        renderPrompts();
    } else {
        alert("Please enter a unique category name.");
    }
}

function deleteCategory(index) {
    if (confirm('Delete this category? Prompts assigned to it will remain but won\'t show in this filter.')) {
        categories.splice(index, 1);
        localStorage.setItem('categories', JSON.stringify(categories));
        renderCategories();
        updateAllDropdowns();
        renderPrompts();
    }
}

// Content Type CRUD Logic
function openContentTypeModal() {
    document.getElementById('contentTypeModal').classList.remove('hidden');
    renderContentTypes();
}

function closeContentTypeModal() {
    document.getElementById('contentTypeModal').classList.add('hidden');
}

function renderContentTypes() {
    const list = document.getElementById('contentTypeList');
    if (!list) return;
    list.innerHTML = contentTypes.map((t, index) => `
        <div class="flex justify-between items-center bg-[#2a2a2a] p-3 rounded-xl mb-2">
            <span>${t}</span>
            <button onclick="deleteContentType(${index})" class="text-red-500 hover:text-red-400">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function addContentType() {
    const input = document.getElementById('newTypeName');
    const name = input.value.trim();
    if (name && !contentTypes.includes(name)) {
        contentTypes.push(name);
        localStorage.setItem('contentTypes', JSON.stringify(contentTypes));
        input.value = '';
        renderContentTypes();
        updateAllDropdowns();
        renderPrompts();
    } else {
        alert("Please enter a unique content type name.");
    }
}

function deleteContentType(index) {
    if (confirm('Delete this content type? Prompts assigned to it will remain but won\'t show in this filter.')) {
        contentTypes.splice(index, 1);
        localStorage.setItem('contentTypes', JSON.stringify(contentTypes));
        renderContentTypes();
        updateAllDropdowns();
        renderPrompts();
    }
}

// Prompt Actions
function editPrompt(id) {
    const p = prompts.find(p => p.id == id);
    if (!p) return;

    document.getElementById('editId').value = p.id;
    document.getElementById('title').value = p.title;
    document.getElementById('category').value = p.category;
    document.getElementById('contentType').value = p.contentType;
    document.getElementById('promptContent').value = p.promptContent;
    document.getElementById('tags').value = p.tags.join(', ');

    document.getElementById('modalTitle').innerText = 'Edit Prompt';
    document.getElementById('modal').classList.remove('hidden');
}

function deletePrompt(id) {
    if (confirm('Are you sure you want to delete this prompt?')) {
        prompts = prompts.filter(p => p.id != id);
        localStorage.setItem('promptLibrary', JSON.stringify(prompts));
        renderPrompts();
        closeModal();
    }
}

function copyPrompt(id) {
    const p = prompts.find(p => p.id == id);
    if (!p) return;
    navigator.clipboard.writeText(p.promptContent);
}


// Data Management
function exportData() {
    // Create a wrapper object containing all data types
    const dataToExport = {
        prompts: prompts,
        categories: categories,
        contentTypes: contentTypes,
        exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "prompt_library_backup-" + new Date().toISOString().split('T')[0] + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const rawContent = e.target ? e.target.result : e.result;
            if (rawContent === undefined || rawContent === null) {
                throw new Error('File content is empty or could not be read.');
            }
            const content = rawContent.trim(); 
            const imported = JSON.parse(content);

            // Handle the new object structure
            if (typeof imported === 'object' && Array.isArray(imported.prompts)) {
                prompts = imported.prompts;
                categories = imported.categories || categories; // Fallback to existing if missing in file
                contentTypes = imported.contentTypes || contentTypes;

                // Save all updated values to localStorage
                localStorage.setItem('promptLibrary', JSON.stringify(prompts));
                localStorage.setItem('categories', JSON.stringify(categories));
                localStorage.setItem('contentTypes', JSON.stringify(contentTypes));

                renderPrompts();
                updateAllDropdowns();
                alert('Import successful!');
            } 
            // Backward compatibility: handle if the file is just an array of prompts (old format)
            else if (Array.isArray(imported)) {
                prompts = imported;
                localStorage.setItem('promptLibrary', JSON.stringify(prompts));
                renderPrompts();
                alert('Import successful! (Note: Categories and Types were not included in this older file format)');
            } else {
                alert('Invalid file format. The JSON should be an object containing a "prompts" array.');
            }
        } catch (err) {
            console.error('JSON Parse Error:', err); 
            alert('Error parsing JSON file. Check console for details.');
        }
    };
    reader.readAsText(file);
}

// Background Toggle Logic with Persistence
function toggleBackgroundVisibility() {
    const bg = document.getElementById('bg-animation');
    const checkbox = document.getElementById('bgToggle');
    if (checkbox.checked) {
        bg.classList.remove('bg-hidden');
    } else {
        bg.classList.add('bg-hidden');
    }
}

document.getElementById('bgToggle').addEventListener('change', function () {
    toggleBackgroundVisibility();
    localStorage.setItem('bgToggleStatus', this.checked);
});

// Initialize the app
init();
