const fillPlaceData = function (placesData) {
    const hotspotList = document.getElementById('hotspotList');
    const categoryname = document.getElementById('categoryname');
    categoryname.innerText = `${category.toUpperCase()}`
    hotspotList.innerHTML = ''; // Clear any existing content

    for (var i of placesData) { 
        hotspotList.innerHTML += `
        <a href="../location/place.html?id=${i._id}">
            <div class="hotspot-item">
                <img src="${i.images[0]}" alt="image">
                <div class="hotspot-info">
                    <h3>${i.name}</h3>
                    <p><strong>Location: ${i.name}, ${i.region}</strong></p>
                    <p>${i.description.substr(0, 150)}...<a href="../location/place.html?id=${i._id}">View More</a></p>
                </div>
            </div>
        </a>
        `;
    }
}

  
  async function fetchPlace(category) {
    // console.log(category);                                                                                   //Any Console line is a debuging line use them to debug the errors
    
    try {
        const response = await fetch(`/api/places/category/${category}`, {
            credentials: 'include'
        });
        // console.log(response);
        
        if (!response.ok) {
            throw new Error(`Error fetching place: ${response.status}`);
        }
  
        const placesData = await response.json();
        console.log(placesData);
        
        fillPlaceData(placesData);
    } catch (error) {
        console.error('Failed to fetch place data:', error);
    }
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
//   console.log(category);
  
  if (category) {
    fetchPlace(category);
  }