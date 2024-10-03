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


  const response = await fetch('http://localhost:8000/api/places/collection', { 
      credentials: 'include' // Include credentials (cookies) in the request
  });
  console.log(response);
  