// State Management
let allIssues = [];
let currentFilter = 'all';

// Login Functionality
const handleLogin = () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        loadIssues();
    } else {
        alert('Invalid Credentials!');
    }
};

// Fetch All Issues
const loadIssues = async () => {
    toggleLoading(true);
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    allIssues = data.data;
    displayIssues(allIssues);
    toggleLoading(false);
};



// Display Issues in Cards
const displayIssues = (issues) => {
    const container = document.getElementById('issues-container');
    const countElement = document.getElementById('issue-count');
    container.innerHTML = '';
    countElement.innerText = issues.length;

    issues.forEach(issue => {
        const isClosed = issue.status.toLowerCase() === 'closed';
        const cardClass = isClosed ? 'card-closed' : 'card-open';
        const statusIcon = isClosed ? './assets/Closed- Status .png' : './assets/Open-Status.png';
        
        const card = document.createElement('div');
        card.className = `bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between ${cardClass}`;
        card.onclick = () => showIssueDetails(issue.id);

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <img src="${statusIcon}" class="w-5" alt="status">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-600 uppercase">${issue.priority}</span>
                </div>
                <h3 class="font-bold text-sm text-gray-800 mb-1 line-clamp-1">${issue.title}</h3>
                <p class="text-xs text-gray-500 mb-3 line-clamp-2">${issue.description}</p>
                <div class="flex gap-2 mb-4">
                    <span class="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-bold uppercase">${issue.labels}</span>
                </div>
            </div>
            <div class="border-t pt-3 flex flex-col gap-1">
                <p class="text-[10px] text-gray-400 font-medium">#${issue.id} by ${issue.author}</p>
                <p class="text-[10px] text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
        `;
        container.appendChild(card);
    });
};

// Filter Functionality
const filterIssues = (status) => {
    currentFilter = status;
    
    // Update Tab UI
    const tabs = ['all', 'open', 'closed'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (t === status) btn.classList.add('active-tab');
        else btn.classList.remove('active-tab');
    });

    if (status === 'all') {
        displayIssues(allIssues);
    } else {
        const filtered = allIssues.filter(item => item.status.toLowerCase() === status);
        displayIssues(filtered);
    }
};

// Search Functionality
const handleSearch = async () => {
    const query = document.getElementById('search-input').value;
    if (!query) return loadIssues();

    toggleLoading(true);
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
    const data = await res.json();
    displayIssues(data.data);
    toggleLoading(false);
};



// Utility: Loading Spinner
const toggleLoading = (show) => {
    const spinner = document.getElementById('loading-spinner');
    const container = document.getElementById('issues-container');
    if (show) {
        spinner.classList.remove('hidden');
        container.classList.add('hidden');
    } else {
        spinner.classList.add('hidden');
        container.classList.remove('hidden');
    }
};