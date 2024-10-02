let currentSlide = 0;
const slides = document.querySelectorAll(".slider-images img");
const totalSlides = slides.length;
const dots = document.querySelectorAll(".dot");

const autoSlide = setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}, 2500);

document.querySelector(".next").addEventListener("click", () => {
  clearInterval(autoSlide);
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
});

document.querySelector(".prev").addEventListener("click", () => {
  clearInterval(autoSlide); 
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(autoSlide);
    currentSlide = index;
    updateSlider();
  });
});

function updateSlider() {
  document.querySelector(".slider-images").style.transform = `translateX(-${
    currentSlide * 100
  }%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

updateSlider();
