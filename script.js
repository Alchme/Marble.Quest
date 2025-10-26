// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Animate feature cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card, .level-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Enhanced typing effect for hero title
const heroTitle = document.querySelector('.hero-content h2');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.classList.remove('typing-effect');
            }, 1000);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    alert(`Thanks for subscribing! We'll send updates to ${email}`);
    this.reset();
});

// Trailer video play functionality
document.querySelector('.play-button').addEventListener('click', function() {
    const thumbnail = this.parentElement;
    const iframe = thumbnail.nextElementSibling;
    const videoContainer = thumbnail.parentElement;

    thumbnail.style.display = 'none';
    iframe.style.display = 'block';
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    videoContainer.style.transform = 'scale(1)';
});

// Screenshot gallery lightbox effect
let currentImageIndex = 0;
const screenshotItems = document.querySelectorAll('.screenshot-item');

function createLightbox(index) {
    currentImageIndex = index;
    const img = screenshotItems[index].querySelector('img');
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <div class="lightbox-content">
            <img src="${img.src}" alt="${img.alt}" class="lightbox-image">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&larr;</button>
            <button class="lightbox-next">&rarr;</button>
            <div class="lightbox-caption">${screenshotItems[index].querySelector('h4').textContent}</div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Add event listeners
    overlay.querySelector('.lightbox-close').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    overlay.querySelector('.lightbox-prev').addEventListener('click', () => {
        changeImage(-1, overlay);
    });
    overlay.querySelector('.lightbox-next').addEventListener('click', () => {
        changeImage(1, overlay);
    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeydown);
    function handleKeydown(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(overlay);
            document.removeEventListener('keydown', handleKeydown);
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1, overlay);
        } else if (e.key === 'ArrowRight') {
            changeImage(1, overlay);
        }
    }
}

function changeImage(direction, overlay) {
    currentImageIndex = (currentImageIndex + direction + screenshotItems.length) % screenshotItems.length;
    const newImg = screenshotItems[currentImageIndex].querySelector('img');
    const lightboxImg = overlay.querySelector('.lightbox-image');
    const caption = overlay.querySelector('.lightbox-caption');

    lightboxImg.src = newImg.src;
    lightboxImg.alt = newImg.alt;
    caption.textContent = screenshotItems[currentImageIndex].querySelector('h4').textContent;
}

screenshotItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        createLightbox(index);
    });
});
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s infinite';

    setTimeout(() => {
        body.style.animation = '';
        alert('🎉 Easter Egg Activated! You found the secret code! 🎉');
    }, 4000);
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Random marble color changes
setInterval(() => {
    const marble = document.querySelector('.marble');
    if (marble) {
        const colors = ['#7B68EE', '#ff4757', '#3742fa', '#2f3542', '#6A5ACD'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        marble.style.background = `radial-gradient(circle at 30% 30%, ${randomColor}, ${randomColor}dd)`;
    }
}, 5000);

// FAQ accordion functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    alert(`Thanks for your message, ${data.name}! We'll get back to you soon.`);
    this.reset();
});

// Level generator functionality
document.querySelector('.generate-btn').addEventListener('click', function() {
    const generatedLevel = document.querySelector('.generated-level');
    const levelElements = ['🌲', '🏔️', '🏜️', '🌊', '🚀', '💎', '⚡', '🏆'];

    generatedLevel.innerHTML = '';
    generatedLevel.style.display = 'flex';
    generatedLevel.style.flexWrap = 'wrap';
    generatedLevel.style.justifyContent = 'center';
    generatedLevel.style.alignItems = 'center';

    // Generate random level layout
    for (let i = 0; i < 25; i++) {
        const element = document.createElement('div');
        element.textContent = levelElements[Math.floor(Math.random() * levelElements.length)];
        element.style.fontSize = '1.5rem';
        element.style.margin = '3px';
        element.style.animation = `bounceIn 0.6s ease ${i * 0.05}s both`;
        generatedLevel.appendChild(element);
    }

    // Add bounceIn animation
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3) rotate(-180deg); }
            50% { opacity: 1; transform: scale(1.05) rotate(-90deg); }
            70% { transform: scale(0.9) rotate(-45deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
    `;
    document.head.appendChild(bounceStyle);
});

// Physics demo interaction
document.querySelector('.demo-container').addEventListener('click', function() {
    const marble = document.querySelector('.demo-marble');
    marble.style.animation = 'none';
    setTimeout(() => {
        marble.style.animation = 'demo-roll 3s ease-in-out infinite';
    }, 10);
});

// Parallax effect for levels section
window.addEventListener('scroll', function() {
    const levelsSection = document.getElementById('levels');
    const scrolled = window.pageYOffset;
    const sectionTop = levelsSection.offsetTop;
    const sectionHeight = levelsSection.offsetHeight;

    if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
        const levelCards = levelsSection.querySelectorAll('.level-card');
        levelCards.forEach((card, index) => {
            const speed = (index + 1) * 0.1;
            card.style.transform = `translateY(${ (scrolled - sectionTop) * speed }px)`;
        });
    }
});

// Enhanced scroll-triggered animations
const scrollElements = document.querySelectorAll('.feature-card, .level-card, .screenshot-item, .team-member, .mechanic-explanation');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Add scrolled class styles
const scrollStyle = document.createElement('style');
scrollStyle.textContent = `
    .feature-card.scrolled, .level-card.scrolled, .screenshot-item.scrolled, .team-member.scrolled, .mechanic-explanation.scrolled {
        animation: slideInUp 0.6s ease-out;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(scrollStyle);

// Loading screen animation
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-marble"></div>
            <h2>Loading Marble Quest...</h2>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // Simulate loading
    let progress = 0;
    const progressBar = loadingScreen.querySelector('.loading-progress');
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(loadingScreen);
                }, 500);
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 100);
});

// Add loading screen styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s;
    }

    .loading-content {
        text-align: center;
        color: #fff;
    }

    .loading-marble {
        width: 50px;
        height: 50px;
        background: radial-gradient(circle, #7B68EE, #6A5ACD);
        border-radius: 50%;
        margin: 0 auto 2rem;
        animation: loading-roll 1s ease-in-out infinite;
    }

    @keyframes loading-roll {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
    }

    .loading-content h2 {
        font-family: 'Press Start 2P', cursive;
        color: #7B68EE;
        margin-bottom: 2rem;
    }

    .loading-bar {
        width: 300px;
        height: 20px;
        background-color: #333;
        border-radius: 10px;
        overflow: hidden;
        margin: 0 auto;
    }

    .loading-progress {
        height: 100%;
        background: linear-gradient(90deg, #7B68EE, #6A5ACD);
        width: 0%;
        transition: width 0.3s;
    }
`;
document.head.appendChild(loadingStyle);

// Sound effects toggle (simulated)
let soundEnabled = true;
const soundToggle = document.createElement('button');
soundToggle.textContent = '🔊';
soundToggle.style.position = 'fixed';
soundToggle.style.bottom = '20px';
soundToggle.style.right = '20px';
soundToggle.style.backgroundColor = '#7B68EE';
soundToggle.style.border = 'none';
soundToggle.style.borderRadius = '50%';
soundToggle.style.width = '50px';
soundToggle.style.height = '50px';
soundToggle.style.cursor = 'pointer';
soundToggle.style.zIndex = '1000';
soundToggle.style.fontSize = '1.2rem';
soundToggle.title = 'Toggle Sound Effects';

soundToggle.addEventListener('click', function() {
    soundEnabled = !soundEnabled;
    this.textContent = soundEnabled ? '🔊' : '🔇';

    // Simulate sound toggle feedback
    if (soundEnabled) {
        // Play a "click" sound (simulated)
        console.log('Sound enabled');
    } else {
        console.log('Sound disabled');
    }
});

document.body.appendChild(soundToggle);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        const overlays = document.querySelectorAll('.lightbox, .modal');
        overlays.forEach(overlay => {
            overlay.style.display = 'none';
        });
    }
});

// Press kit download functionality
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const type = this.getAttribute('data-type');

        // Simulate download
        const downloads = {
            logo: 'MarbleQuest_Logos.zip',
            screenshots: 'MarbleQuest_Screenshots.zip',
            wallpaper: 'MarbleQuest_Wallpapers.zip'
        };

        alert(`Downloading ${downloads[type]}... (This is a simulation)`);
    });
});

// Animate wishlist counter
function animateCounter() {
    const counter = document.querySelector('.counter-number');
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Trigger counter animation when Steam section is in view
const steamObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            steamObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

steamObserver.observe(document.getElementById('steam'));

// Level preview functionality
document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const levelName = this.parentElement.querySelector('h3').textContent;
        alert(`🎮 ${levelName} Preview Coming Soon!\n\nExperience the thrill of rolling through this epic level.`);
    });
});

// Blog navigation functionality
document.querySelectorAll('.page-number').forEach(number => {
    number.addEventListener('click', function() {
        document.querySelectorAll('.page-number').forEach(n => n.classList.remove('active'));
        this.classList.add('active');

        // Simulate page change
        alert(`Loading page ${this.textContent}... (This is a simulation)`);
    });
});

document.querySelector('.next-btn').addEventListener('click', function() {
    const activePage = document.querySelector('.page-number.active');
    const nextPage = activePage.nextElementSibling;
    if (nextPage) {
        activePage.classList.remove('active');
        nextPage.classList.add('active');
        alert(`Loading page ${nextPage.textContent}... (This is a simulation)`);
    }
});

document.querySelector('.prev-btn').addEventListener('click', function() {
    const activePage = document.querySelector('.page-number.active');
    const prevPage = activePage.previousElementSibling;
    if (prevPage) {
        activePage.classList.remove('active');
        prevPage.classList.add('active');
        alert(`Loading page ${prevPage.textContent}... (This is a simulation)`);
    }
});

// Performance optimizations
// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Debounce scroll events
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

window.addEventListener('scroll', debounce(() => {
    handleScrollAnimation();
}, 16));

// PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker for offline support
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Add to home screen prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show install button
    const installBtn = document.createElement('button');
    installBtn.textContent = '📱 Install App';
    installBtn.style.position = 'fixed';
    installBtn.style.bottom = '80px';
    installBtn.style.right = '20px';
    installBtn.style.backgroundColor = '#7B68EE';
    installBtn.style.color = '#fff';
    installBtn.style.border = 'none';
    installBtn.style.borderRadius = '50px';
    installBtn.style.padding = '10px 20px';
    installBtn.style.cursor = 'pointer';
    installBtn.style.zIndex = '1000';

    installBtn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            document.body.removeChild(installBtn);
        });
    });

    document.body.appendChild(installBtn);

    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (document.body.contains(installBtn)) {
            document.body.removeChild(installBtn);
        }
    }, 10000);
});

// Cache critical resources
const cacheName = 'marble-quest-v1';
const criticalResources = [
    '/',
    '/styles.css',
    '/script.js',
    '/index.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(criticalResources))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Add ARIA labels and roles
document.querySelectorAll('.btn').forEach(btn => {
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
});

document.querySelectorAll('section').forEach(section => {
    const heading = section.querySelector('h2');
    if (heading) {
        section.setAttribute('aria-labelledby', heading.id || `section-${Math.random().toString(36).substr(2, 9)}`);
    }
});

// Add particle effect to background (simple version)
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '-1';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = '#7B68EE';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particleContainer.appendChild(particle);
    }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Scroll progress bar
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add click effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Responsive navigation toggle (for mobile)
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.createElement('button');
navToggle.textContent = '☰';
navToggle.className = 'nav-toggle';
navToggle.style.display = 'none';
navToggle.style.background = 'none';
navToggle.style.border = 'none';
navToggle.style.color = '#7B68EE';
navToggle.style.fontSize = '1.5rem';
navToggle.style.cursor = 'pointer';
navToggle.setAttribute('aria-label', 'Toggle navigation menu');

document.querySelector('.nav-container').appendChild(navToggle);

function toggleNav() {
    navMenu.classList.toggle('active');
}

navToggle.addEventListener('click', toggleNav);

// Show/hide nav toggle on mobile
function checkScreenSize() {
    if (window.innerWidth <= 768) {
        navToggle.style.display = 'block';
        navMenu.style.display = 'none';
        navMenu.classList.add('mobile-menu');
    } else {
        navToggle.style.display = 'none';
        navMenu.style.display = 'flex';
        navMenu.classList.remove('mobile-menu', 'active');
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

// Add mobile menu styles
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
    .mobile-menu {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: #000;
        flex-direction: column;
        padding: 1rem 0;
        display: none;
    }
    .mobile-menu.active {
        display: flex;
    }
    .mobile-menu li {
        margin: 0.5rem 0;
        text-align: center;
    }
`;
document.head.appendChild(mobileStyle);