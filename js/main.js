// Main JavaScript for Website

document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger animation
            const hamburger = this.querySelector('.hamburger');
            hamburger.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                hamburger.style.background = 'transparent';
                hamburger.style.transform = 'rotate(45deg)';
                hamburger.style.transition = 'all 0.3s ease';
                
                hamburger.style.before = 'transform: rotate(90deg)';
                hamburger.style.after = 'transform: rotate(90deg)';
            } else {
                hamburger.style.background = '';
                hamburger.style.transform = '';
                hamburger.style.transition = '';
                
                hamburger.style.before = '';
                hamburger.style.after = '';
            }
        });
    }
    
    // Mobile Dropdown Toggle
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only handle click for mobile view
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                dropdownMenu.classList.toggle('show');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const hamburger = navToggle.querySelector('.hamburger');
            hamburger.classList.remove('active');
            hamburger.style.background = '';
            hamburger.style.transform = '';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip for dropdown toggles in mobile view
            if (targetId === '#' && window.innerWidth <= 768) {
                return;
            }
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-category, .project-card, .article-card, .certification-card, .achievement-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize elements for animation
    const elementsToAnimate = document.querySelectorAll('.skill-category, .project-card, .article-card, .certification-card, .achievement-item');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Form validation for contact form
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                document.getElementById('name-error').textContent = 'Name is required';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                document.getElementById('email-error').textContent = 'Valid email is required';
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                document.getElementById('message-error').textContent = 'Message is required';
                isValid = false;
            }
            
            if (isValid) {
                // Show success message (in a real implementation, this would submit the form)
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Project filtering functionality
    const projectFilters = document.querySelectorAll('.project-filter');
    
    if (projectFilters.length > 0) {
        projectFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                projectFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                const category = this.getAttribute('data-filter');
                const projectItems = document.querySelectorAll('.project-card');
                
                projectItems.forEach(item => {
                    if (category === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.classList.contains(category)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    

    // --- Project Details Modal Logic ---
    const projectsGrid = document.querySelector('.projects-grid');
    const modal = document.getElementById('project-details-modal');
    const modalBody = modal ? modal.querySelector('.modal-body') : null;
    const closeModalButton = modal ? modal.querySelector('.close-modal') : null;

    if (projectsGrid && modal && modalBody && closeModalButton) {

        // --- Event Listener for Detail Buttons (using event delegation) ---
        projectsGrid.addEventListener('click', function(event) {
            // Check if the clicked element is a details button or inside one
            const detailsButton = event.target.closest('.project-details-btn');

            if (detailsButton) {
                event.preventDefault(); // Prevent any default button behavior

                const projectId = detailsButton.getAttribute('data-project');
                if (!projectId) {
                    console.error('Details button is missing data-project attribute.');
                    return;
                }

                const detailsContentElement = document.getElementById(`${projectId}-details`);
                if (!detailsContentElement) {
                    console.error(`Could not find details content element with ID: #${projectId}-details`);
                    modalBody.innerHTML = '<p>Error: Project details not found.</p>'; // Show error in modal
                    modal.classList.add('active'); // Still show modal to indicate an error
                    document.body.classList.add('modal-open');
                    return;
                }

                // --- Inject content and show modal ---
                modalBody.innerHTML = detailsContentElement.innerHTML; // Copy the HTML content
                modal.classList.add('active'); // Make the modal visible
                document.body.classList.add('modal-open'); // Prevent body scroll
            }
        });

        // --- Function to close the modal ---
        function closeModal() {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
            // Clear content after fade out transition completes (match CSS transition duration)
            setTimeout(() => {
                 if (!modal.classList.contains('active')) { // Check if it wasn't reopened quickly
                    modalBody.innerHTML = ''; // Clear the injected content
                 }
            }, 300); // Adjust timing based on your CSS modal fade-out duration
        }

        // --- Event Listener for Close Button ---
        closeModalButton.addEventListener('click', closeModal);

        // --- Event Listener for Clicking Modal Background ---
        modal.addEventListener('click', function(event) {
            // If the click is directly on the modal overlay (not children like modal-content)
            if (event.target === modal) {
                closeModal();
            }
        });

        // --- Event Listener for Escape Key ---
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                if (modal.classList.contains('active')) {
                    closeModal();
                }
            }
        });

    } else {
        // Log error if essential elements are missing
        if (!projectsGrid) console.error('Project grid container (.projects-grid) not found.');
        if (!modal) console.error('Modal element (#project-details-modal) not found.');
        if (!modalBody) console.error('Modal body element (.modal-body) not found inside the modal.');
        if (!closeModalButton) console.error('Modal close button (.close-modal) not found inside the modal.');
    }

    
    // Skills tab functionality
    const skillsTabs = document.querySelectorAll('.skills-tab');
    
    if (skillsTabs.length > 0) {
        skillsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                skillsTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const skillsContents = document.querySelectorAll('.skills-content');
                
                skillsContents.forEach(content => {
                    if (content.getAttribute('data-category') === category) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial-item');
        const totalTestimonials = testimonials.length;
        let currentIndex = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('span');
            dot.className = 'testimonial-dot';
            if (i === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', function() {
                showTestimonial(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        testimonialSlider.appendChild(dotsContainer);
        
        // Create navigation arrows
        const prevButton = document.querySelector('.testimonial-prev');
        const nextButton = document.querySelector('.testimonial-next');
        
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
                showTestimonial(currentIndex);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalTestimonials;
                showTestimonial(currentIndex);
            });
        }
        
        // Function to show testimonial by index
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                if (i === index) {
                    testimonial.style.display = 'block';
                } else {
                    testimonial.style.display = 'none';
                }
            });
            
            // Update active dot
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            currentIndex = index;
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    
    if (skillBars.length > 0) {
        const animateSkillBars = function() {
            skillBars.forEach(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (barPosition < windowHeight - 50) {
                    const percentage = bar.getAttribute('data-percentage');
                    bar.querySelector('.skill-progress').style.width = percentage + '%';
                }
            });
        };
        
        // Run animation on load and scroll
        animateSkillBars();
        window.addEventListener('scroll', animateSkillBars);
    }
    
    // Handle verification links for certifications
    const verifyLinks = document.querySelectorAll('.certification-verify');
    
    if (verifyLinks.length > 0) {
        verifyLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // In a real implementation, this would redirect to the verification page
                alert('This would redirect to the certification verification page. For this demo, the link is disabled.');
            });
        });
    }
});