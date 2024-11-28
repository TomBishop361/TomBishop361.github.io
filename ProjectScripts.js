let currentImageIndex = 0;

// Array of image paths
const images = [
    "PressurePoint/PressurePointMain.png", // Main image
    "PressurePoint/PP1.png",               // Additional Image 1
    "PressurePoint/PP2.png",               // Additional Image 2
    "PressurePoint/PP3.png"                // Additional Image 3
];

// Function to open the modal with the clicked image
function openModal(index) {
    currentImageIndex = index; // Set the current image index
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = images[currentImageIndex]; // Set the source of the modal image
    modal.style.display = "flex"; // Display the modal
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none"; // Hide the modal
}

// Function to change the image when clicking next or previous
function changeImage(direction) {
    currentImageIndex += direction; // Change the index based on direction

    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Wrap around to the last image
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Wrap around to the first image
    }

    const modalImage = document.getElementById('modalImage');
    modalImage.src = images[currentImageIndex]; // Update the modal image
}
