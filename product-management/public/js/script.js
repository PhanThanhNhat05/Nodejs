console.log("Script loaded successfully.");

// Mobile menu toggle for header
(function () {
	const toggle = document.querySelector('.mobile-toggle');
	const header = document.querySelector('.site-header');
	if (!toggle || !header) return;
	toggle.addEventListener('click', () => {
		header.classList.toggle('open');
	});
})();

// Image loading animation
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.product-item .inner-image img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.classList.add('loaded');
        }
        // Fallback when image fails to load
        img.addEventListener('error', function() {
            this.classList.remove('loaded');
            // show placeholder background (could also swap src to local fallback)
            this.src = '/images/ip.jpg';
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        observer.observe(item);
    });
    // Add to cart click logging
    document.querySelectorAll('.btn.add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            console.log('Add to cart clicked for', id);
            // TODO: call API to add to cart
        });
    });
    
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
});