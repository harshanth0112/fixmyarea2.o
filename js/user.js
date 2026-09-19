async function loadUserData() {
    const response = await fetch('../data/users.json');
    if (!response.ok) {
        throw new Error('Unable to load local user data.');
    }
    return await response.json();
}

function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', async () => {
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userAvatar = document.getElementById('user-avatar');
    const logoutButton = document.getElementById('logout-button');

    const userId = getUserIdFromUrl();
    if (!userId) {
        window.location.href = '../login.html';
        return;
    }

    try {
        const data = await loadUserData();
        const users = [...(data.users || [])];
        const admins = [...(data.admins || [])];
        const user = users.find((entry) => entry.id === userId) || admins.find((entry) => entry.id === userId);

        if (!user) {
            window.location.href = '../login.html';
            return;
        }

        if (userName) {
            userName.textContent = user.fullName || 'User';
        }

        if (userEmail) {
            userEmail.textContent = user.email || 'Not available';
        }

        if (userAvatar) {
            userAvatar.textContent = (user.fullName || 'User').charAt(0).toUpperCase();
        }
    } catch (error) {
        if (userName) userName.textContent = 'User';
        if (userEmail) userEmail.textContent = 'Unable to load profile';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            window.location.href = '../login.html';
        });
    }
});
