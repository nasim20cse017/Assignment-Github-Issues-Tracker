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

