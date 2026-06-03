document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // Mobile Drawer Navigation Menu Toggle
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const iconMenu = menuToggle.querySelector('.icon-menu');
    const iconClose = menuToggle.querySelector('.icon-close');
    const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-btn');

    function toggleMenu() {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) {
            mobileDrawer.classList.remove('open');
            iconMenu.style.display = 'block';
            iconClose.style.display = 'none';
        } else {
            mobileDrawer.classList.add('open');
            iconMenu.style.display = 'none';
            iconClose.style.display = 'block';
        }
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close drawer when a link inside is clicked
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Close drawer when clicking outside the navbar area
    document.addEventListener('click', (e) => {
        if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Handle window resizing (close mobile drawer if viewport exceeds mobile breakpoint)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileDrawer.classList.contains('open')) {
            toggleMenu();
        }
    });

    // ==========================================================================
    // Scroll Progress Indicator Bar
    // ==========================================================================
    const scrollProgress = document.getElementById('scroll-progress');

    function updateScrollProgress() {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (totalHeight > 0) {
            const scrolledPercentage = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = scrolledPercentage + '%';
        } else {
            scrollProgress.style.width = '0%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Run once initially

    // ==========================================================================
    // Intersection Observer for Entrance Scroll Animations
    // ==========================================================================
    const animationTargets = document.querySelectorAll('.fade-in-up');
    
    const animationObserverOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px 0px -40px 0px', // trigger slightly before entering viewport
        threshold: 0.1 // 10% element visibility required
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once animated, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, animationObserverOptions);

    animationTargets.forEach(target => {
        animationObserver.observe(target);
    });

    // ==========================================================================
    // Active Link Highlighting on Scroll
    // ==========================================================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function highlightActiveSection() {
        let currentActiveSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset to align with navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const hrefAttr = link.getAttribute('href');
            if (hrefAttr === '#' && currentActiveSectionId === 'hero') {
                link.classList.add('active');
            } else if (hrefAttr === `#${currentActiveSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Run once initially
});
