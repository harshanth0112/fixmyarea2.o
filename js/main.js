/**
 * FixMyArea - Main JavaScript for Common Layout
 * Handles mobile menu toggle, active navigation highlighting, footer year, and theme toggling.
 */

function getCurrentUserIdFromUrl() {
    const url = new URL(window.location.href);
    return url.searchParams.get('id');
}

function getLoggedInUserId() {
    const urlUserId = getCurrentUserIdFromUrl();
    if (urlUserId) {
        return urlUserId;
    }

    try {
        return localStorage.getItem('fixmyarea_loggedin_user_id') || '';
    } catch (error) {
        return '';
    }
}

function getLoggedInUserName() {
    try {
        return localStorage.getItem('fixmyarea_loggedin_user_name') || 'User';
    } catch (error) {
        return 'User';
    }
}

function getLoggedInUserRole() {
    try {
        return localStorage.getItem('fixmyarea_loggedin_user_role') || 'user';
    } catch (error) {
        return 'user';
    }
}

function setLoggedInUserId(userId) {
    if (!userId) {
        try {
            localStorage.removeItem('fixmyarea_loggedin_user_id');
        } catch (error) {
            // Ignore storage errors in restricted environments.
        }
        return;
    }

    try {
        localStorage.setItem('fixmyarea_loggedin_user_id', userId);
    } catch (error) {
        // Ignore storage errors in restricted environments.
    }
}

function getProjectPagePath(fileName) {
    const isInsideComponents = window.location.pathname.includes('/components/');
    if (isInsideComponents) {
        return fileName;
    }

    if (fileName === 'index.html') {
        return fileName;
    }

    return `components/${fileName}`;
}

function getUserPagePath() {
    const userId = getLoggedInUserId();
    const path = getProjectPagePath('profile.html');
    if (userId) {
        return `${path}?id=${encodeURIComponent(userId)}`;
    }
    return path;
}

function updateAuthNavigation() {
    const authControl = document.getElementById('auth-control');
    const mobileAuthControl = document.getElementById('mobile-auth-control');
    const loginButton = document.getElementById('login-button');
    const mobileLoginButton = document.getElementById('mobile-login-button');
    const userId = getLoggedInUserId();
    const isLoggedIn = Boolean(userId);
    const displayName = getLoggedInUserName();
    const badgeLabel = displayName || 'User';

    if (loginButton) {
        loginButton.classList.toggle('hidden', isLoggedIn);
    }

    if (mobileLoginButton) {
        mobileLoginButton.classList.toggle('hidden', isLoggedIn);
    }

    const badgeTemplate = '<a id="logged-user-badge" href="' + getUserPagePath() + '" aria-label="User profile" class="inline-flex items-center gap-2 h-10 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300 hover:bg-teal-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"><span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-500 text-white text-xs font-bold">' + (displayName.charAt(0) || 'U').toUpperCase() + '</span><span class="hidden sm:inline text-sm font-semibold">' + badgeLabel + '</span></a>';

    const desktopBadge = document.getElementById('logged-user-badge');
    if (isLoggedIn) {
        if (!desktopBadge && authControl) {
            authControl.insertAdjacentHTML('beforeend', badgeTemplate);
        }
    } else if (desktopBadge) {
        desktopBadge.remove();
    }

    const mobileBadge = document.getElementById('logged-user-badge-mobile');
    if (isLoggedIn) {
        if (!mobileBadge && mobileAuthControl) {
            const badge = document.createElement('a');
            badge.id = 'logged-user-badge-mobile';
            badge.href = getUserPagePath();
            badge.setAttribute('aria-label', 'User profile');
            badge.className = 'inline-flex items-center gap-2 h-10 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300 hover:bg-teal-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500';
            badge.innerHTML = '<span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-500 text-white text-xs font-bold">' + (displayName.charAt(0) || 'U').toUpperCase() + '</span><span class="hidden sm:inline text-sm font-semibold">' + badgeLabel + '</span>';
            mobileAuthControl.appendChild(badge);
        }
    } else if (mobileBadge) {
        mobileBadge.remove();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateAuthNavigation();

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mobileMenu && menuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));

            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const highlightActiveLink = () => {
        let currentPath = window.location.pathname.split('/').pop();

        if (currentPath === '') {
            currentPath = 'index.html';
        }

        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach((link) => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPath || (linkHref === '../index.html' && currentPath === 'index.html')) {
                link.classList.remove('text-slate-600', 'dark:text-slate-300');
                link.classList.add('text-teal-600', 'dark:text-teal-400', 'font-bold');
            }
        });
    };

    highlightActiveLink();

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-inline');
    const mobileThemeToggleIcon = document.getElementById('mobile-theme-toggle-icon-inline');

    const applyTheme = (isDarkMode) => {
        document.documentElement.classList.toggle('dark', isDarkMode);

        if (themeToggleIcon) {
            const iconClass = isDarkMode ? 'fa-sun' : 'fa-moon';
            themeToggleIcon.classList.remove('fa-sun', 'fa-moon');
            themeToggleIcon.classList.add(iconClass);
        }

        if (mobileThemeToggleIcon) {
            const iconClass = isDarkMode ? 'fa-sun' : 'fa-moon';
            mobileThemeToggleIcon.classList.remove('fa-sun', 'fa-moon');
            mobileThemeToggleIcon.classList.add(iconClass);
        }
    };

    applyTheme(document.documentElement.classList.contains('dark'));

    const toggleTheme = () => {
        const newDarkMode = !document.documentElement.classList.contains('dark');
        applyTheme(newDarkMode);
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }
});
