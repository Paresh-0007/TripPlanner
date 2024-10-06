document.addEventListener("DOMContentLoaded", () => {
  const itineraryData = JSON.parse(localStorage.getItem("itineraryData"));

  if (itineraryData) {
    const itineraryContainer = document.getElementById("itinerary-results");
    itineraryContainer.innerHTML = ""; // Clear any previous results

    // Loop through the itinerary array and display each day's plan
    itineraryData.itinerary.forEach((dayPlan, index) => {
      const infoContainer = document.createElement("div");
      infoContainer.classList.add("info-container");
      infoContainer.id = `day-plan-${index + 1}`; // Unique ID for each day's plan

      infoContainer.innerHTML = `
          <h2 class="day-title">Day ${index + 1}: ${dayPlan.place}</h2>
          <div class="info-section" id="accommodation-${index + 1}">
              <strong>Accommodation:</strong>
              <p>${dayPlan.accomodation.address_line1}, ${
        dayPlan.accomodation.address_line2
      }</p>
          </div>
          <div class="info-section" id="airport-${index + 1}">
              <strong>Airport:</strong>
              <p>${dayPlan.airport.name || "N/A"}, ${
        dayPlan.airport.address_line1 || ""
      }, ${dayPlan.airport.address_line2 || ""}</p>
          </div>
          <div class="info-section" id="bus-stop-${index + 1}">
              <strong>Bus Stop:</strong>
              <p>${dayPlan.bus.name || "N/A"}, ${
        dayPlan.bus.address_line1 || ""
      }, ${dayPlan.bus.address_line2 || ""}</p>
          </div>
          <div class="info-section" id="hospital-${index + 1}">
              <strong>Hospital:</strong>
              <p>${dayPlan.hospital.name || "N/A"}, ${
        dayPlan.hospital.address_line1 || ""
      }, ${dayPlan.hospital.address_line2 || ""}, ${
        dayPlan.hospital.contact || ""
      }</p>
          </div>
          <div class="info-section" id="police-station-${index + 1}">
              <strong>Police Station:</strong>
              <p>${dayPlan.police.name || "N/A"}, ${
        dayPlan.police.address_line1 || ""
      }, ${dayPlan.police.address_line2 || ""}, ${
        dayPlan.police.contact || ""
      }</p>
          </div>
          <div class="info-section" id="parking-${index + 1}">
              <strong>Parking:</strong>
              <p>${dayPlan.parking.address_line1 || "N/A"}, ${
        dayPlan.parking.address_line2 || ""
      }</p>
          </div>
          <div class="info-section" id="cafe-restaurant-${index + 1}">
              <strong>Nearby Cafe/Restaurant:</strong>
              <p>${dayPlan.nearbyCafeResto.name || "N/A"}, ${
        dayPlan.nearbyCafeResto.address_line1 || ""
      }, ${dayPlan.nearbyCafeResto.address_line2 || ""}</p>
          </div>
        `;

      itineraryContainer.appendChild(infoContainer);
    });
  } else {
    console.log("No itinerary data found.");
  }
});
