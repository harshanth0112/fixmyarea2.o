const CITY_AREAS = {
    Chennai: ['Sholinganallur', 'Tambaram', 'Anna Nagar'],
    Trichy: ['Srirangam', 'Cantonment', 'Thillai Nagar'],
    Coimbatore: ['Gandhipuram', 'RS Puram', 'Peelamedu'],
    Madurai: ['KK Nagar', 'Anna Nagar', 'Mattuthavani']
};

const state = {
    fileHandle: null,
    fileName: '',
    usersData: { users: [], admins: [] },
    registrationDraft: { latitude: null, longitude: null, locationMethod: 'manual' }
};

function getJsonDataUrl(fileName) {
    const isInsideComponents = window.location.pathname.includes('/components/');
    return isInsideComponents ? `../data/${fileName}` : `data/${fileName}`;
}

function getRootProfileUrl(userId) {
    const profilePath = window.location.pathname.includes('/components/') ? 'profile.html' : 'components/profile.html';
    if (userId) {
        return `${profilePath}?id=${encodeURIComponent(userId)}`;
    }
    return profilePath;
}

async function loadMockUsersJson() {
    const storageKey = 'fixmyarea_users_mock';
    const localValue = localStorage.getItem(storageKey);

    if (localValue) {
        try {
            const parsed = JSON.parse(localValue);
            if (parsed && typeof parsed === 'object' && Array.isArray(parsed.users)) {
                return parsed;
            }
        } catch (error) {
            console.warn('Unable to read cached mock users data.', error);
        }
    }

    const response = await fetch(getJsonDataUrl('users.json'), { cache: 'no-store' });
    if (!response.ok) {
        throw new Error('Unable to load the mock users data.');
    }

    const data = await response.json();
    if (!data || typeof data !== 'object' || !Array.isArray(data.users)) {
        throw new Error('The mock users.json file is invalid.');
    }

    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
}

async function ensureUsersDataLoaded() {
    if (state.fileHandle && state.usersData && Array.isArray(state.usersData.users)) {
        return state.usersData;
    }

    const mockData = await loadMockUsersJson();
    state.usersData = mockData;
    state.fileName = 'data/users.json';
    updateFileConnectionStatus('Connected to data/users.json as the default mock data source.', true);
    return mockData;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFieldError(input, errorElement, message) {
    if (input) {
        input.classList.remove('border-slate-200', 'dark:border-slate-700');
        input.classList.add('border-red-500');
    }
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

function clearFieldError(input, errorElement) {
    if (input) {
        input.classList.remove('border-red-500');
        input.classList.add('border-slate-200', 'dark:border-slate-700');
    }
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}

function setStatusMessage(element, message, type = 'error') {
    if (!element) return;
    element.textContent = message;
    element.classList.remove('hidden', 'border-red-500/40', 'bg-red-500/10', 'text-red-500', 'border-green-500/40', 'bg-green-500/10', 'text-green-600');
    if (type === 'success') {
        element.classList.add('border-green-500/40', 'bg-green-500/10', 'text-green-600');
    } else {
        element.classList.add('border-red-500/40', 'bg-red-500/10', 'text-red-500');
    }
}

function hideStatusMessage(element) {
    if (element) {
        element.textContent = '';
        element.classList.add('hidden');
    }
}

function setActiveAuthTab(targetId) {
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach((tab) => {
        const isActive = tab.getAttribute('data-target') === targetId;
        tab.classList.toggle('text-teal-600', isActive);
        tab.classList.toggle('dark:text-teal-400', isActive);
        tab.classList.toggle('border-b-2', isActive);
        tab.classList.toggle('border-teal-500', isActive);
        tab.classList.toggle('pb-3', isActive);
        tab.classList.toggle('text-slate-600', !isActive);
        tab.classList.toggle('dark:text-slate-300', !isActive);
        tab.setAttribute('aria-selected', String(isActive));
    });
}

function showLoginForm() {
    const views = document.querySelectorAll('.auth-view');
    views.forEach((view) => view.classList.add('hidden'));
    const loginView = document.getElementById('login-view');
    if (loginView) loginView.classList.remove('hidden');
    setActiveAuthTab('login-view');
}

function showRegisterForm() {
    const views = document.querySelectorAll('.auth-view');
    views.forEach((view) => view.classList.add('hidden'));
    const registerView = document.getElementById('register-view');
    if (registerView) registerView.classList.remove('hidden');
    setActiveAuthTab('register-view');
}

function showAdminForm() {
    const views = document.querySelectorAll('.auth-view');
    views.forEach((view) => view.classList.add('hidden'));
    const adminView = document.getElementById('admin-view');
    if (adminView) adminView.classList.remove('hidden');
    setActiveAuthTab('admin-view');
}

function updateFileConnectionStatus(message, connected = false) {
    const statusEl = document.getElementById('file-status');
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.toggle('text-emerald-600', connected);
    statusEl.classList.toggle('dark:text-emerald-400', connected);
    statusEl.classList.toggle('text-slate-500', !connected);
    statusEl.classList.toggle('dark:text-slate-400', !connected);
}

function updateRegisterAvailability() {
    const submitButton = document.getElementById('register-submit-button');
    const formFields = document.querySelectorAll('#register-form input, #register-form select');
    const isEnabled = Boolean(state.fileHandle);

    if (submitButton) {
        submitButton.disabled = !isEnabled;
    }

    formFields.forEach((field) => {
        field.disabled = !isEnabled;
    });

    const locationButton = document.getElementById('get-location-button');
    if (locationButton) {
        locationButton.disabled = !isEnabled;
        locationButton.classList.toggle('opacity-50', !isEnabled);
        locationButton.classList.toggle('cursor-not-allowed', !isEnabled);
    }
}

async function openUsersJsonFile() {
    if (!('showOpenFilePicker' in window)) {
        const unsupported = document.getElementById('unsupported-browser-message');
        if (unsupported) {
            unsupported.classList.remove('hidden');
        }
        updateFileConnectionStatus('Unsupported browser. Use Chrome or Edge with File System Access API.', false);
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
        const raw = await file.text();
        const data = JSON.parse(raw);

        if (!data || typeof data !== 'object' || !Array.isArray(data.users)) {
            throw new Error('The selected file is not a valid users.json file.');
        }

        state.fileHandle = fileHandle;
        state.fileName = file.name;
        state.usersData = data;
        updateFileConnectionStatus(`Connected to ${file.name}. Existing users preserved.`, true);
        updateRegisterAvailability();
        return data;
    } catch (error) {
        updateFileConnectionStatus(error.message || 'Unable to open the selected file.', false);
        return null;
    }
}

async function saveUsersJson(data) {
    if (!state.fileHandle) {
        throw new Error('Please select users.json before saving the new user.');
    }

    try {
        const writable = await state.fileHandle.createWritable();
        await writable.write(JSON.stringify(data, null, 2));
        await writable.close();
        state.usersData = data;
        updateFileConnectionStatus(`Saved successfully to ${state.fileName}.`, true);
        return true;
    } catch (error) {
        if (error && error.name === 'NotAllowedError') {
            throw new Error('Write permission was denied. Please reselect users.json and try again.');
        }
        throw new Error('Could not save the updated file. Please try again.');
    }
}

function populateCityOptions() {
    const citySelect = document.getElementById('register-city');
    if (!citySelect) return;

    const cities = Object.keys(CITY_AREAS);
    citySelect.innerHTML = '<option value="">Select city</option>' + cities.map((city) => `<option value="${city}">${city}</option>`).join('');
}

function updateAreaOptions() {
    const citySelect = document.getElementById('register-city');
    const areaSelect = document.getElementById('register-area');
    if (!citySelect || !areaSelect) return;

    const city = citySelect.value;
    const areas = CITY_AREAS[city] || [];
    areaSelect.innerHTML = '<option value="">Select area</option>' + areas.map((area) => `<option value="${area}">${area}</option>`).join('');
}

function generateUserId(users) {
    let highest = 0;

    users.forEach((user) => {
        const match = /^USR(\d+)$/i.exec(String(user.id || ''));
        if (match) {
            const numericId = Number(match[1]);
            if (numericId > highest) {
                highest = numericId;
            }
        }
    });

    return `USR${String(highest + 1).padStart(3, '0')}`;
}

function validateUserLoginForm() {
    const emailInput = document.getElementById('user-email');
    const passwordInput = document.getElementById('user-password');
    const emailError = document.getElementById('user-email-error');
    const passwordError = document.getElementById('user-password-error');
    const loginStatus = document.getElementById('login-status');

    let isValid = true;
    const email = (emailInput.value || '').trim();
    const password = passwordInput.value || '';

    if (!email || !isValidEmail(email)) {
        setFieldError(emailInput, emailError, 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearFieldError(emailInput, emailError);
    }

    if (!password) {
        setFieldError(passwordInput, passwordError, 'Please enter your password.');
        isValid = false;
    } else {
        clearFieldError(passwordInput, passwordError);
    }

    hideStatusMessage(loginStatus);
    return isValid;
}

async function handleUserLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const loginStatus = document.getElementById('login-status');

    if (!state.fileHandle) {
        try {
            await ensureUsersDataLoaded();
        } catch (error) {
            setStatusMessage(loginStatus, error.message || 'Unable to load the mock users data.', 'error');
            return;
        }
    }

    if (!validateUserLoginForm()) {
        return;
    }

    const email = document.getElementById('user-email').value.trim().toLowerCase();
    const password = document.getElementById('user-password').value;

    try {
        const users = Array.isArray(state.usersData.users) ? state.usersData.users : [];
        const user = users.find((entry) => entry.email.toLowerCase() === email && entry.password === password);

        if (!user) {
            setStatusMessage(loginStatus, 'Invalid email or password. Please try again.', 'error');
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Login successful';
        }

        localStorage.setItem('fixmyarea_loggedin_user_id', user.id);
        localStorage.setItem('fixmyarea_loggedin_user_name', user.fullName || user.name || user.email || 'User');
        localStorage.setItem('fixmyarea_loggedin_user_role', user.role || 'user');
        setStatusMessage(loginStatus, 'User login successful. Redirecting to your profile...', 'success');
        setTimeout(() => {
            window.location.href = getRootProfileUrl(user.id);
        }, 600);
    } catch (error) {
        setStatusMessage(loginStatus, error.message || 'Unable to read the selected users.json file.', 'error');
    }
}

function validateRegistrationForm() {
    const fullNameInput = document.getElementById('register-full-name');
    const emailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const cityInput = document.getElementById('register-city');
    const areaInput = document.getElementById('register-area');
    const fullNameError = document.getElementById('register-full-name-error');
    const emailError = document.getElementById('register-email-error');
    const passwordError = document.getElementById('register-password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const cityError = document.getElementById('register-city-error');
    const areaError = document.getElementById('register-area-error');
    const status = document.getElementById('register-status');

    let isValid = true;
    const fullName = (fullNameInput.value || '').trim();
    const email = (emailInput.value || '').trim();
    const password = passwordInput.value || '';
    const confirmPassword = confirmPasswordInput.value || '';
    const city = cityInput.value || '';
    const area = areaInput.value || '';

    if (!fullName) {
        setFieldError(fullNameInput, fullNameError, 'Full name is required.');
        isValid = false;
    } else {
        clearFieldError(fullNameInput, fullNameError);
    }

    if (!email || !isValidEmail(email)) {
        setFieldError(emailInput, emailError, 'Enter a valid email address.');
        isValid = false;
    } else {
        clearFieldError(emailInput, emailError);
    }

    if (password.length < 8) {
        setFieldError(passwordInput, passwordError, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        clearFieldError(passwordInput, passwordError);
    }

    if (!confirmPassword || confirmPassword !== password) {
        setFieldError(confirmPasswordInput, confirmPasswordError, 'Passwords must match.');
        isValid = false;
    } else {
        clearFieldError(confirmPasswordInput, confirmPasswordError);
    }

    if (!city) {
        setFieldError(cityInput, cityError, 'Please select a city.');
        isValid = false;
    } else {
        clearFieldError(cityInput, cityError);
    }

    if (!area) {
        setFieldError(areaInput, areaError, 'Please select an area.');
        isValid = false;
    } else {
        clearFieldError(areaInput, areaError);
    }

    hideStatusMessage(status);
    return isValid;
}

async function handleUserRegistration(event) {
    event.preventDefault();
    const status = document.getElementById('register-status');
    const preview = document.getElementById('register-preview');

    if (!state.fileHandle) {
        try {
            await ensureUsersDataLoaded();
        } catch (error) {
            setStatusMessage(status, error.message || 'Unable to load the mock users data.', 'error');
            return;
        }
    }

    if (!validateRegistrationForm()) {
        return;
    }

    const fullName = document.getElementById('register-full-name').value.trim();
    const email = document.getElementById('register-email').value.trim().toLowerCase();
    const phone = document.getElementById('register-phone').value.trim();
    const city = document.getElementById('register-city').value;
    const area = document.getElementById('register-area').value;
    const password = document.getElementById('register-password').value;

    try {
        const users = Array.isArray(state.usersData.users) ? state.usersData.users : [];
        const admins = Array.isArray(state.usersData.admins) ? state.usersData.admins : [];
        const duplicateEmails = [
            ...users.map((person) => String(person.email || '').toLowerCase()),
            ...admins.map((person) => String(person.email || '').toLowerCase())
        ];

        if (duplicateEmails.includes(email)) {
            const emailInput = document.getElementById('register-email');
            const emailError = document.getElementById('register-email-error');
            setFieldError(emailInput, emailError, 'This email already exists in the selected file.');
            return;
        }

        const latitude = state.registrationDraft.latitude ?? null;
        const longitude = state.registrationDraft.longitude ?? null;
        const locationMethod = latitude !== null && longitude !== null ? 'gps' : 'manual';
        const newUser = {
            id: generateUserId(users),
            fullName,
            email,
            password,
            phone,
            city,
            area,
            latitude,
            longitude,
            locationMethod,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        const updatedData = {
            ...state.usersData,
            users: [...users, newUser]
        };

        if (state.fileHandle) {
            await saveUsersJson(updatedData);
        } else {
            localStorage.setItem('fixmyarea_users_mock', JSON.stringify(updatedData));
            state.usersData = updatedData;
            state.fileName = 'data/users.json';
            updateFileConnectionStatus('Saved locally using the mock users.json data.', true);
        }

        if (preview) {
            preview.classList.remove('hidden');
            preview.innerHTML = `
                <p class="mb-2 font-semibold text-teal-700 dark:text-teal-300">User saved successfully.</p>
                <p class="mb-3 text-slate-700 dark:text-slate-200">The new account was written to the mock users.json dataset for this browser demo.</p>
                <ul class="space-y-1 text-slate-700 dark:text-slate-200">
                    <li><strong>ID:</strong> ${newUser.id}</li>
                    <li><strong>Name:</strong> ${newUser.fullName}</li>
                    <li><strong>Email:</strong> ${newUser.email}</li>
                    <li><strong>City:</strong> ${newUser.city}</li>
                    <li><strong>Area:</strong> ${newUser.area}</li>
                </ul>
            `;
        }

        setStatusMessage(status, `Registration saved successfully to ${state.fileName}. You can now log in with the new account.`, 'success');

        const form = document.getElementById('register-form') || event.currentTarget;
        if (form && typeof form.reset === 'function') {
            form.reset();
        }

        state.registrationDraft = { latitude: null, longitude: null, locationMethod: 'manual' };
        const citySelect = document.getElementById('register-city');
        const areaSelect = document.getElementById('register-area');
        if (citySelect) citySelect.value = '';
        if (areaSelect) areaSelect.innerHTML = '<option value="">Select area</option>';

        const locationStatus = document.getElementById('location-status');
        if (locationStatus) {
            locationStatus.classList.add('hidden');
            locationStatus.textContent = '';
        }
    } catch (error) {
        setStatusMessage(status, error.message || 'Unable to save the new user.', 'error');
    }
}

function validateAdminLoginForm() {
    const emailInput = document.getElementById('admin-email');
    const passwordInput = document.getElementById('admin-password');
    const emailError = document.getElementById('admin-email-error');
    const passwordError = document.getElementById('admin-password-error');
    const status = document.getElementById('admin-status');

    let isValid = true;
    const email = (emailInput.value || '').trim();
    const password = passwordInput.value || '';

    if (!email || !isValidEmail(email)) {
        setFieldError(emailInput, emailError, 'Please enter a valid admin email address.');
        isValid = false;
    } else {
        clearFieldError(emailInput, emailError);
    }

    if (!password) {
        setFieldError(passwordInput, passwordError, 'Please enter the admin password.');
        isValid = false;
    } else {
        clearFieldError(passwordInput, passwordError);
    }

    hideStatusMessage(status);
    return isValid;
}

async function handleAdminLogin(event) {
    event.preventDefault();
    const status = document.getElementById('admin-status');

    if (!state.fileHandle) {
        try {
            await ensureUsersDataLoaded();
        } catch (error) {
            setStatusMessage(status, error.message || 'Unable to load the mock users data.', 'error');
            return;
        }
    }

    if (!validateAdminLoginForm()) {
        return;
    }

    const email = document.getElementById('admin-email').value.trim().toLowerCase();
    const password = document.getElementById('admin-password').value;

    try {
        const admins = Array.isArray(state.usersData.admins) ? state.usersData.admins : [];
        const admin = admins.find((entry) => entry.email.toLowerCase() === email && entry.password === password);

        if (!admin) {
            setStatusMessage(status, 'Invalid admin credentials. Please try again.', 'error');
            return;
        }

        localStorage.setItem('fixmyarea_loggedin_user_id', admin.id);
        localStorage.setItem('fixmyarea_loggedin_user_name', admin.fullName || admin.name || admin.email || 'Admin');
        localStorage.setItem('fixmyarea_loggedin_user_role', admin.role || 'admin');

        setStatusMessage(status, 'Demo admin login successful. Redirecting to admin dashboard...', 'success');
        setTimeout(() => {
            window.location.href = `admin.html?id=${encodeURIComponent(admin.id)}`;
        }, 600);
    } catch (error) {
        setStatusMessage(status, error.message || 'Unable to read the selected users.json file.', 'error');
    }
}

function handleGetLocation() {
    const locationStatus = document.getElementById('location-status');
    if (!navigator.geolocation) {
        if (locationStatus) {
            locationStatus.textContent = 'Geolocation is not supported by this browser. You can still choose your city and area manually.';
            locationStatus.classList.remove('hidden');
            locationStatus.classList.add('text-red-500');
        }
        return;
    }

    if (locationStatus) {
        locationStatus.textContent = 'Requesting location permission...';
        locationStatus.classList.remove('hidden');
        locationStatus.classList.remove('text-red-500');
        locationStatus.classList.add('text-slate-600', 'dark:text-slate-300');
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            state.registrationDraft = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                locationMethod: 'gps'
            };

            if (locationStatus) {
                locationStatus.textContent = `Location captured: ${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}.`;
                locationStatus.classList.remove('hidden', 'text-red-500');
                locationStatus.classList.add('text-green-600');
            }
        },
        () => {
            state.registrationDraft = { latitude: null, longitude: null, locationMethod: 'manual' };
            if (locationStatus) {
                locationStatus.textContent = 'Location permission was denied. You can still complete registration by choosing a city and area manually.';
                locationStatus.classList.remove('hidden');
                locationStatus.classList.add('text-red-500');
            }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

document.addEventListener('DOMContentLoaded', async () => {
    const userLoginForm = document.getElementById('user-login-form');
    const registerForm = document.getElementById('register-form');
    const adminLoginForm = document.getElementById('admin-login-form');
    const citySelect = document.getElementById('register-city');
    const locationButton = document.getElementById('get-location-button');
    const selectUsersFileButton = document.getElementById('select-users-file-button');

    try {
        await ensureUsersDataLoaded();
    } catch (error) {
        updateFileConnectionStatus(error.message || 'Could not load the mock user data.', false);
    }

    populateCityOptions();
    updateRegisterAvailability();

    if (selectUsersFileButton) {
        selectUsersFileButton.addEventListener('click', openUsersJsonFile);
    }

    if (citySelect) {
        citySelect.addEventListener('change', updateAreaOptions);
    }

    if (locationButton) {
        locationButton.addEventListener('click', handleGetLocation);
    }

    if (userLoginForm) {
        userLoginForm.addEventListener('submit', handleUserLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleUserRegistration);
    }

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }

    document.querySelectorAll('.auth-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            if (target === 'register-view') {
                showRegisterForm();
            } else if (target === 'admin-view') {
                showAdminForm();
            } else {
                showLoginForm();
            }
        });
    });

    document.getElementById('user-email')?.addEventListener('input', () => {
        const emailInput = document.getElementById('user-email');
        const emailError = document.getElementById('user-email-error');
        hideStatusMessage(document.getElementById('login-status'));
        if (emailInput.value.trim() && isValidEmail(emailInput.value.trim())) {
            clearFieldError(emailInput, emailError);
        }
    });

    document.getElementById('user-password')?.addEventListener('input', () => {
        const passwordInput = document.getElementById('user-password');
        const passwordError = document.getElementById('user-password-error');
        hideStatusMessage(document.getElementById('login-status'));
        if (passwordInput.value) {
            clearFieldError(passwordInput, passwordError);
        }
    });

    document.getElementById('register-full-name')?.addEventListener('input', () => {
        const field = document.getElementById('register-full-name');
        const error = document.getElementById('register-full-name-error');
        if (field.value.trim()) {
            clearFieldError(field, error);
        }
    });

    document.getElementById('register-email')?.addEventListener('input', () => {
        const field = document.getElementById('register-email');
        const error = document.getElementById('register-email-error');
        hideStatusMessage(document.getElementById('register-status'));
        if (field.value.trim() && isValidEmail(field.value.trim())) {
            clearFieldError(field, error);
        }
    });

    document.getElementById('register-password')?.addEventListener('input', () => {
        const field = document.getElementById('register-password');
        const error = document.getElementById('register-password-error');
        hideStatusMessage(document.getElementById('register-status'));
        if (field.value.length >= 8) {
            clearFieldError(field, error);
        }
    });

    document.getElementById('confirm-password')?.addEventListener('input', () => {
        const field = document.getElementById('confirm-password');
        const error = document.getElementById('confirm-password-error');
        hideStatusMessage(document.getElementById('register-status'));
        if (field.value && field.value === document.getElementById('register-password').value) {
            clearFieldError(field, error);
        }
    });

    document.getElementById('admin-email')?.addEventListener('input', () => {
        const field = document.getElementById('admin-email');
        const error = document.getElementById('admin-email-error');
        hideStatusMessage(document.getElementById('admin-status'));
        if (field.value.trim() && isValidEmail(field.value.trim())) {
            clearFieldError(field, error);
        }
    });

    document.getElementById('admin-password')?.addEventListener('input', () => {
        const field = document.getElementById('admin-password');
        const error = document.getElementById('admin-password-error');
        hideStatusMessage(document.getElementById('admin-status'));
        if (field.value) {
            clearFieldError(field, error);
        }
    });

    showLoginForm();
});