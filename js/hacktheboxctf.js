document.addEventListener('DOMContentLoaded', function() {

    // --- Image Carousel Modal Logic ---
    const openCarouselButton = document.getElementById('hacktheboxbtn');
    const carouselModal = document.getElementById('imageCarouselModal1');
    const closeCarouselButton = carouselModal.querySelector('.carousel-close-btn');
    const carouselImage = document.getElementById('carouselImage1');
    const prevArrow = carouselModal.querySelector('.prev-arrow');
    const nextArrow = carouselModal.querySelector('.next-arrow');
    const currentImageIndexSpan = document.getElementById('currentImageIndex1');
    const totalImageCountSpan = document.getElementById('totalImageCount1');

    // Define image sources here
    const carouselImages = [
        '../images/CyberCTFHTB2022.png',
        '../images/CyberCTFHTB2023.png',
        '../images/CyberCTFHTB2024.png', 
        '../images/UniCTFHTB2024.png',
        '../images/CyberCTFHTB2025.png',
    ];

    let currentImageIndex = 0;
    let isModalOpen = false;

    // --- Function to Update Image and UI ---
    function showImage(index) {
        if (index < 0 || index >= carouselImages.length) {
            console.error('Invalid image index:', index);
            return;
        }

        carouselImage.classList.add('loading'); // Start fade out effect

        setTimeout(() => { // Allow fade out transition to start
            carouselImage.src = carouselImages[index];
            carouselImage.alt = `Carousel Image ${index + 1}`; // Update alt text

            // Once image is potentially loaded (or after short delay), fade in
            // A more robust solution would use the image's 'onload' event
             setTimeout(() => {
                 carouselImage.classList.remove('loading'); // Start fade in effect
             }, 50); // Small delay

            currentImageIndex = index;

            // Update counter
            if (currentImageIndexSpan) currentImageIndexSpan.textContent = index + 1;

            // Update arrow states
            if (prevArrow) prevArrow.disabled = (index === 0);
            if (nextArrow) nextArrow.disabled = (index === carouselImages.length - 1);

        }, 250); // Matches half the CSS transition duration for opacity
    }

    // --- Function to Open Modal ---
    function openModal() {
        if (!carouselModal || carouselImages.length === 0) return;

        // Set total count
        if (totalImageCountSpan) totalImageCountSpan.textContent = carouselImages.length;

        // Show the first image
        showImage(0);

        // Show modal with animation
        carouselModal.classList.add('active');
        document.body.classList.add('modal-open'); // Prevent body scroll
        isModalOpen = true;

        // Add keyboard navigation listener
        document.addEventListener('keydown', handleKeyboardNav);
    }

    // --- Function to Close Modal ---
    function closeModal() {
        if (!carouselModal) return;

        carouselModal.classList.remove('active');
        document.body.classList.remove('modal-open'); // Restore body scroll
        isModalOpen = false;

        // Remove keyboard navigation listener
        document.removeEventListener('keydown', handleKeyboardNav);

        // Optional: Reset to first image for next time?
        // currentImageIndex = 0;
    }

    // --- Event Listeners ---
    if (openCarouselButton) {
        openCarouselButton.addEventListener('click', openModal);
    }

    if (closeCarouselButton) {
        closeCarouselButton.addEventListener('click', closeModal);
    }

    // Close modal if clicking on the background overlay
    if (carouselModal) {
        carouselModal.addEventListener('click', (event) => {
            // Check if the click is directly on the modal overlay (not its children)
            if (event.target === carouselModal) {
                closeModal();
            }
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            if (currentImageIndex < carouselImages.length - 1) {
                showImage(currentImageIndex + 1);
            }
        });
    }

    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            if (currentImageIndex > 0) {
                showImage(currentImageIndex - 1);
            }
        });
    }

    // --- Keyboard Navigation ---
    function handleKeyboardNav(event) {
         if (!isModalOpen) return;

         if (event.key === 'ArrowRight' || event.key === 'Right') {
             if (currentImageIndex < carouselImages.length - 1) {
                 showImage(currentImageIndex + 1);
             }
         } else if (event.key === 'ArrowLeft' || event.key === 'Left') {
             if (currentImageIndex > 0) {
                 showImage(currentImageIndex - 1);
             }
         } else if (event.key === 'Escape' || event.key === 'Esc') {
             closeModal();
         }
    }

    // --- Initialize ---
    // Ensure arrows are correctly disabled if only one image exists on load (or if modal opens initially)
     if (totalImageCountSpan && carouselImages.length > 0) {
         totalImageCountSpan.textContent = carouselImages.length;
         if (carouselImages.length <= 1) {
             if(prevArrow) prevArrow.disabled = true;
             if(nextArrow) nextArrow.disabled = true;
         }
     } else if (carouselImages.length === 0) {
        // Handle case with no images
         if (openCarouselButton) openCarouselButton.disabled = true; // Disable trigger button
         console.warn("Carousel images array is empty.");
     }

}); // End DOMContentLoaded