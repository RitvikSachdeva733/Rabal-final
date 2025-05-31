document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    document.querySelector('.mobile-menu').addEventListener('click', () => {
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.toggle('active'); // Toggle active class on mobile menu
    });

    // Close Mobile Menu When a Link is Clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scroll with Centering
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href'); // Get the target section ID
            const targetSection = document.querySelector(targetId); // Find the target section

            if (targetSection) {
                // Scroll to the target section and center it in the viewport
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center' // Center the section vertically
                });
            }
        });
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const navLinks = document.querySelectorAll('.nav-links a');
        const logo = document.querySelector('.logo');
        const logoSubtext = document.querySelector('.logo p');
        const mobileMenu = document.querySelector('.mobile-menu'); // Select the mobile menu icon

        // Get CSS variable values
        const textDark = getComputedStyle(document.documentElement).getPropertyValue('--text-dark').trim();
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

        if (window.scrollY > 100) {
            // When scrolled past 100px
            header.style.background = '#ffffff';
            header.style.color = textDark; // Use CSS variable value
            navLinks.forEach(link => link.style.color = textDark); // Use CSS variable value
            logo.style.color = primaryColor; // Use CSS variable value
            logoSubtext.style.color = primaryColor;  
            mobileMenu.style.color = textDark; // Change mobile menu icon color
        } else {
            // When at the top of the page
            header.style.background = 'transparent';
            header.style.color = '#ffffff';
            navLinks.forEach(link => link.style.color = '#ffffff');
            logo.style.color = '#ffffff';
            logoSubtext.style.color = '#ffffff'; 
            mobileMenu.style.color = '#ffffff'; // Reset mobile menu icon color
        }
    });

    function animateGrowersCount(element, start, end, duration) {
        let range = end - start;
        let interval = 20; // Update every 20ms for a smooth effect
        let totalSteps = duration / interval;
        let step = Math.ceil(range / totalSteps);
        let current = start;

        let timer = setInterval(function () {
            current += step;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = current.toLocaleString(); // Format with commas
        }, interval);
    }

    function isElementInViewport(el) {
        let rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    }

    let growersCountElement1 = document.getElementById('growersCount1');
    let growersCountElement2 = document.getElementById('growersCount2');
    let animationStarted1 = false; // Prevents multiple animations for the first container
    let animationStarted2 = false; // Prevents multiple animations for the second container

    function onScroll() {
        if (!animationStarted1 && isElementInViewport(growersCountElement1)) {
            animationStarted1 = true;
            animateGrowersCount(growersCountElement1, 0, 12500, 3500); // Runs for 3.5 sec
        }

        if (!animationStarted2 && isElementInViewport(growersCountElement2)) {
            animationStarted2 = true;
            animateGrowersCount(growersCountElement2, 0, 12500, 3500); // Runs for 3.5 sec
        }
    }

    window.addEventListener('scroll', onScroll); // Attach scroll event

    // // Initialize Swiper
    // const swiper = new Swiper('.swiper-container', {
    //     loop: true, // Infinite loop
    //     pagination: {
    //         el: '.swiper-pagination',
    //         clickable: true,
    //     },
    //     autoplay: {
    //         delay: 5000, // Auto-slide every 5 seconds
    //     },
    //     breakpoints: {
    //         // When window width is >= 320px
    //         320: {
    //             slidesPerView: 1,
    //             spaceBetween: 10,
    //         },
    //         // When window width is >= 768px
    //         768: {
    //             slidesPerView: 1,
    //             spaceBetween: 20,
    //         },
    //         // When window width is >= 1024px
    //         1024: {
    //             slidesPerView: 1,
    //             spaceBetween: 30,
    //         },
    //     },
    // });
    // Initialize Carousel with Autoplay
    // Initialize the carousel with autoplay
    const carouselElement = document.getElementById('bannerCarousel');
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000, // Autoplay every 3 seconds (adjust as needed)
        wrap: true, // Enable infinite loop
    });

    // Variable to store the autoplay interval
    let autoplayInterval;

    // Function to start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            carousel.next(); // Move to the next slide
        }, 5000); // Autoplay interval (3 seconds)
    }

    // Function to pause autoplay
    function pauseAutoplay() {
        clearInterval(autoplayInterval); // Stop the autoplay
    }

    // Start autoplay initially
    startAutoplay();

    // Add click event listener to the carousel
    carouselElement.addEventListener('click', () => {
        pauseAutoplay(); // Pause autoplay on click

        // Resume autoplay after 10 seconds
        setTimeout(() => {
            startAutoplay();
        }, 10000); // 10 seconds delay
    });

    // Dropdown Arrow Rotation
    const productsLink = document.querySelector('.products-link');
    const arrow = document.querySelector('.arrow');

    if (productsLink && arrow) {
        productsLink.addEventListener('mouseenter', () => {
            arrow.style.transform = 'rotate(180deg)';
        });

        productsLink.addEventListener('mouseleave', () => {
            arrow.style.transform = 'rotate(0deg)';
        });
    }
    
    // Partners Section Functionality
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        // Calculate the width needed for seamless looping
        const logos = partnersTrack.querySelectorAll('.partner-card');
        const logoWidth = logos[0].offsetWidth + 50; // Width + margin
        
        // Set the track width to accommodate all logos twice for seamless looping
        partnersTrack.style.width = `${logoWidth * logos.length}px`;

        // Pause animation on hover
        const partnersMarquee = document.querySelector('.partners-marquee');
        if (partnersMarquee) {
            partnersMarquee.addEventListener('mouseenter', () => {
                partnersTrack.style.animationPlayState = 'paused';
            });

            partnersMarquee.addEventListener('mouseleave', () => {
                partnersTrack.style.animationPlayState = 'running';
            });
        }

        // Make partner cards clickable (optional)
        // logos.forEach(logo => {
        //     logo.style.cursor = 'pointer';
        //     logo.addEventListener('click', () => {
        //         // You can add specific actions when a partner logo is clicked
        //         console.log(`Clicked on ${logo.querySelector('.partner-name').textContent}`);
        //     });
        // });
    }

    // Responsive adjustments for partners section
    function adjustPartnersLayout() {
        if (!partnersTrack) return;
        
        const logos = partnersTrack.querySelectorAll('.partner-card');
        const screenWidth = window.innerWidth;
        let logoMargin;

        if (screenWidth >= 992) {
            logoMargin = 25;
        } else if (screenWidth >= 768) {
            logoMargin = 20;
        } else if (screenWidth >= 576) {
            logoMargin = 15;
        } else {
            logoMargin = 10;
        }

        // Update margin for all logos
        logos.forEach(logo => {
            logo.style.margin = `0 ${logoMargin}px`;
        });

        // Recalculate track width
        const logoWidth = logos[0].offsetWidth + (logoMargin * 2);
        partnersTrack.style.width = `${logoWidth * logos.length}px`;
    }

    // Run on load and resize
    window.addEventListener('load', adjustPartnersLayout);
    window.addEventListener('resize', adjustPartnersLayout);

    // Gallery Masonry Scroll Animation
    // ----------------------------
    const galleryItems = document.querySelectorAll('.gallery-item');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        galleryItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for older browsers
        galleryItems.forEach(item => item.classList.add('show'));
    }

    // === NEW FEATURE 1: Scrollable Product Card Indicator on Hover ===
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.scrollHeight > card.clientHeight) {
                card.classList.add('scrollable');
            }
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('scrollable');
        });
    });

    

});