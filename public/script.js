const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});


// Price value script

const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');

priceRange.addEventListener('input', function() {
    priceValue.textContent = this.value;
})

// Event listener for opening the popup when the button is clicked
document.getElementById('openPopupBtn').addEventListener('click', function() {
  const popup = document.getElementById('popup');
  popup.classList.add('active'); // Add the 'active' class to show the popup
});

// Event listener for closing the popup when the close button is clicked
document.querySelector('.close').addEventListener('click', function() {
  const popup = document.getElementById('popup');
  popup.classList.remove('active'); // Remove the 'active' class to hide the popup
});

// document.addEventListener("DOMContentLoaded", () => {
//   // Function to fetch user info
//   const fetchUserInfo = async () => {
//     const usernameElement = document.getElementById("username");
//     const profileImageElement = document.getElementById("profileImage");
  
//     try {
//       const response = await fetch('http://localhost:8000/api/users/user-info', {
//         method: 'GET',
//         credentials: 'include',
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const data = await response.json();
//       usernameElement.textContent = `Welcome, ${data.data.name}!`;
//       profileImageElement.src = data.data.avatar || "./images/default-profile.png"; 
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//       usernameElement.textContent = "Guest, Please Log In!";
//       profileImageElement.src = "./images/user.png"; 
//       // Optionally show an error message in the UI
//     }
//   };
//   fetchUserInfo();
// });
 //Fetching User info 


document.addEventListener("DOMContentLoaded", () => {
  // Function to fetch user info
  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/user-info', {
        credentials: 'include' // Use credentials to send cookies with the request
      });

      if (response.ok) {
        const data = await response.json();
        

        // Display username and profile image
        const button = document.getElementById("sign-up");
        const profileImageElement = document.getElementById("profileImage");
        button.innerHTML = "Log Out";
        button.href = "/Login/index.html"
        profileImageElement.src = `${data.data.avatar}`;
        profileImageElement.style = "display:block; height: 50px; border-radius: 50px; "

        button.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default action
    try {
        const response = await fetch('http://localhost:8000/api/users/logout', {
            method: 'POST', 
            credentials: 'include' // Include credentials (cookies) in the request
        });

        if (response.ok) {
            alert("User Logged Out Successfully!");
            // Optionally, redirect to the login page or update the UI
            window.location.href = "/Login/index.html";
        } else {
            alert("Logout failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during logout:", error);
    }
});

      } else {
        //const usernameElement = document.getElementById("username");
        //usernameElement.textContent = "Guest, Please, LogIn!";
        document.getElementById("profileImage").src = "./images/user.png";
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  fetchUserInfo();
});


//Hidden Gems
  const fillGemInfo = (data) =>{
    const fourGems = data.slice(0,4)
    console.log(fourGems)
    var gemGrid = document.getElementById('gemGrid')
    gemGrid.innerHTML =''
    for(var gem of fourGems){
      gemGrid.innerHTML +=`
      <div class="gem-card">
        <img src="${gem.images[0]}" alt="Hidden Gem 1">
        <p class="title">${gem.name}</p>
        <p>${gem.description.substr(0,150)}...</p>
        <a href="./location/place.html?id=${gem._id}" class="read-more-link">Read More</a>
      </div>
      `
    }
  }

  const response = await fetch('http://localhost:8000/api/places/collection', { 
      credentials: 'include' // Include credentials (cookies) in the request
  });

  const data = await response.json()

  if(data){
    fillGemInfo(data)
  }


//FORM
// document.getElementById('itinerary').addEventListener('submit', async function(event) {
//           event.preventDefault(); // Prevent the default form submission

//           const city = document.getElementById('city').value;
//           const days = document.getElementById('no-of-days').value;

//           try {
//             const response = await fetch("/api/generateItinerary/itinerary", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ city, days}),
//             });
//             console.log(await response.json());

//           } catch (error) {
//             console.error("Error logging in:", error);
//           }
//         });


document.getElementById('itinerary').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

  const city = document.getElementById('city').value;
  const days = document.getElementById('no-of-days').value;

  try {
    const response = await fetch("/api/generateItinerary/itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city, days }),
    });

    // Check if the response is valid
    if (!response.ok) {
      throw new Error("Failed to fetch itinerary.");
    }

    // Parse the JSON data
    const data = await response.json();
    console.log(data); // Log the response for debugging

    // Get the container to display the itinerary
    const itineraryContainer = document.getElementById('itinerary-results');
    itineraryContainer.innerHTML = ''; // Clear any previous results

    // Loop through the itinerary array and display each day's plan
    data.itinerary.forEach((dayPlan, index) => {
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('day-plan');
      console.log(dayPlan)
      dayDiv.innerHTML = `
        <h3>Day ${index + 1}: ${dayPlan.place}</h3>
        <p><strong>Accommodation:</strong> ${dayPlan.accomodation.address_line1}, ${dayPlan.accomodation.address_line2}</p>
        <p><strong>Airport:</strong>  ${dayPlan.airport.name || 'N/A'}, ${dayPlan.airport.address_line1 || ''}, ${dayPlan.airport.address_line2 || ''}</p>
        <p><strong>Bus Stop:</strong> ${dayPlan.bus.name || 'N/A'}, ${dayPlan.bus.address_line1 || ''}, ${dayPlan.bus.address_line2 || ''}</p>
        <p><strong>Hospital:</strong> ${dayPlan.hospital.name || 'N/A'}, ${dayPlan.hospital.address_line1 || ''}, ${dayPlan.hospital.address_line2 || ''}, ${dayPlan.hospital.contact || ''}</p>
        <p><strong>Police Station:</strong> ${dayPlan.police.name || 'N/A'}, ${dayPlan.police.address_line1 || ''}, ${dayPlan.police.address_line2 || ''}, ${dayPlan.police.contact || ''}</p>
        <p><strong>Parking:</strong> ${dayPlan.parking.address_line1 || 'N/A'}, ${dayPlan.parking.address_line2 || ''}</p>
        <p><strong>Nearby Cafe/Restaurant:</strong> ${dayPlan.nearbyCafeResto.name || 'N/A'}, ${dayPlan.nearbyCafeResto.address_line1 || ''}, ${dayPlan.nearbyCafeResto.address_line2 || ''}</p>
      `;
      
      itineraryContainer.appendChild(dayDiv);
    });

  } catch (error) {
    console.error("Error fetching itinerary:", error);
  }
});
