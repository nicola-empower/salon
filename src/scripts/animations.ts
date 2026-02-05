// GSAP Animations Setup for The Salon
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize all GSAP scroll animations
 * Call this function once the DOM is loaded
 */
export function initScrollAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Skip animations if user prefers reduced motion
        return;
    }

    // 1. Fade Up Animation (for service cards, sections)
    gsap.utils.toArray('[data-gsap-fade-up]').forEach((element: any) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // 2. Stagger Animation (for grids,lists)
    gsap.utils.toArray('[data-gsap-stagger]').forEach((container: any) => {
        const children = container.children;

        gsap.from(children, {
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        });
    });

    // 3. Parallax Effect (for hero images)
    gsap.utils.toArray('[data-gsap-parallax]').forEach((element: any) => {
        const speed = element.dataset.parallaxSpeed || 0.5;

        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
            y: () => element.offsetHeight * parseFloat(speed),
            ease: 'none'
        });
    });

    // 4. Scale In Animation
    gsap.utils.toArray('[data-gsap-scale-in]').forEach((element: any) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.7,
            ease: 'back.out(1.2)'
        });
    });

    // 5. Slide In from Left/Right
    gsap.utils.toArray('[data-gsap-slide-left]').forEach((element: any) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            x: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('[data-gsap-slide-right]').forEach((element: any) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            x: 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // 6. Hero Animation (runs immediately on load)
    const hero = document.querySelector('[data-gsap-hero]');
    if (hero) {
        const heroTitle = hero.querySelector('h1');
        const heroSubtitle = hero.querySelector('p');
        const heroButton = hero.querySelector('.btn');

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from(heroTitle, { y: 50, opacity: 0, duration: 1 })
            .from(heroSubtitle, { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
            .from(heroButton, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');
    }

    // 7. Pin sections (optional - for sticky elements)
    gsap.utils.toArray('[data-gsap-pin]').forEach((element: any) => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top top',
            end: '+=300',
            pin: true,
            pinSpacing: false,
        });
    });

    console.log('[GSAP] Scroll animations initialized');
}

/**
 * Refresh ScrollTrigger (call after dynamic content loads)
 */
export function refreshScrollTriggers() {
    ScrollTrigger.refresh();
}

/**
 * Kill all ScrollTriggers (cleanup)
 */
export function killScrollTriggers() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}
