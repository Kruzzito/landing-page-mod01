
tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['Inter', 'sans-serif'] },
            colors: {
                'primary': '#a3003e',
                'primary-dark': '#8e0037',
                'secondary': '#e6a57c',
                'bg-light': '#fef7f9',
            }
        }
    }
}

let currentSlide = 0;
let totalSlides = 0;
const sliderWrapper = document.getElementById('slider-wrapper');
const sliderDotsContainer = document.getElementById('slider-dots');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

function showNotification(msg) {
    const box = document.getElementById('message-box');
    const text = document.getElementById('message-text');
    
    text.textContent = msg;
    box.classList.remove('translate-x-full');
    box.classList.add('translate-x-0');

    setTimeout(() => {
        box.classList.remove('translate-x-0');
        box.classList.add('translate-x-full');
    }, 3000);
}

function updateSlider() {
    const offset = -currentSlide * (100 / totalSlides);
    sliderWrapper.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function createDots() {
    sliderDotsContainer.innerHTML = ''; 
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'w-3 h-3 rounded-full bg-white opacity-50 hover:opacity-100 transition duration-300';
        dot.onclick = () => { currentSlide = i; updateSlider(); };
        sliderDotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateDots() {
    const dots = sliderDotsContainer.querySelectorAll('button');
    dots.forEach((dot, i) => {
        dot.classList.toggle('opacity-100', i === currentSlide);
        dot.classList.toggle('opacity-50', i !== currentSlide);
    });
}

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconOpen = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

function toggleMobileMenu() {
    const isHidden = mobileMenu.classList.toggle('hidden');
    menuIconOpen.classList.toggle('hidden', !isHidden);
    menuIconClose.classList.toggle('hidden', isHidden);
}

window.onload = () => {
    const slides = document.querySelectorAll('.slider-item');
    totalSlides = slides.length;

    if (totalSlides > 0) {
        createDots();
        setInterval(nextSlide, 5000); 
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    const form = document.getElementById('lead-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-button');
        const txt = document.getElementById('button-text');
        const spinner = document.getElementById('spinner');

        btn.disabled = true;
        txt.classList.add('hidden');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            showNotification("¡Cita solicitada! Pronto nos contactaremos contigo.");
            btn.disabled = false;
            txt.classList.remove('hidden');
            spinner.classList.add('hidden');
            form.reset();
        }, 1500);
    });
};