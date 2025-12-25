// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Global Variables
let isAnimationEnabled = true;

// Spider Web Variables
let spiderWebCanvas, spiderWebCtx;
let nodes = [];
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const maxDistance = 150;
const nodeCount = 80;

// Particle System Variables
let particleCanvas, particleCtx;
let particles = [];
const particleCount = 30;

// DOM Elements
const navbar = $('#navbar');
const navMenu = $('#nav-menu');
const hamburger = $('#hamburger');
const backToTopBtn = $('#back-to-top');
const contactForm = $('#contact-form');
const typedTextElement = $('#typed-text');
const currentTimeElement = $('#current-time');
const loadingScreen = $('#loading-screen');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize components after a short delay
    setTimeout(() => {
        initializeComponents();
        initializeSpiderWeb();
        initializeParticleSystem();
        initializeTiltEffect();
        initializeRevealAnimations();
        initializeLiveTime();
        
        // Start typing animation
        if (typedTextElement) {
            new TypeWriter(typedTextElement, [
                'Full Stack Developer',
                'Cybersecurity Student',
                'IT Engineer',
                'UI/UX Designer',
                'Problem Solver',
                'Innovation Enthusiast'
            ]);
        }
        
        // Hide loading screen
        hideLoadingScreen();
        
        // Handle page load animations
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        console.log('🚀 Portfolio loaded successfully!');
    }, 2000);
});

// Loading Screen Functions
function showLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
}

function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Component Initialization
function initializeComponents() {
    new Navigation();
    new ScrollAnimations();
    new CounterAnimation();
    new SkillsAnimation();
    new PortfolioFilter();
    new ContactForm();
    new BackToTop();
}

// Spider Web Implementation with Cursor Following
function initializeSpiderWeb() {
    spiderWebCanvas = $('#spider-web');
    if (!spiderWebCanvas) return;
    
    spiderWebCtx = spiderWebCanvas.getContext('2d');
    resizeSpiderWeb();
    createNodes();
    animateSpiderWeb();
    
    window.addEventListener('resize', resizeSpiderWeb);
    document.addEventListener('mousemove', updateMousePosition);
}

function resizeSpiderWeb() {
    spiderWebCanvas.width = window.innerWidth;
    spiderWebCanvas.height = window.innerHeight;
}

function createNodes() {
    nodes = [];
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * spiderWebCanvas.width,
            y: Math.random() * spiderWebCanvas.height,
            vx: (Math.random() - 0.7) * 0.3,
            vy: (Math.random() - 0.7) * 0.3,
            radius: Math.random() * 3 + 1,
            originalX: 0,
            originalY: 0
        });
        nodes[i].originalX = nodes[i].x;
        nodes[i].originalY = nodes[i].y;
    }
}

function updateMousePosition(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function animateSpiderWeb() {
    if (!isAnimationEnabled) {
        requestAnimationFrame(animateSpiderWeb);
        return;
    }
    
    spiderWebCtx.clearRect(0, 0, spiderWebCanvas.width, spiderWebCanvas.height);
    
    // Update nodes with cursor as center
    nodes.forEach((node, index) => {
        // Calculate distance from mouse
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Strong attraction to cursor (center node effect)
        if (distance < 300) {
            const force = (300 - distance) / 300;
            const attraction = force * 0.02;
            node.vx += (dx / distance) * attraction;
            node.vy += (dy / distance) * attraction;
        }
        
        // Gentle pull back to original position
        const returnForce = 0.01;
        node.vx += (node.originalX - node.x) * returnForce;
        node.vy += (node.originalY - node.y) * returnForce;
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Boundary collision
        if (node.x < 0 || node.x > spiderWebCanvas.width) {
            node.vx *= -0.8;
            node.x = Math.max(0, Math.min(spiderWebCanvas.width, node.x));
        }
        if (node.y < 0 || node.y > spiderWebCanvas.height) {
            node.vy *= -0.8;
            node.y = Math.max(0, Math.min(spiderWebCanvas.height, node.y));
        }
        
        // Friction
        node.vx *= 0.98;
        node.vy *= 0.98;
    });
    
    // Draw connections
    spiderWebCtx.strokeStyle = 'rgba(0, 210, 255, 0.3)';
    spiderWebCtx.lineWidth = 1;
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = (maxDistance - distance) / maxDistance;
                spiderWebCtx.strokeStyle = `rgba(0, 210, 255, ${opacity * 0.4})`;
                spiderWebCtx.beginPath();
                spiderWebCtx.moveTo(nodes[i].x, nodes[i].y);
                spiderWebCtx.lineTo(nodes[j].x, nodes[j].y);
                spiderWebCtx.stroke();
            }
        }
        
        // Draw connections to mouse (center node effect)
        const dx = mouse.x - nodes[i].x;
        const dy = mouse.y - nodes[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
            const opacity = (200 - distance) / 200;
            spiderWebCtx.strokeStyle = `rgba(0, 210, 255, ${opacity * 0.6})`;
            spiderWebCtx.lineWidth = 2;
            spiderWebCtx.beginPath();
            spiderWebCtx.moveTo(nodes[i].x, nodes[i].y);
            spiderWebCtx.lineTo(mouse.x, mouse.y);
            spiderWebCtx.stroke();
            spiderWebCtx.lineWidth = 1;
        }
    }
    
    // Draw center node (cursor)
    spiderWebCtx.fillStyle = 'rgba(0, 210, 255, 0.8)';
    spiderWebCtx.beginPath();
    spiderWebCtx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
    spiderWebCtx.fill();
    
    // Draw nodes
    spiderWebCtx.fillStyle = 'rgba(0, 210, 255, 0.6)';
    nodes.forEach(node => {
        spiderWebCtx.beginPath();
        spiderWebCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        spiderWebCtx.fill();
    });
    
    requestAnimationFrame(animateSpiderWeb);
}

// Particle System
function initializeParticleSystem() {
    particleCanvas = $('#particles');
    if (!particleCanvas) return;
    
    particleCtx = particleCanvas.getContext('2d');
    resizeParticleCanvas();
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', resizeParticleCanvas);
}

function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`
        });
    }
}

function animateParticles() {
    if (!isAnimationEnabled) {
        requestAnimationFrame(animateParticles);
        return;
    }
    
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = particleCanvas.width;
        if (particle.x > particleCanvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = particleCanvas.height;
        if (particle.y > particleCanvas.height) particle.y = 0;
        
        // Draw particle
        particleCtx.save();
        particleCtx.globalAlpha = particle.opacity;
        particleCtx.fillStyle = particle.color;
        particleCtx.beginPath();
        particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        particleCtx.fill();
        particleCtx.restore();
    });
    
    requestAnimationFrame(animateParticles);
}

// Tilt Effect
function initializeTiltEffect() {
    const tiltElements = $$('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            if (!isAnimationEnabled) return;
            
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Reveal Animations
function initializeRevealAnimations() {
    const revealElements = $$('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// Live Time
function initializeLiveTime() {
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
        });
        
        if (currentTimeElement) {
            currentTimeElement.textContent = timeString;
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

// Navigation Class
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateActiveLink();
    }

    bindEvents() {
        // Hamburger menu toggle
        hamburger?.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking nav links
        $$('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scroll for navigation links
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
              
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = $(`#${targetId}`);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveLink();
            this.updateNavbarBackground();
        });
    }

    updateActiveLink() {
        const sections = $$('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = $(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                $$('.nav-link').forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    }

    updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Typing Animation Class
class TypeWriter {
    constructor(element, texts, speed = 100, deleteSpeed = 50, delay = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.delay = delay;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        if (!isAnimationEnabled) return;
        
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Scroll Animations Class
class ScrollAnimations {
    constructor() {
        this.elements = $$('.fade-in, .slide-in-left, .slide-in-right');
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkElements();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            if (isAnimationEnabled) {
                this.checkElements();
            }
        });
    }

    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
}

// Counter Animation Class
class CounterAnimation {
    constructor() {
        this.counters = $$('[data-count]');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.counters.forEach(counter => {
                if (this.isElementInViewport(counter) && !counter.classList.contains('counted')) {
                    this.animateCounter(counter);
                    counter.classList.add('counted');
                }
            });
        });
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    animateCounter(element) {
        if (!isAnimationEnabled) {
            element.textContent = element.getAttribute('data-count');
            return;
        }

        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);

            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
}

// Skills Animation Class
class SkillsAnimation {
    constructor() {
        this.skillBars = $$('.skill-progress');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.skillBars.forEach(bar => {
                if (this.isElementInViewport(bar) && !bar.classList.contains('animated')) {
                    const width = bar.getAttribute('data-width');
                    if (isAnimationEnabled) {
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    } else {
                        bar.style.width = width;
                    }
                    bar.classList.add('animated');
                }
            });
        });
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// Portfolio Filter Class
class PortfolioFilter {
    constructor() {
        this.filterBtns = $$('.filter-btn');
        this.portfolioItems = $$('.portfolio-item');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button and ARIA states
                this.filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                
                // Filter items
                this.filterItems(filter);
            });
        });
    }

    filterItems(filter) {
        this.portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                if (isAnimationEnabled) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                }
            } else {
                if (isAnimationEnabled) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }
}

// Contact Form Class
class ContactForm {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        contactForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Enhanced form validation
        const inputs = contactForm?.querySelectorAll('input, textarea');
        inputs?.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearErrors(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        
        this.clearErrors(field);

        if (!value) {
            this.showError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            return false;
        }

        if (fieldName === 'email' && !this.isValidEmail(value)) {
            this.showError(field, 'Please enter a valid email address');
            return false;
        }

        if (fieldName === 'message' && value.length < 10) {
            this.showError(field, 'Message must be at least 10 characters long');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(field, message) {
        field.style.borderColor = 'var(--error-color)';
        field.setAttribute('aria-invalid', 'true');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'var(--error-color)';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.5rem';
            errorElement.setAttribute('role', 'alert');
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearErrors(field) {
        field.style.borderColor = 'rgba(0, 210, 255, 0.3)';
        field.setAttribute('aria-invalid', 'false');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleSubmit() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Show loading state
        contactForm.classList.add('loading');
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showSuccessMessage();
            contactForm.reset();
            
        } catch (error) {
            this.showErrorMessage('Failed to send message. Please try again.');
        } finally {
            contactForm.classList.remove('loading');
        }
    }

    showSuccessMessage() {
        this.showNotification('🚀 Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    showErrorMessage(message) {
        this.showNotification(`❌ ${message}`, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 600;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            ${type === 'success' ? 'background: rgba(0, 255, 136, 0.9);' : 'background: rgba(255, 71, 87, 0.9);'}
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Back to Top Class
class BackToTop {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('🌐 Connection restored');
});

window.addEventListener('offline', () => {
    console.log('📡 Connection lost');
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Export for potential external use
window.PortfolioApp = {
    Navigation,
    ScrollAnimations,
    CounterAnimation,
    SkillsAnimation,
    PortfolioFilter,
    ContactForm,
    BackToTop,
    TypeWriter
};// Disable tilt on mobile
if (window.innerWidth >= 1024) {
  const tiltElements = document.querySelectorAll("[data-tilt]");
  if (tiltElements.length) {
    VanillaTilt.init(tiltElements, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2
    });
  }
}
if (window.innerWidth < 1024) {
  document.querySelectorAll("[data-tilt]").forEach(el => {
    el.removeAttribute("data-tilt");
    el.style.transform = "none";
  });
}
