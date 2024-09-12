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
slideshowContainer.style.position = 'fixed';
slideshowContainer.style.top = '0';
slideshowContainer.style.left = '0';
slideshowContainer.style.width = '100%';
slideshowContainer.style.height = '100vh';
slideshowContainer.style.overflow = 'hidden';
document.body.appendChild(slideshowContainer);

// Function to create and style slides
images.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.style.position = 'absolute';
    slide.style.width = '100%';
    slide.style.height = '100%';
    slide.style.top = '0';
    slide.style.left = '0';
    slide.style.opacity = '0';
    slide.style.transition = 'opacity 1s ease-in-out';

    const img = document.createElement('img');
    img.src = src;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';

    slide.appendChild(img);

    // If it's the last slide, add a link to the Solar Offset Calculator
    if (index === images.length - 1) {
        const calculatorLink = document.createElement('a');
        calculatorLink.href = 'https://solar-offset-calculator.vercel.app';
        calculatorLink.target = '_blank';  // Open in a new tab
        calculatorLink.innerText = 'Go to Solar Offset Calculator';
        calculatorLink.style.position = 'absolute';
        calculatorLink.style.bottom = '50px';
        calculatorLink.style.left = '50%';
        calculatorLink.style.transform = 'translateX(-50%)';
        calculatorLink.style.padding = '10px 20px';
        calculatorLink.style.backgroundColor = '#00ff9c';
        calculatorLink.style.color = '#1e2d3b';
        calculatorLink.style.fontSize = '1.5rem';
        calculatorLink.style.textDecoration = 'none';
        calculatorLink.style.borderRadius = '5px';
        calculatorLink.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        calculatorLink.style.transition = 'background-color 0.3s ease';

        calculatorLink.addEventListener('mouseover', function() {
            calculatorLink.style.backgroundColor = '#00d88c';
        });

        calculatorLink.addEventListener('mouseout', function() {
            calculatorLink.style.backgroundColor = '#00ff9c';
        });

        slide.appendChild(calculatorLink);
    }

    slideshowContainer.appendChild(slide);
});

// Get all slides
const slides = slideshowContainer.children;
let totalSlides = slides.length;

console.log("Total Slides: ", totalSlides);  // Debugging line

// Function to show the current slide based on scroll position
function showSlideOnScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    let totalHeight = document.documentElement.scrollHeight - windowHeight;

    console.log("Scroll Position: ", scrollPosition);
    console.log("Total Height: ", totalHeight);

    // Fallback to avoid NaN in case of small or no content height
    if (totalHeight <= 0) {
        totalHeight = windowHeight;
    }

    const scrollFraction = scrollPosition / totalHeight;

    console.log("Scroll Fraction: ", scrollFraction);

    const currentSlide = Math.min(
        Math.floor(scrollFraction * totalSlides),
        totalSlides - 1
    );

    console.log("Current Slide Index: ", currentSlide);  // Debugging line

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = '0';
    }

    if (!isNaN(currentSlide) && slides[currentSlide]) {  // Check if the slide exists and index is not NaN
        slides[currentSlide].style.opacity = '1';
    } else {
        console.error("Slide at index ", currentSlide, " is undefined.");
    }
}

// Initial display of the first slide
showSlideOnScroll();

// Add scroll event listener
window.addEventListener('scroll', showSlideOnScroll);
