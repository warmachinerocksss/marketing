// Array of image sources
const images = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png"
];

// Array of corresponding solar offsets (example values in tons of CO2 saved)
const solarOffsets = [
    "5 tons of CO2 saved",
    "10 tons of CO2 saved",
    "15 tons of CO2 saved",
    "20 tons of CO2 saved",
    "25 tons of CO2 saved",
    "30 tons of CO2 saved"
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

// Create the solar offset display container
const offsetDisplay = document.createElement('div');
offsetDisplay.style.position = 'fixed';
offsetDisplay.style.bottom = '20px';
offsetDisplay.style.left = '50%';
offsetDisplay.style.transform = 'translateX(-50%)';
offsetDisplay.style.padding = '10px 20px';
offsetDisplay.style.backgroundColor = '#ffffff';
offsetDisplay.style.color = '#1e2d3b';
offsetDisplay.style.fontSize = '1.5rem';
offsetDisplay.style.borderRadius = '5px';
offsetDisplay.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
offsetDisplay.innerText = solarOffsets[0]; // Initialize with the first offset
document.body.appendChild(offsetDisplay);

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

    // If it's the last slide, add a download button
    if (index === images.length - 1) {
        const downloadButton = document.createElement('a');
        downloadButton.href = 'IntoCharge-Marketing-Proposal.pdf'; // Ensure this matches the actual file name and path
        downloadButton.download = 'IntoCharge-Marketing-Proposal.pdf'; // Name of the file when downloaded
        downloadButton.innerText = 'Download Proposal';
        downloadButton.style.position = 'absolute';
        downloadButton.style.bottom = '50px';
        downloadButton.style.left = '50%';
        downloadButton.style.transform = 'translateX(-50%)';
        downloadButton.style.padding = '10px 20px';
        downloadButton.style.backgroundColor = '#00ff9c';
        downloadButton.style.color = '#1e2d3b';
        downloadButton.style.fontSize = '1.5rem';
        downloadButton.style.textDecoration = 'none';
        downloadButton.style.borderRadius = '5px';
        downloadButton.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        downloadButton.style.transition = 'background-color 0.3s ease';

        downloadButton.addEventListener('mouseover', function () {
            downloadButton.style.backgroundColor = '#00d88c';
        });

        downloadButton.addEventListener('mouseout', function () {
            downloadButton.style.backgroundColor = '#00ff9c';
        });

        slide.appendChild(downloadButton);
    }

    slideshowContainer.appendChild(slide);
});

// Get all slides
const slides = slideshowContainer.children;
let totalSlides = slides.length;

// Function to show the current slide based on scroll position and update solar offset
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
        offsetDisplay.innerText = solarOffsets[currentSlide]; // Update solar offset
    }
}

// Initial display of the first slide
showSlideOnScroll();

// Add scroll event listener
window.addEventListener('scroll', showSlideOnScroll);

// Your existing slideshow JS code here

// Add this at the end of your existing JS file
function calculateCarbonSavings() {
    const energyUsage = parseFloat(document.getElementById('energyUsage').value);
    const solarOutput = parseFloat(document.getElementById('solarOutput').value);
    const panelSize = parseFloat(document.getElementById('panelSize').value);

    if (isNaN(energyUsage) || isNaN(solarOutput) || isNaN(panelSize)) {
        document.getElementById('result').textContent = 'Please fill in all fields with valid numbers.';
        return;
    }

    const totalSolarEnergy = panelSize * solarOutput;
    const carbonSavings = totalSolarEnergy * 0.92;

    document.getElementById('result').textContent = `Your solar installation can save approximately ${carbonSavings.toFixed(2)} kg of CO2 per year.`;
}

document.getElementById('calculateSavings').addEventListener('click', calculateCarbonSavings);

