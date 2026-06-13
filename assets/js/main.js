tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "inverse-surface": "#263143",
                "primary-container": "#5b2c83",
                "on-primary-container": "#cf9bfa",
                "surface-dim": "#cfdaf2",
                "surface-container-high": "#dee8ff",
                "on-secondary-fixed": "#002109",
                "outline-variant": "#cec3d1",
                "surface-bright": "#f9f9ff",
                "inverse-on-surface": "#ecf1ff",
                "primary-fixed": "#f1daff",
                "surface": "#f9f9ff",
                "on-surface": "#111c2d",
                "surface-container-highest": "#d8e3fb",
                "primary-fixed-dim": "#dfb7ff",
                "secondary-fixed": "#7ffc97",
                "on-error-container": "#93000a",
                "background": "#f9f9ff",
                "tertiary-fixed": "#ffddb8",
                "primary": "#43106b",
                "inverse-primary": "#dfb7ff",
                "surface-container-low": "#f0f3ff",
                "on-secondary-container": "#007230",
                "on-primary-fixed": "#2d004f",
                "on-background": "#111c2d",
                "secondary-container": "#7cf994",
                "on-primary-fixed-variant": "#5f3087",
                "on-secondary-fixed-variant": "#005320",
                "on-tertiary": "#ffffff",
                "error": "#ba1a1a",
                "on-tertiary-fixed": "#2a1700",
                "surface-container-lowest": "#ffffff",
                "on-tertiary-container": "#f49d0a",
                "surface-variant": "#d8e3fb",
                "secondary": "#006e2d",
                "surface-container": "#e7eeff",
                "on-primary": "#ffffff",
                "error-container": "#ffdad6",
                "on-tertiary-fixed-variant": "#653e00",
                "on-error": "#ffffff",
                "on-secondary": "#ffffff",
                "tertiary-container": "#613b00",
                "surface-tint": "#7849a0",
                "outline": "#7d7481",
                "secondary-fixed-dim": "#62df7d",
                "tertiary-fixed-dim": "#ffb95f",
                "on-surface-variant": "#4c4450",
                "tertiary": "#422700"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "unit": "8px",
                "stack-md": "24px",
                "container-max": "1280px",
                "section-padding": "80px",
                "margin-desktop": "40px",
                "gutter": "24px",
                "margin-mobile": "16px",
                "stack-sm": "12px",
                "stack-lg": "48px"
            },
            "fontFamily": {
                "headline-lg": ["Plus Jakarta Sans"],
                "headline-xl-mobile": ["Plus Jakarta Sans"],
                "body-md": ["Inter"],
                "body-lg": ["Inter"],
                "headline-md": ["Plus Jakarta Sans"],
                "label-md": ["Inter"],
                "label-sm": ["Inter"],
                "headline-xl": ["Plus Jakarta Sans"]
            },
            "fontSize": {
                "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
                "headline-xl-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
                "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500" }],
                "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                "headline-xl": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }]
            }
        },
    },
}

// Mobile Menu Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    const toggleMenu = () => {
        mobileMenu.classList.toggle('open');
        body.classList.toggle('mobile-menu-active');
    };

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }

    // Mobile Accordion: arrow icon toggles sub-menu; section title navigates as a link
    const accordionToggles = mobileMenu?.querySelectorAll('.mobile-toggle');
    accordionToggles?.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const section = btn.closest('.mobile-section');
            const sub = section?.querySelector('.mobile-sub');
            if (!sub) return;
            const isOpen = sub.classList.contains('open');
            if (isOpen) {
                sub.classList.remove('open');
                section.classList.remove('open');
            } else {
                sub.classList.add('open');
                section.classList.add('open');
            }
        });
    });

    // Close menu overlay when any nav link is clicked
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            body.classList.remove('mobile-menu-active');
        });
    });

    // Smooth Count-Up Animation for Stats Counters
    const counters = document.querySelectorAll('.counter-value');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1500; // 1.5 seconds duration
        let startTime = null;

        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            counter.innerText = value.toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                counter.innerText = target.toLocaleString() + suffix;
            }
        };
        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    counters.forEach(counter => counterObserver.observe(counter));
});
