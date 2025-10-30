(function () {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        return;
    }

    var animatedNodes = document.querySelectorAll('[data-animate]');
    if (!animatedNodes.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var type = el.getAttribute('data-animate');
                if (type === 'fade') {
                    el.classList.add('fade-in');
                } else if (type === 'up' || type === 'fade-up' || type === 'slide-up') {
                    el.classList.add('slide-up');
                } else if (type === 'zoom' || type === 'zoom-in') {
                    el.classList.add('zoom-in');
                } else {
                    el.classList.add('fade-in');
                }
                observer.unobserve(el);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    animatedNodes.forEach(function (el) { observer.observe(el); });
})();


