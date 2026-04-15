document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // --- Theme Management ---
    const currentTheme = localStorage.getItem('mgirlysd-theme') || 'light';
    
    // Apply theme on load
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        updateThemeIcon('sun');
    } else {
        body.removeAttribute('data-theme');
        updateThemeIcon('moon');
    }

    themeToggle.addEventListener('click', () => {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            localStorage.setItem('mgirlysd-theme', 'light');
            updateThemeIcon('moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('mgirlysd-theme', 'dark');
            updateThemeIcon('sun');
        }
    });

    function updateThemeIcon(iconName) {
        // Since we are using Lucide, we need to replace the icon manually or re-run lucide.createIcons
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', iconName);
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }
    }

    // --- Mobile Menu Management ---
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        sidebar.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (sidebar.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'visible';
        }
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            sidebar.classList.remove('active');
            body.style.overflow = 'visible';
        });
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            menuBtn.classList.remove('active');
            sidebar.classList.remove('active');
            body.style.overflow = 'visible';
        }
    });
});
