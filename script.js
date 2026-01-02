// ================= LENIS SETUP =================
const lenis = new Lenis({
duration: 1.15,
easing: (t) => 1 - Math.pow(1 - t, 3),
smooth: true,
smoothWheel: true,
smoothTouch: false,
lerp: 0.075
})


function raf(time) {
lenis.raf(time)
requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


// ================= ELEMENTS =================
const navbar = document.getElementById('navbar')
const scrollTopBtn = document.getElementById('scroll-top')
const heroVisual = document.querySelector('.hero-visual')


// ================= LENIS SCROLL ONLY =================
lenis.on('scroll', ({ scroll }) => {


// Navbar shadow
if (scroll > 50) navbar.classList.add('scrolled')
else navbar.classList.remove('scrolled')


// Scroll‑to‑top button
if (scroll > 500) scrollTopBtn.classList.add('visible')
else scrollTopBtn.classList.remove('visible')


// Light parallax (GPU‑safe)
if (heroVisual && scroll < window.innerHeight) {
heroVisual.style.transform = `translateY(${scroll * 0.15}px)`
}
})


// ================= SCROLL TO TOP =================
scrollTopBtn.addEventListener('click', () => {
lenis.scrollTo(0, { duration: 1.2 })
})


// ================= ANIMATIONS =================
const animated = document.querySelectorAll('[data-animate]')
const io = new IntersectionObserver(entries => {
entries.forEach(e => {
if (e.isIntersecting) {
e.target.classList.add('animated')
io.unobserve(e.target)
}
})
}, { threshold: 0.2 })


animated.forEach(el => io.observe(el))