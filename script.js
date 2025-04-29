document.addEventListener('DOMContentLoaded', () => {
    // Navigation toggle for mobile
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.climbing-hold');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');

            // Toggle hamburger icon
            const icon = burgerMenu.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');

                // Reset hamburger icon
                const icon = burgerMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Climbing hold click effect
    navItems.forEach(hold => {
        hold.addEventListener('mousedown', () => {
            hold.style.transform = 'translateY(2px) scale(0.98)';
            hold.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
        });

        hold.addEventListener('mouseup', () => {
            if (hold.classList.contains('active')) {
                hold.style.transform = 'translateY(-3px)';
                hold.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
            } else {
                hold.style.transform = '';
                hold.style.boxShadow = '';
            }
        });

        hold.addEventListener('mouseleave', () => {
            if (!hold.classList.contains('active')) {
                hold.style.transform = '';
                hold.style.boxShadow = '';
            }
        });
    });

    // Fix for mobile devices (touch events)
    navItems.forEach(hold => {
        hold.addEventListener('touchstart', (e) => {
            e.preventDefault();
            hold.style.transform = 'translateY(2px) scale(0.98)';
            hold.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
        });

        hold.addEventListener('touchend', () => {
            if (hold.classList.contains('active')) {
                hold.style.transform = 'translateY(-3px)';
                hold.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
            } else {
                hold.style.transform = '';
                hold.style.boxShadow = '';
            }

            // This simulates a click for accessibility
            hold.click();
        });
    });

    // GameBoy button press effects
    const gameButtons = document.querySelectorAll('.btn-a, .btn-b, .btn-start, .btn-select, .d-pad-up, .d-pad-right, .d-pad-down, .d-pad-left');

    gameButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
            button.style.opacity = '0.9';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = '';
            button.style.opacity = '';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.opacity = '';
        });
    });

    // Add a class to body when scrolled
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    // Improved active navigation state on scroll
    const sections = document.querySelectorAll('section');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        // Find the current section
        let currentSection = null;
        let minDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const distance = Math.abs(scrollPosition - (sectionTop + sectionHeight / 2));

            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section;
            }
        });

        // Check for bottom of page
        const bottomOfPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;

        // Set active nav item
        if (bottomOfPage) {
            // If we're at the bottom, highlight the contact section
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#contact') {
                    item.classList.add('active');
                }
            });
        } else if (currentSection) {
            const currentId = currentSection.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentId}`) {
                    item.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);

    // Call it once on page load
    setTimeout(updateActiveNav, 100);

    // Type animation for hero section
    const animateText = document.querySelector('.animate-text');
    if (animateText) {
        const text = animateText.textContent;
        animateText.textContent = '';

        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                animateText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }

    // Project hover effect
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll for nav links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active class manually
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Form submission for GameBoy
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill out all fields');
                return;
            }

            // For now, just log and show success message
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! I will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }
});