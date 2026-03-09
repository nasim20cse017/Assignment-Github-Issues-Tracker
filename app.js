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


// Priority Badge Style
const getPriorityBadge = (priority) => {
    const p = priority.toLowerCase();

    if (p === 'high') {
        return `<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-600 uppercase">${priority}</span>`;
    } 
    else if (p === 'medium') {
        return `<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 uppercase">${priority}</span>`;
    } 
    else {
        return `<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-600 uppercase">${priority}</span>`;
    }
};

// Label Badge Style
const getLabelBadge = (label) => {
    const l = label.toLowerCase();

    if (l === 'bug') {
        return `<span class="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold uppercase"><i class="fa-solid fa-bug"></i> ${label}</span>`;
    } 
    else if (l === 'help wanted') {
        return `<span class="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold uppercase"><i class="fa-solid fa-life-ring"></i> ${label}</span>`;
    } 
    else {
        return `<span class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase"><i class="fi fi-tr-sparkles"></i> ${label}</span>`;
    }
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

        // Labels Loop
        let labelsHTML = '';
        issue.labels.forEach(label => {
            labelsHTML += getLabelBadge(label);
        });

        const card = document.createElement('div');
        card.className = `bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between ${cardClass}`;
        card.onclick = () => showIssueDetails(issue.id);

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <img src="${statusIcon}" class="w-5" alt="status">
                    ${getPriorityBadge(issue.priority)}
                </div>

                <h3 class="font-bold text-sm text-gray-800 mb-1 line-clamp-1">${issue.title}</h3>

                <p class="text-xs text-gray-500 mb-3 line-clamp-2">${issue.description}</p>

                <div class="flex gap-2 flex-wrap mb-4">
                    ${labelsHTML}
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


// Show Detailed Modal 
const showIssueDetails = async (id) => {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;

    // label badges
    let labelsHTML = "";
    issue.labels.forEach(label => {
        labelsHTML += getLabelBadge(label);
    });

    // priority badge
    const priorityBadge = getPriorityBadge(issue.priority);

    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `

        <div class="space-y-4">

            <!-- Title -->
            <h2 class="text-2xl font-bold text-gray-800">
                ${issue.title}
            </h2>

            <!-- Status Row -->
            <div class="flex items-center gap-2 text-sm text-gray-500">

                <span class="bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                    Opened
                </span>

                <span>•</span>

                <span>Opened by ${issue.author}</span>

                <span>•</span>

                <span>${new Date(issue.createdAt).toLocaleDateString()}</span>

            </div>


            <!-- Labels -->
            <div class="flex gap-2 flex-wrap">
                ${labelsHTML}
            </div>


            <!-- Description -->
            <p class="text-gray-600 text-sm leading-relaxed">
                ${issue.description}
            </p>


            <!-- Bottom Info Box -->
            <div class="bg-gray-100 rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">

                <div>
                    <p class="text-gray-500">Assignee:</p>
                    <p class="font-semibold text-gray-800">
                        ${issue.assignee ? issue.assignee : "Unassigned"}
                    </p>
                </div>

                <div>
                    <p class="text-gray-500">Priority:</p>
                    ${priorityBadge}
                </div>

            </div>


            <!-- Close Button -->
            <div class="flex justify-end pt-4">
                <button 
                    onclick="issue_modal.close()" 
                    class="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium">
                    Close
                </button>
            </div>

        </div>

    `;

    document.getElementById("issue_modal").showModal();
};

// Loading Spinner
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