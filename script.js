// Array of image sources
const images = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png"
];

// Create the slideshow container
const slideshowContainer = document.createElement('div');
slideshowContainer.classList.add('slideshow-container');
document.body.appendChild(slideshowContainer);

// Function to create and style slides
images.forEach((src, index) => {
    const slide = document.createElement('div');

    const img = document.createElement('img');
    img.src = src;

    slide.appendChild(img);

    // If it's the last slide, add a calculator link button
    if (index === images.length - 1) {
        const calculatorLink = document.createElement('a');
        calculatorLink.href = '#';
        calculatorLink.innerText = 'Go to Solar Offset Calculator';
        calculatorLink.classList.add('calculator-link');

        calculatorLink.addEventListener('click', function () {
            window.scrollTo({
                top: document.querySelector('.solar-calculator').offsetTop,
                behavior: 'smooth'
            });
        });

        slide.appendChild(calculatorLink);
    }

    slideshowContainer.appendChild(slide);
});

// Get all slides
const slides = slideshowContainer.children;
let totalSlides = slides.length;

// Function to show the current slide based on scroll position
function showSlideOnScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    let totalHeight = document.documentElement.scrollHeight - windowHeight;

    if (totalHeight <= 0) {
        totalHeight = windowHeight;
    }

    const scrollFraction = scrollPosition / totalHeight;

    const currentSlide = Math.min(
        Math.floor(scrollFraction * totalSlides),
        totalSlides - 1
    );

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = '0';
    }

    if (!isNaN(currentSlide) && slides[currentSlide]) {
        slides[currentSlide].style.opacity = '1';
    }
}

// Initial display of the first slide
showSlideOnScroll();

// Add scroll event listener
window.addEventListener('scroll', showSlideOnScroll);
