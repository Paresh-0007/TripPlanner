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

const fillPlaceData = function (placeData) {
  var name = document.getElementById('name')
  var img1 = document.getElementById('img1')
  var img2 = document.getElementById('img2')
  var img3 = document.getElementById('img3')
  var img4 = document.getElementById('img4')
  var descriptionTitle = document.getElementById('descriptionTitle')
  var description = document.getElementById('description')
  var transport = document.getElementById('transport')
  var budget = document.getElementById('budget')
  var bestTime = document.getElementById('bestTime')
  var map = document.getElementById('map')
  var region = document.getElementById('region')
  // console.log(placeData)

  name.innerText = placeData.data.name;
  img1.src = placeData.data.images[0]
  img2.src = placeData.data.images[1]
  img3.src = placeData.data.images[2]
  // img4.src = placeData.data.images[3]

  // img1.style = "height:666px; width:1000px"
  // img2.style = "height:666px; width:1000px"
  // img3.style = "height:666px; width:1000px"
  // console.log(placeData.data.description)
  descriptionTitle.innerText = `About ${placeData.data.name}`
  description.innerText = `${placeData.data.description}`
  transport.innerHTML = `<b>By Car : </b><span>${placeData.data.transportation_modes.car}</span><br><b>By Train : </b><span>${placeData.data.transportation_modes.train}</span><br><b>By Bus : </b><span>${placeData.data.transportation_modes.bus}</span>`
  budget.innerText = `${placeData.data.minimum_budget}`
  bestTime.innerText = `${placeData.data.best_time_to_visit}`
  map.innerHTML = `${placeData.data.location}`
  region.innerText = `${placeData.data.name},${placeData.data.region}`
}

async function fetchPlace(placeId) {
  try {
      const response = await fetch(`/api/places/place/${placeId}`, {
          credentials: 'include'
      });

      if (!response.ok) {
          throw new Error(`Error fetching place: ${response.status}`);
      }

      const placeData = await response.json();
      fillPlaceData(placeData);
  } catch (error) {
      console.error('Failed to fetch place data:', error);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const placeId = urlParams.get('id');

if (placeId) {
  fetchPlace(placeId);
}