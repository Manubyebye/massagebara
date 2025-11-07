// Main JavaScript for the massage website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initSlideshow();
    initTestimonials();
    initCounters();
    initBackToTop();
    initSmoothScroll();
    initAnimations();
    initForms();
    initRippleEffects();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggler = document.getElementById('navbarToggler');
    const collapse = document.getElementById('navbarCollapse');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (toggler && collapse) {
        toggler.addEventListener('click', function() {
            toggler.classList.toggle('active');
            collapse.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (collapse.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = collapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                toggler.classList.remove('active');
                collapse.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbar.contains(event.target) && collapse.classList.contains('active')) {
                toggler.classList.remove('active');
                collapse.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Hero Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    let slideInterval;

    // Show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Next slide
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Previous slide
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        });

        nextBtn.addEventListener('click', function() {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });

    // Pause on hover
    const slideshow = document.querySelector('.hero-slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', stopSlideshow);
        slideshow.addEventListener('mouseleave', startSlideshow);
        
        // Pause on touch
        slideshow.addEventListener('touchstart', stopSlideshow);
    }

    // Start the slideshow
    startSlideshow();
}

// Testimonials slider functionality
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    // Show specific testimonial
    function showTestimonial(index) {
        // Remove active class from all testimonials and dots
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current testimonial and dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }

    // Next testimonial
    function nextTestimonial() {
        let nextIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }

    // Previous testimonial
    function prevTestimonial() {
        let prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });

    // Auto-advance testimonials
    setInterval(nextTestimonial, 7000);
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    }
    
    function checkCounters() {
        counters.forEach(counter => {
            const counterPosition = counter.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (counterPosition < screenPosition) {
                if (!counter.classList.contains('animated')) {
                    animateCounter(counter);
                    counter.classList.add('animated');
                }
            }
        });
    }
    
    window.addEventListener('scroll', checkCounters);
    // Initial check
    checkCounters();
}

// Back to top button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .stat-item, .testimonial-content, .about-img, .hours-image');
    
    function checkAnimation() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimation);
    // Initial check
    checkAnimation();
}

// Form handling
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Odesílání...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Úspěšně odesláno!';
                    submitBtn.style.background = '#28a745';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 2000);
                }, 1500);
            } else {
                alert('Prosím vyplňte všechna povinná pole.');
            }
        });
    });
}

// Ripple effect for buttons
function initRippleEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add subtle animation to hero elements after load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.slide-subtitle, .slide-title, .slide-text, .btn-large');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Add intersection observer for more precise animations
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .stat-item, .testimonial-content').forEach(el => {
        observer.observe(el);
    });
}

// Add keyboard navigation for slideshow
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        document.querySelector('.slide-prev')?.click();
    } else if (e.key === 'ArrowRight') {
        document.querySelector('.slide-next')?.click();
    }
});

// Add service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});