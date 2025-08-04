// Ultra-Modern Portfolio JavaScript with Advanced Effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Advanced Navbar Effects
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Advanced Navigation with Smooth Scrolling
    const navLinks = document.querySelectorAll('.advanced-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Highlighting with Intersection Observer
    const sections = document.querySelectorAll('section[id]');
    
    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -80px 0px' });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Advanced Counter Animation with Intersection Observer
    const counterElements = document.querySelectorAll('[data-target]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(element => {
        counterObserver.observe(element);
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            const suffix = target === 100 ? '%' : target === 2 ? '+' : target === 10 ? '+' : target === 15 ? '+' : '';
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }

    // Advanced Typing Effect for Hero Section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line, .title-highlight');
        let lineIndex = 0;
        
        function typeLine() {
            if (lineIndex < titleLines.length) {
                const line = titleLines[lineIndex];
                const text = line.textContent;
                line.textContent = '';
                
                let charIndex = 0;
                const typeChar = () => {
                    if (charIndex < text.length) {
                        line.textContent += text.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, 100);
                    } else {
                        lineIndex++;
                        setTimeout(typeLine, 500);
                    }
                };
                typeChar();
            }
        }
        
        setTimeout(typeLine, 1000);
    }

    // Advanced 3D Card Effects
    const cards = document.querySelectorAll('.project-card-advanced, .skill-category-advanced, .stat-card-advanced');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });

    // Advanced Skill Tag Interactions
    const skillTags = document.querySelectorAll('.skill-tag-advanced');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Add click effect for skill tags
        tag.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            showSkillModal(skill);
        });
    });

    // Advanced Contact Form with Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Advanced form validation
            if (validateForm(data)) {
                showSuccessMessage();
                this.reset();
            }
        });
    }

    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name || data.name.length < 2) {
            showErrorMessage('Please enter a valid name (minimum 2 characters)');
            return false;
        }
        
        if (!emailRegex.test(data.email)) {
            showErrorMessage('Please enter a valid email address');
            return false;
        }
        
        if (!data.subject || data.subject.length < 5) {
            showErrorMessage('Please enter a subject (minimum 5 characters)');
            return false;
        }
        
        if (!data.message || data.message.length < 10) {
            showErrorMessage('Please enter a message (minimum 10 characters)');
            return false;
        }
        
        return true;
    }

    // Advanced Message System
    function showSuccessMessage() {
        const message = createMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    function showErrorMessage(text) {
        const message = createMessage(text, 'error');
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }

    function createMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message message-${type}`;
        message.innerHTML = `
            <div class="message-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${text}</span>
            </div>
        `;
        
        // Add styles
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: var(--transition);
            max-width: 400px;
        `;
        
        setTimeout(() => {
            message.style.transform = 'translateX(0)';
        }, 100);
        
        return message;
    }

    // Advanced Skill Modal
    function showSkillModal(skill) {
        const modal = document.createElement('div');
        modal.className = 'skill-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${skill}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>This is a detailed description of ${skill} and how I use it in my projects.</p>
                    <div class="skill-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.random() * 40 + 60}%"></div>
                        </div>
                        <span class="progress-text">Proficiency Level</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: var(--transition);
        `;
        
        const overlay = modal.querySelector('.modal-overlay');
        const content = modal.querySelector('.modal-content');
        
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        `;
        
        content.style.cssText = `
            background: var(--surface);
            border-radius: var(--border-radius-lg);
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-xl);
            transform: scale(0.8);
            transition: var(--transition);
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 100);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const closeModal = () => {
            modal.style.opacity = '0';
            content.style.transform = 'scale(0.8)';
            setTimeout(() => modal.remove(), 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
    }

    // Advanced Parallax Effects
    const parallaxElements = document.querySelectorAll('.gradient-orb, .shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Advanced Mouse Trail Effect
    let mouseTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', function(e) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(dot);
        mouseTrail.push(dot);
        
        if (mouseTrail.length > maxTrailLength) {
            const oldDot = mouseTrail.shift();
            oldDot.style.opacity = '0';
            setTimeout(() => oldDot.remove(), 300);
        }
    });

    // Advanced Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements sequentially
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions');
        
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    element.style.transition = 'var(--transition)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    });

    // Advanced Scroll Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Advanced Theme Toggle (if needed)
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--surface);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        color: var(--text-primary);
        cursor: pointer;
        z-index: 1000;
        transition: var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        const icon = this.querySelector('i');
        icon.className = document.body.classList.contains('light-theme') ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Advanced Console Welcome
    console.log('%c🚀 Welcome to Deep Kushwaha\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%c💻 Built with cutting-edge web technologies', 'color: #a1a1aa; font-size: 14px;');
    console.log('%c🌟 Inspired by Framer, Aceternity UI & shadcn/ui', 'color: #f59e0b; font-size: 14px;');
    
    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
                console.log(`Page loaded in ${entry.loadEventEnd - entry.loadEventStart}ms`);
            }
        }
    });
    
    performanceObserver.observe({ entryTypes: ['navigation'] });

    // Advanced Error Handling
    window.addEventListener('error', function(e) {
        console.error('Portfolio Error:', e.error);
    });

    // Advanced Intersection Observer for Animations
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    // Observe all elements that should animate
    const animateElements = document.querySelectorAll('.project-card-advanced, .skill-category-advanced, .stat-card-advanced, .timeline-item-advanced');
    animateElements.forEach(el => animationObserver.observe(el));

    // Advanced Mobile Menu
    const mobileMenuToggle = document.querySelector('.advanced-toggler');
    const mobileMenu = document.querySelector('.navbar-collapse');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('show');
            
            // Animate hamburger to X
            const icon = this.querySelector('.toggler-icon');
            if (this.classList.contains('active')) {
                icon.style.transform = 'rotate(45deg)';
                icon.style.background = 'transparent';
                icon.style.boxShadow = 'none';
                
                icon.style.setProperty('--before-transform', 'rotate(90deg)');
                icon.style.setProperty('--after-transform', 'rotate(90deg)');
            } else {
                icon.style.transform = 'rotate(0deg)';
                icon.style.background = 'var(--text-primary)';
                icon.style.boxShadow = '0 -8px 0 var(--text-primary), 0 8px 0 var(--text-primary)';
            }
        });
    }

    // Advanced Form Input Effects
    const formInputs = document.querySelectorAll('.form-control-advanced');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });

    // Advanced Hover Effects for Buttons
    const buttons = document.querySelectorAll('.btn-advanced');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Advanced Scroll to Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        z-index: 1000;
        transition: var(--transition);
        opacity: 0;
        visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Advanced Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.skill-modal');
            modals.forEach(modal => modal.remove());
        }
    });

    // Advanced Touch Support for Mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger some action
                console.log('Swipe up detected');
            } else {
                // Swipe down - could trigger some action
                console.log('Swipe down detected');
            }
        }
    }

    // Advanced Analytics (if needed)
    function trackEvent(eventName, data = {}) {
        console.log('Event tracked:', eventName, data);
        // Here you could send to Google Analytics, Mixpanel, etc.
    }
    
    // Track important interactions
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn-advanced')) {
            trackEvent('button_click', { button: e.target.textContent });
        }
        
        if (e.target.matches('.skill-tag-advanced')) {
            trackEvent('skill_click', { skill: e.target.textContent });
        }
    });

    // Advanced Performance Optimization
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Optimize scroll handlers
    const optimizedScrollHandler = debounce(function() {
        // Scroll-based animations and effects
    }, 16); // ~60fps

    window.addEventListener('scroll', optimizedScrollHandler);

    // Advanced Preloader (if needed)
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">DK</div>
            <div class="preloader-bar">
                <div class="preloader-fill"></div>
            </div>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--background);
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(preloader);
    
    // Remove preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }, 1000);
    });

    // Advanced Accessibility Features
    document.addEventListener('keydown', function(e) {
        // Skip to main content
        if (e.key === 'Tab' && e.shiftKey) {
            const mainContent = document.querySelector('main') || document.querySelector('#home');
            if (mainContent) {
                mainContent.focus();
            }
        }
    });

    // Advanced SEO and Meta Updates
    function updateMetaTags() {
        const title = document.title;
        const description = document.querySelector('meta[name="description"]');
        
        if (description) {
            description.setAttribute('content', 'Deep Kushwaha - Full Stack Java Developer Portfolio');
        }
    }
    
    updateMetaTags();

    // Advanced Error Boundary
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });

    // Advanced Service Worker Registration (if needed)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // Advanced PWA Features (if needed)
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', function(e) {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button if needed
        const installBtn = document.createElement('button');
        installBtn.textContent = 'Install App';
        installBtn.className = 'btn btn-primary btn-advanced';
        installBtn.addEventListener('click', function() {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function(choiceResult) {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                deferredPrompt = null;
            });
        });
    });

    // Advanced Network Status
    window.addEventListener('online', function() {
        showMessage('You are back online!', 'success');
    });
    
    window.addEventListener('offline', function() {
        showMessage('You are currently offline', 'warning');
    });

    function showMessage(text, type) {
        const message = createMessage(text, type);
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Advanced Memory Management
    window.addEventListener('beforeunload', function() {
        // Clean up any resources
        if (performanceObserver) {
            performanceObserver.disconnect();
        }
        if (navObserver) {
            navObserver.disconnect();
        }
        if (counterObserver) {
            counterObserver.disconnect();
        }
        if (animationObserver) {
            animationObserver.disconnect();
        }
    });

    // Advanced Console Commands for Development
    window.debugPortfolio = {
        toggleTheme: () => {
            document.body.classList.toggle('light-theme');
        },
        showStats: () => {
            console.log('Portfolio Statistics:', {
                sections: sections.length,
                projects: document.querySelectorAll('.project-card-advanced').length,
                skills: document.querySelectorAll('.skill-tag-advanced').length,
                animations: document.querySelectorAll('[data-aos]').length
            });
        },
        reloadAnimations: () => {
            AOS.refresh();
        }
    };

    console.log('%c🔧 Debug commands available: window.debugPortfolio', 'color: #10b981; font-size: 12px;');
});

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Advanced CSS-in-JS for dynamic styles
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .focused .form-label-advanced {
            color: var(--primary-color);
            transform: translateY(-1.5rem) scale(0.85);
        }
        
        .has-value .form-label-advanced {
            transform: translateY(-1.5rem) scale(0.85);
        }
        
        .light-theme {
            --background: #ffffff;
            --background-secondary: #f8f9fa;
            --surface: #ffffff;
            --surface-hover: #f1f3f4;
            --text-primary: #1a1a1a;
            --text-secondary: #5f6368;
            --text-muted: #80868b;
            --border-color: #dadce0;
        }
        
        .preloader-content {
            text-align: center;
        }
        
        .preloader-logo {
            font-size: 3rem;
            font-weight: 800;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 2rem;
        }
        
        .preloader-bar {
            width: 200px;
            height: 4px;
            background: var(--border-color);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .preloader-fill {
            height: 100%;
            background: var(--gradient-primary);
            animation: loading 2s ease-in-out infinite;
        }
        
        @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles(); 