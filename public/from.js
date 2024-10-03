const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');

priceRange.addEventListener('input', function() {
    priceValue.textContent = this.value;
})


// Get the button and popup elements
const openPopupBtn = document.getElementById('openPopupBtn');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close');

// Function to show the popup
openPopupBtn.addEventListener('click', function() {
    popup.style.display = 'flex';
});

// Function to hide the popup when clicking the close button
closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
});

// Hide the popup when clicking outside the popup content
window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});
