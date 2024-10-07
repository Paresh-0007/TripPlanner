const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Price value script

const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

priceRange.addEventListener("input", function () {
  priceValue.textContent = this.value;
});

// Event listener for opening the popup when the button is clicked
document.getElementById("openPopupBtn").addEventListener("click", function () {
  const popup = document.getElementById("popup");
  popup.classList.add("active"); // Add the 'active' class to show the popup
});

// Event listener for closing the popup when the close button is clicked
document.querySelector(".close").addEventListener("click", function () {
  const popup = document.getElementById("popup");
  popup.classList.remove("active"); // Remove the 'active' class to hide the popup
});

// document.addEventListener("DOMContentLoaded", () => {
//   // Function to fetch user info
//   const fetchUserInfo = async () => {
//     const usernameElement = document.getElementById("username");
//     const profileImageElement = document.getElementById("profileImage");

//     try {
//       const response = await fetch('/api/users/user-info', {
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
      const response = await fetch(
        "/api/users/user-info",
        {
          credentials: "include", // Use credentials to send cookies with the request
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Display username and profile image
        const button = document.getElementById("sign-up");
        const profileImageElement = document.getElementById("profileImage");
        button.innerHTML = "Log Out";
        button.href = "/login/index.html";
        profileImageElement.src = `${data.data.avatar}`;
        profileImageElement.style =
          "display:block; height: 50px; border-radius: 50px; ";

        button.addEventListener("click", async (event) => {
          event.preventDefault(); // Prevent the default action
          try {
            const response = await fetch(
              "/api/users/logout",
              {
                method: "POST",
                credentials: "include", // Include credentials (cookies) in the request
              }
            );

            if (response.ok) {
              alert("User Logged Out Successfully!");
              // Optionally, redirect to the login page or update the UI
              window.location.href = "/login/index.html";
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
const fillGemInfo = (data) => {
  const fourGems = data.slice(0, 4);
  //console.log(fourGems);
  var gemGrid = document.getElementById("gemGrid");
  gemGrid.innerHTML = "";
  for (var gem of fourGems) {
    gemGrid.innerHTML += `
      <div class="gem-card">
        <img src="${gem.images[0]}" alt="Hidden Gem 1">
        <p class="title">${gem.name}</p>
        <p>${gem.description.substr(0, 150)}...</p>
        <a href="./location/place.html?id=${
          gem._id
        }" class="read-more-link">Read More</a>
      </div>
      `;
  }
};

const fetchPlaceCollection = async ()=>{
  const response = await fetch("/api/places/collection", {
    credentials: "include",
  });
  
  const data = await response.json();
  
  if (data) {
    fillGemInfo(data);
  }
}

fetchPlaceCollection()

//BLOGS
const fillBlogsInfo = (data) => {
  const fourBlogs = data.slice(0, 4);
  var blogGrid = document.getElementById("blog-grid");
  blogGrid.innerHTML = "";
  for (var blog of fourBlogs) {
    console.log(blog);
    
    blogGrid.innerHTML += `
            <div class="blog-card">
                <img src="${blog.image}" alt="${blog.title}"  >
                <p class="title">${blog.title}</p>
                <p>${blog.introduction.substr(0,150)}...</p>
                <a href="./blog-page/blog.html?id=${blog._id}" class="read-more-link">Read More</a> 
            </div>
    `;
  }
};

const fetchBlogData = async () => {
  const response = await fetch("/api/blogs/collection", {
    credentials: "include",
  });

  const data = await response.json();

  if (data) {
    fillBlogsInfo(data);
  }
};

fetchBlogData()

//FORM

document
  .getElementById("itinerary")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const city = document.getElementById("city").value;
    const days = document.getElementById("no-of-days").value;

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

      // Store the itinerary in localStorage before redirecting
      localStorage.setItem("itineraryData", JSON.stringify(data));

      // Redirect to the result.html page
      window.location.href = "./result.html";
    } catch (error) {
      console.error("Error fetching itinerary:", error);
    }
  });

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();

  if (!query) {
    resultsDiv.style = "display:none";
    alert("Please enter some words to search.");

    return;
  }

  try {
    const response = await fetch(`/api/places/search?query=${query}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const places = await response.json();
    //console.log("Fetched Places:", places);

    resultsDiv.innerHTML = "";

    if (places.length === 0) {
      resultsDiv.style = "display:none;";
      alert("No place found !");
    } else {
      places.forEach((place) => {
        const placeItem = document.createElement("a");
        placeItem.href = `./location/place.html?id=${place._id}`;
        placeItem.style = "display:flex; margin:15px;";
        // placeItem.textContent = `${place.name} - ${place.place_type} - ${place.region}`;
        placeItem.innerHTML = `<img src=${
          place.images[0]
        } style="height:66px; width:100px; border-radius:8px;">
                               <div style = "width: 100%; padding:5px; text-align:left; margin-left: 15px;">
                               <strong style="text-align:left;  color: black;">${
                                 place.name
                               }</strong>
                               <p style="text-align:left; padding:0px; margin-top: 5px;">${
                                 place.place_type.charAt(0).toUpperCase() +
                                 place.place_type.slice(1)
                               }</p>
                               <p style="text-align:left; padding:0px;">${
                                 place.region
                               },Maharashtra</p>
                               </div>`;
        resultsDiv.appendChild(placeItem);
        resultsDiv.style = "display:block";
      });
    }
  } catch (error) {
    console.error("Error fetching results:", error);
    resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchButton.click();
  }
});
