document.addEventListener('DOMContentLoaded', () => {
    // toggle for mobile navigation
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.climbing-hold');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');

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

    // Mobile menu closing when link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                // Hamburger icon reset

                const icon = burgerMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Climbing effects on click
    const climbingHolds = document.querySelectorAll('.climbing-hold');

    climbingHolds.forEach(hold => {
        hold.addEventListener('mousedown', () => {
            hold.style.transform = 'translateY(2px) scale(0.98)';
            hold.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
        });

        hold.addEventListener('mouseup', () => {
            if (hold.classList.contains('active')) {
                hold.style.transform = 'translateY(-3px) scale(0.98)';
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

    // Gameboy buttons effects
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


    // Active navigation state on scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;

            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Animate skill badges on scroll
    const skillBadges = document.querySelectorAll('.skill-badge');

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Add entrance animation for skill badges
    skillBadges.forEach((badge, index) => {
        // Set initial state
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';

        // Animate badges when they come into view with a staggered delay
        const animateSkillBadges = () => {
            if (isInViewport(badge)) {
                setTimeout(() => {
                    badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateY(0)';
                }, index * 100); // Staggered delay based on index
                window.removeEventListener('scroll', animateSkillBadges);
            }
        };

        window.addEventListener('scroll', animateSkillBadges);
        // Check on page load for visible badges
        setTimeout(() => {
            animateSkillBadges();
        }, 300);
    });

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

    // Contact form submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validate form
            if (isFormValid(name, email, message)) {
                // You would typically send this data to a server
                // For now, we'll just show a success message and reset the form
                console.log('Form submitted:', { name, email, message });

                // Reset form
                contactForm.reset();

                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
            }
        });
    }

    // Form validation
    function isFormValid(name, email, message) {
        // Check if fields are empty
        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Please fill out all fields before submitting.');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    // Smooth scroll for nav links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});