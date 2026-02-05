/**
 * Native Intersection Observer Animations
 * A lightweight replacement for GSAP that uses the browser's native API.
 * 
 * Usage:
 * Add data attributes to elements you want to animate:
 * - data-gsap-fade-up
 * - data-gsap-slide-left
 * - data-gsap-slide-right
 * - data-gsap-scale-in
 * - data-gsap-stagger (children will stagger)
 */

export function initScrollAnimations() {
    // Options for the observer
    const observerOptions = {
        root: null, // Use the viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    // The callback function that runs when elements are observed
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that triggers the CSS transition
                entry.target.classList.add('in-view');

                // Stop observing once animated (one-time animation)
                observer.unobserve(entry.target);
            }
        });
    };

    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements with animation data attributes
    const animatedElements = document.querySelectorAll(
        '[data-gsap-fade-up], [data-gsap-slide-left], [data-gsap-slide-right], [data-gsap-scale-in], [data-gsap-stagger]'
    );

    // Start observing each element
    animatedElements.forEach(el => observer.observe(el));

    console.log(`✨ Native animations initialized: observing ${animatedElements.length} elements`);
}

// Helper to cleanup if needed (mostly for framework transitions)
export function cleanupScrollAnimations() {
    // Native observers are usually garbage collected, but explicit disconnect is good practice
    // In a simple script like this without a global observer reference, 
    // we rely on page teardown, but if we stored the observer globally:
    // observer.disconnect();
}
