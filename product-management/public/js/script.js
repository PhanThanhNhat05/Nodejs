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