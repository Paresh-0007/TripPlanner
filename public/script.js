const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
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
