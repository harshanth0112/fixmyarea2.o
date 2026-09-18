/**
 * FixMyArea - Main JavaScript for Common Layout
 * Handles mobile menu toggle, active navigation highlighting, footer year, and theme toggling.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mobileMenu && menuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // Toggle accessibility attribute
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle icon (bars <-> xmark)
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });

        // Close mobile menu when clicking a link inside it
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // 2. Auto-update footer year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 3. Highlight current page in navigation
    const highlightActiveLink = () => {
        // Get current filename from URL
        let currentPath = window.location.pathname.split('/').pop();
        
        // Default to index.html if empty (e.g., at root or /components/)
        if (currentPath === '') {
            currentPath = 'index.html';
        }

        // Find all links with class 'nav-link'
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPath) {
                // Apply active styling
                // Remove base color classes
                link.classList.remove('text-slate-600', 'dark:text-slate-300');
                // Add active color classes
                link.classList.add('text-teal-600', 'dark:text-teal-400', 'font-bold');
            }
        });
    };

    highlightActiveLink();

    // 4. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-inline');
    const mobileThemeToggleIcon = document.getElementById('mobile-theme-toggle-icon-inline');

    // Check localStorage for saved theme, default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply initial theme
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
        if (themeToggleIcon) themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
        if (mobileThemeToggleIcon) mobileThemeToggleIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggleIcon) themeToggleIcon.classList.replace('fa-sun', 'fa-moon');
        if (mobileThemeToggleIcon) mobileThemeToggleIcon.classList.replace('fa-sun', 'fa-moon');
    }

    // Toggle function
    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            // Switch to Light Mode
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            if (themeToggleIcon) themeToggleIcon.classList.replace('fa-sun', 'fa-moon');
            if (mobileThemeToggleIcon) mobileThemeToggleIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            // Switch to Dark Mode
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            if (themeToggleIcon) themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
            if (mobileThemeToggleIcon) mobileThemeToggleIcon.classList.replace('fa-moon', 'fa-sun');
        }
    };

    // Attach event listeners
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }
});
