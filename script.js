// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initNavbar();
    initSmoothScrolling();
    initAnimations();
    initTestimonials();
    initNewsletter();
    initImageGallery();
    initScrollEffects();
    
    // Navbar functionality
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
        
        // Add scrolled class styles
        const style = document.createElement('style');
        style.textContent = `
            .navbar.scrolled {
                background-color: rgba(255, 255, 255, 0.98) !important;
                box-shadow: 0 2px 30px rgba(0, 0, 0, 0.15);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Scroll animations
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.destination-card, .feature-circle, .testimonial-card, .feature-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Testimonials carousel functionality
    function initTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Newsletter subscription
    function initNewsletter() {
        const newsletterForm = document.querySelector('.input-group');
        const emailInput = document.querySelector('input[type="email"]');
        const subscribeBtn = document.querySelector('.btn-warning[type="button"]');
        
        if (newsletterForm && emailInput && subscribeBtn) {
            subscribeBtn.addEventListener('click', function() {
                const email = emailInput.value.trim();
                
                if (validateEmail(email)) {
                    showNotification('Thank you for subscribing!', 'success');
                    emailInput.value = '';
                } else {
                    showNotification('Please enter a valid email address.', 'error');
                }
            });
            
            // Enter key support
            emailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    subscribeBtn.click();
                }
            });
        }
    }
    
    // Image gallery functionality
    function initImageGallery() {
        const adventureImages = document.querySelectorAll('.adventure-img');
        
        adventureImages.forEach(img => {
            img.addEventListener('click', function() {
                openImageModal(this.src, this.alt);
            });
        });
    }
    
    // Scroll effects
    function initScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-image img, .feature-card');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // Utility functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background-color: #28a745;' : 'background-color: #dc3545;'}
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    function openImageModal(src, alt) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img src="${src}" alt="${alt}">
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .image-modal.show {
                opacity: 1;
            }
            .modal-overlay {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .modal-content {
                position: relative;
            }
            .modal-content img {
                max-width: 100%;
                max-height: 100%;
                border-radius: 10px;
            }
            .modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
                background: none;
                border: none;
            }
        `;
        
        document.head.appendChild(modalStyles);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close modal functionality
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(modalStyles);
            }, 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    // Booking functionality
    function initBooking() {
        const bookButtons = document.querySelectorAll('.btn-warning');
        
        bookButtons.forEach(button => {
            if (button.textContent.includes('Book Now')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    showBookingModal();
                });
            }
        });
    }
    
    function showBookingModal() {
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h3>Book Your Adventure</h3>
                    <form class="booking-form">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="destination">Destination</label>
                            <select id="destination" required>
                                <option value="">Select Destination</option>
                                <option value="shadow-peak">Shadow Peak Canyon</option>
                                <option value="santorini">Santorini Sunset</option>
                                <option value="maldives">Crystal Waters</option>
                                <option value="phi-phi">Phi Phi Islands</option>
                                <option value="great-wall">Great Wall Adventure</option>
                                <option value="sydney">Sydney Harbor</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="dates">Travel Dates</label>
                            <input type="date" id="dates" required>
                        </div>
                        <div class="form-group">
                            <label for="guests">Number of Guests</label>
                            <input type="number" id="guests" min="1" max="10" required>
                        </div>
                        <button type="submit" class="btn btn-warning">Book Now</button>
                    </form>
                </div>
            </div>
        `;
        
        // Add booking modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .booking-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .booking-modal.show {
                opacity: 1;
            }
            .booking-modal .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            }
            .booking-form .form-group {
                margin-bottom: 1rem;
            }
            .booking-form label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
            }
            .booking-form input,
            .booking-form select {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 1rem;
            }
            .booking-form button {
                width: 100%;
                margin-top: 1rem;
            }
        `;
        
        document.head.appendChild(modalStyles);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Handle form submission
        const form = modal.querySelector('.booking-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Booking request submitted successfully!', 'success');
            closeBookingModal();
        });
        
        // Close modal functionality
        const closeBookingModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(modalStyles);
            }, 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeBookingModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBookingModal();
            }
        });
    }
    
    // Initialize booking functionality
    initBooking();
    
    // Performance optimization: Lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[src*="unsplash"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Add loading animation for images
    const imageLoadingStyles = document.createElement('style');
    imageLoadingStyles.textContent = `
        img {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(imageLoadingStyles);
    
    // Preload critical images
    const criticalImages = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Add scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS variables to scroll to top button
    const scrollToTopStyles = document.createElement('style');
    scrollToTopStyles.textContent = `
        .scroll-to-top:hover {
            background-color: #e8690b !important;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(scrollToTopStyles);
    
    console.log('Globe Heaven website initialized successfully!');
}); 