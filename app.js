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



