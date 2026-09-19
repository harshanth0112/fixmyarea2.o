const profileState = {
    fileHandle: null,
    fileName: '',
    usersData: { users: [], admins: [] }
};

function getProfileJsonDataUrl(fileName) {
    return window.location.pathname.includes('/components/') ? `../data/${fileName}` : `data/${fileName}`;
}

async function loadMockProfileUsersJson() {
    const storageKey = 'fixmyarea_users_mock';
    const cached = localStorage.getItem(storageKey);

    if (cached) {
        try {
            const parsed = JSON.parse(cached);
            if (parsed && typeof parsed === 'object' && Array.isArray(parsed.users)) {
                return parsed;
            }
        } catch (error) {
            console.warn('Unable to parse cached mock profile data.', error);
        }
    }

    const response = await fetch(getProfileJsonDataUrl('users.json'), { cache: 'no-store' });
    if (!response.ok) {
        throw new Error('Unable to load the mock users.json file.');
    }

    const data = await response.json();
    if (!data || typeof data !== 'object' || !Array.isArray(data.users)) {
        throw new Error('The mock users.json file is invalid.');
    }

    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
}

async function ensureProfileUsersDataLoaded() {
    if (profileState.fileHandle && profileState.usersData && Array.isArray(profileState.usersData.users)) {
        return profileState.usersData;
    }

    const data = await loadMockProfileUsersJson();
    profileState.usersData = data;
    profileState.fileName = 'data/users.json';
    updateProfileConnectionStatus('Connected to data/users.json as the default mock data source.', true);
    return data;
}

function updateProfileConnectionStatus(message, connected = false) {
    const statusEl = document.getElementById('profile-file-status');
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.toggle('text-emerald-600', connected);
    statusEl.classList.toggle('dark:text-emerald-400', connected);
    statusEl.classList.toggle('text-slate-500', !connected);
    statusEl.classList.toggle('dark:text-slate-400', !connected);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function toDisplayValue(value) {
    if (value === null || value === undefined || value === '') {
        return 'Not provided';
    }
    return value;
}

async function openProfileUsersFile() {
    if (!('showOpenFilePicker' in window)) {
        const unsupported = document.getElementById('profile-unsupported-message');
        if (unsupported) unsupported.classList.remove('hidden');
        updateProfileConnectionStatus('Unsupported browser. Use Chrome or Edge.', false);
        return null;
    }

    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'JSON files',
                accept: { 'application/json': ['.json'] }
            }],
            multiple: false
        });

        const file = await fileHandle.getFile();
        const data = JSON.parse(await file.text());

        if (!data || typeof data !== 'object' || !Array.isArray(data.users)) {
            throw new Error('The selected file is not a valid users.json file.');
        }

        profileState.fileHandle = fileHandle;
        profileState.fileName = file.name;
        profileState.usersData = data;
        updateProfileConnectionStatus(`Connected to ${file.name}.`, true);
        return data;
    } catch (error) {
        if (error && error.name === 'AbortError') {
            updateProfileConnectionStatus('File selection cancelled.', false);
            return null;
        }
        updateProfileConnectionStatus(error.message || 'Unable to open the selected file.', false);
        return null;
    }
}

function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderMissingUserState(message) {
    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer) return;

    profileContainer.innerHTML = `
        <div class="text-center py-8">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500 mb-4">
                <i class="fa-solid fa-circle-exclamation text-2xl"></i>
            </div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">User details could not be found.</h1>
            <p class="text-slate-600 dark:text-slate-300 mb-6">${escapeHtml(message)}</p>
            <a href="login.html" class="inline-flex items-center justify-center rounded-lg bg-teal-500 px-5 py-3 font-semibold text-white hover:bg-teal-600 transition-colors">Go to Login</a>
        </div>
    `;
}

function renderProfileFromUser(user) {
    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer || !user) return;

    const firstLetter = (user.fullName || 'User').trim().charAt(0).toUpperCase() || 'U';
    const creationDate = toDisplayValue(user.createdAt || 'Not available');
    const city = toDisplayValue(user.city);
    const area = toDisplayValue(user.area);
    const phone = toDisplayValue(user.phone);
    const latitude = user.latitude !== null && user.latitude !== undefined ? user.latitude : 'Not provided';
    const longitude = user.longitude !== null && user.longitude !== undefined ? user.longitude : 'Not provided';
    const locationMethod = toDisplayValue(user.locationMethod || 'manual');

    profileContainer.innerHTML = `
        <div class="flex flex-col items-center gap-6 border-b border-slate-200 dark:border-slate-700 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div class="flex items-center gap-4">
                <div class="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500 text-3xl font-bold text-white shadow-md">${escapeHtml(firstLetter)}</div>
                <div>
                    <p class="text-sm uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">Profile</p>
                    <h1 class="text-3xl font-bold text-slate-900 dark:text-white">${escapeHtml(user.fullName || 'User')}</h1>
                    <p class="text-slate-600 dark:text-slate-300">${escapeHtml(user.role || 'user')}</p>
                </div>
            </div>
            <a href="login.html" class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">Back to Login</a>
        </div>

        <div class="mt-8 grid gap-6 sm:grid-cols-2">
            <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-4">
                <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Email</p>
                <p class="mt-2 text-lg font-semibold text-slate-900 dark:text-white">${escapeHtml(user.email || 'Not provided')}</p>
            </div>
            <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-4">
                <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Phone</p>
                <p class="mt-2 text-lg font-semibold text-slate-900 dark:text-white">${escapeHtml(phone)}</p>
            </div>
            <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-4">
                <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">City</p>
                <p class="mt-2 text-lg font-semibold text-slate-900 dark:text-white">${escapeHtml(city)}</p>
            </div>
            <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-4">
                <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Area</p>
                <p class="mt-2 text-lg font-semibold text-slate-900 dark:text-white">${escapeHtml(area)}</p>
            </div>
            <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-4">
                <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Latitude</p>
                <p class="mt-2 text-lg font-semibold text-slate-900 dark:text-white">${escapeHtml(latitude)}</p>
            </div>
            <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-4">
                <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Longitude</p>
                <p class="mt-2 text-lg font-semibold text-slate-900 dark:text-white">${escapeHtml(longitude)}</p>
            </div>
            <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-4">
                <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Location Method</p>
                <p class="mt-2 text-lg font-semibold text-slate-900 dark:text-white">${escapeHtml(locationMethod)}</p>
            </div>
            <div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-4">
                <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Account Created</p>
                <p class="mt-2 text-lg font-semibold text-slate-900 dark:text-white">${escapeHtml(creationDate)}</p>
            </div>
        </div>

    `;
}

async function loadProfileForCurrentId() {
    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer) return;

    const userId = getUserIdFromUrl();
    if (!userId) {
        renderMissingUserState('No user ID was supplied. Please open the profile from the login form.');
        return;
    }

    try {
        if (!profileState.fileHandle && (!profileState.usersData || !Array.isArray(profileState.usersData.users))) {
            await ensureProfileUsersDataLoaded();
        }
    } catch (error) {
        renderMissingUserState(error.message || 'Unable to load the mock users.json data.');
        return;
    }

    const users = Array.isArray(profileState.usersData.users) ? profileState.usersData.users : [];
    const admins = Array.isArray(profileState.usersData.admins) ? profileState.usersData.admins : [];
    const user = users.find((entry) => entry.id === userId) || admins.find((entry) => entry.id === userId);

    if (!user) {
        renderMissingUserState('The current mock data does not contain the requested user ID.');
        return;
    }

    renderProfileFromUser(user);
}

document.addEventListener('DOMContentLoaded', async () => {
    const openFileButton = document.getElementById('select-profile-file-button');
    if (openFileButton) {
        openFileButton.addEventListener('click', async () => {
            const result = await openProfileUsersFile();
            if (result) {
                await loadProfileForCurrentId();
            }
        });
    }

    const userId = getUserIdFromUrl();
    if (!userId) {
        renderMissingUserState('No user ID was supplied. Please open the profile from the login form.');
        return;
    }

    try {
        await ensureProfileUsersDataLoaded();
        await loadProfileForCurrentId();
    } catch (error) {
        renderMissingUserState(error.message || 'Please select users.json to load this profile.');
    }
});
