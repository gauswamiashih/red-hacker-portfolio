/* ============================================
   GAUSWAMI'S RED HACKER - JAVASCRIPT
   Smooth Scrolling with Lenis + Animations
   ============================================ */

// ===== LENIS SMOOTH SCROLL INITIALIZATION =====
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Request Animation Frame for Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Stop Lenis on specific elements
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    // You can add custom scroll logic here
});

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Active nav link on scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu
        navMenu.classList.remove('active');
        
        // Smooth scroll to section using Lenis
        if (targetSection) {
            lenis.scrollTo(targetSection, {
                offset: -80,
                duration: 1.5
            });
        }
    });
});

// Update active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== SCROLL ANIMATIONS =====
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    lenis.scrollTo('top', {
        duration: 2
    });
});

// ===== TERMINAL TYPING EFFECT =====
const terminalCommands = [
    { command: 'whoami', output: 'red_hacker' },
    { command: 'cat /etc/passwd', output: 'root:x:0:0:root:/root:/bin/bash' },
    { command: 'sudo -l', output: 'User red_hacker may run the following...' },
];

let currentCommandIndex = 0;
let isTyping = false;

function typeCommand() {
    if (isTyping) return;
    isTyping = true;

    const terminalBody = document.querySelector('.terminal-body');
    const commandData = terminalCommands[currentCommandIndex];
    
    // Create new line for command
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `
        <span class="prompt">$</span>
        <span class="command typing"></span>
    `;
    terminalBody.appendChild(commandLine);

    const commandSpan = commandLine.querySelector('.command');
    let i = 0;

    // Type command character by character
    const typingInterval = setInterval(() => {
        if (i < commandData.command.length) {
            commandSpan.textContent += commandData.command[i];
            i++;
        } else {
            clearInterval(typingInterval);
            commandSpan.classList.remove('typing');
            
            // Show output
            setTimeout(() => {
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-line';
                outputLine.innerHTML = `<span class="output highlight">${commandData.output}</span>`;
                terminalBody.appendChild(outputLine);

                // Move to next command
                currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;
                isTyping = false;

                // Keep only last 10 lines
                const allLines = terminalBody.querySelectorAll('.terminal-line');
                if (allLines.length > 10) {
                    allLines[0].remove();
                    allLines[1].remove();
                }
            }, 300);
        }
    }, 100);
}

// Start terminal animation
setInterval(typeCommand, 4000);

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message (you can replace this with actual form submission)
    alert(`Thank you for your message, ${data.name}! I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
    
    // In production, you would send this data to a server:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Show success message
    alert(`Thank you for subscribing with ${email}!`);
    
    // Reset form
    newsletterForm.reset();
    
    // In production, send to server
});

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ===== CURSOR EFFECT (OPTIONAL) =====
const createCursorFollower = () => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const speed = 0.2;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .service-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
};

// Uncomment to enable custom cursor (desktop only)
// if (window.innerWidth > 768) {
//     createCursorFollower();
// }

// ===== STATISTICS COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-item h3');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const numericValue = parseInt(target.replace(/\D/g, ''));
    
    let current = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            element.textContent = isPercentage ? `${numericValue}%` : `${numericValue}+`;
            clearInterval(counter);
        } else {
            element.textContent = isPercentage ? 
                `${Math.floor(current)}%` : 
                `${Math.floor(current)}+`;
        }
    }, stepTime);
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.5
            });
        }
    });
});

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img[data-src]');

const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imgObserver.unobserve(img);
        }
    });
});

images.forEach(img => imgObserver.observe(img));

// ===== PREVENT CONTEXT MENU (OPTIONAL SECURITY) =====
// Uncomment to disable right-click
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
//     alert('Right-click is disabled!');
// });

// ===== CONSOLE MESSAGE =====
console.log('%cGauswami\'s Red Hacker', 'color: #0066FF; font-size: 24px; font-weight: bold;');
console.log('%cLooking for something? 👀', 'color: #FF0040; font-size: 16px;');
console.log('%cIf you found a vulnerability, please report it responsibly!', 'color: #00D4FF; font-size: 14px;');

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero [data-animate]');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animated');
        }, index * 100);
    });
});

// ===== PERFORMANCE MONITORING =====
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.renderTime || entry.loadTime);
            }
        }
    });
    
    try {
        perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // Browser doesn't support this feature
    }
}

// ===== MATRIX RAIN EFFECT (ENHANCED) =====
const matrixRain = document.querySelector('.matrix-rain');

if (matrixRain) {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.opacity = '0.05';
    canvas.style.pointerEvents = 'none';
    
    matrixRain.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0066FF';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
    
    // Press 'H' to scroll to home
    if (e.key === 'h' || e.key === 'H') {
        lenis.scrollTo('top', { duration: 1.5 });
    }
    
    // Press 'C' to focus on contact form
    if (e.key === 'c' || e.key === 'C') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            lenis.scrollTo(contactSection, { offset: -80 });
            setTimeout(() => {
                document.getElementById('name')?.focus();
            }, 1000);
        }
    }
});

console.log('%c✨ Website fully loaded and optimized!', 'color: #00D4FF; font-size: 14px; font-weight: bold;');