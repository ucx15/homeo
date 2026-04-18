/* ==========================================================================
   HOMEOPATHIC HEALING CENTER - JAVASCRIPT
   Vanilla JS for interactivity and animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
});

/* ========== NAVIGATION TOGGLE ========== */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            this.setAttribute('aria-expanded', !isExpanded);

            if (isExpanded) {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '1rem 2rem';
                navLinks.style.gap = '1rem';
                navLinks.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                navLinks.style.zIndex = '999';
            }
        });

        // Close menu when a link is clicked (only on mobile)
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navLinks.style.display = 'none';
                }
            });
        });
    }
}

/* ========== SMOOTH SCROLLING FOR NAVIGATION LINKS ========== */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip tel: links
            if (href.startsWith('tel:')) {
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ========== SCROLL ANIMATIONS ========== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                    if (entry.target.classList.contains('service-card') ||
                        entry.target.classList.contains('clinic-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animation targets
        const animationTargets = document.querySelectorAll(
            '.service-card, .clinic-card'
        );

    animationTargets.forEach(target => {
        target.style.opacity = '0';
        observer.observe(target);
    });
}

/* ========== UTILITY: ACTIVE NAVIGATION LINK ========== */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active link tracking
updateActiveNavLink();

/* ========== BUTTON INTERACTIONS ========== */
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mousedown', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove existing ripple if any
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);
    });
});

/* ========== LAZY LOAD IMAGES (Future Enhancement) ========== */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
}

/* ========== PERFORMANCE: Debounce Function ========== */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ========== RESPONSIVE NAVIGATION FIX ========== */
window.addEventListener('resize', debounce(function() {
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');

    if (window.innerWidth >= 768) {
        if (navLinks) navLinks.style.display = 'flex';
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    } else {
        if (navLinks) navLinks.style.display = 'none';
    }
}, 250));

/* ========== CONSOLE GREETING ========== */
console.log('%cHomeopathic Healing Center', 'font-size: 20px; font-weight: bold; color: #2d6a4f;');
console.log('%cWelcome! For inquiries, call us at 8840313381 or 7268953246', 'font-size: 14px; color: #636e72;');
