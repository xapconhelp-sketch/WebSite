function lazyLoading() {
    const lazyImages = document.querySelectorAll(".lazy-loading");

    const lazyLoad = (image) => {
        image.src = image.dataset.lazySrc;
        image.classList.remove("lazy");
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
}

document.addEventListener("DOMContentLoaded", lazyLoading);
