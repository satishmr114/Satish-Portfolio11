// ========== MOBILE MENU TOGGLE ==========
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ========== SMOOTH SCROLL FOR NAVIGATION LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// ========== CERTIFICATE MODAL FUNCTIONALITY ==========
const modal = document.getElementById('certModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.querySelector('.modal-close');

const certificates = document.querySelectorAll('.certificate-card');

if (certificates.length > 0) {
    certificates.forEach(cert => {
        cert.addEventListener('click', function() {
            const title = this.querySelector('.certificate-title').innerText;
            const issuer = this.querySelector('.certificate-issuer').innerText;
            const date = this.querySelector('.certificate-date').innerText;
            
            if (modalTitle && modalDesc) {
                modalTitle.innerText = title;
                modalDesc.innerHTML = `${issuer}<br>${date}<br><br>Professional certification demonstrating expertise in graphic design and visual communication.`;
            }
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Close modal when clicking on close button
if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modal when clicking outside the modal content
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========== SCROLL ANIMATION WITH INTERSECTION OBSERVER ==========
const animateElements = document.querySelectorAll('.skill-category, .certificate-card, .project-card, .timeline-content, .about-content');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            entry.target.style.opacity = '0';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Make certificate cards visible immediately
document.querySelectorAll('.certificate-card').forEach(card => {
    card.style.opacity = '1';
});

// ========== ADD ANIMATION TO TIMELINE ITEMS ==========
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animation = `fadeInLeft 0.6s ease ${index * 0.2}s forwards`;
    item.style.opacity = '0';
    item.style.animationFillMode = 'forwards';
});

// ========== ACTIVE NAVIGATION LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

// ========== ADD ACTIVE STYLE TO NAVIGATION ==========
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #667eea;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// ========== LOADING COMPLETE MESSAGE ==========
window.addEventListener('load', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add loading animation for images
    const images = document.querySelectorAll('.certificate-image');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});
