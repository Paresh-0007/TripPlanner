const fetchDataItinerary = async function (req, res) {
  const city = req.body.city;
  const days = req.body.days;

  const cityResponse = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${city}&apiKey=${process.env.GEOAPIFY_API_KEY}`
  );
  if (!cityResponse.ok) {
    return res
      .status(cityResponse.status)
      .json({ error: "Failed to fetch location." });
  }
  const cityData = await cityResponse.json();
  if (!cityData.features || cityData.features.length === 0) {
    return res.status(404).json({ error: "No location found for the given city." });
  }

  const { lat, lon } = cityData.features[0].properties;
  const cityId = cityData.features[0].properties.place_id;

  const tourismResponse = await fetch(
    `https://api.geoapify.com/v2/places?categories=tourism&filter=place:${cityId}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`
  );
  const tourismData = await tourismResponse.json();
  if (!tourismData.features || tourismData.features.length === 0) {
    return res.status(404).json({
      error: "No tourist attractive places found for the given city. Please try another city."
    });
  }

  function getRandomPlaces(arr, num) {
    let shuffled = [...arr].sort(() => 0.5 - Math.random()); // Shuffle and slice
    return shuffled.slice(0, num);
  }

  const places = tourismData.features;
  const filteredPlaces = getRandomPlaces(places, days);
  let customItinerary = [];

  // Fetch all nearby information concurrently using Promise.all
  for (let place of filteredPlaces) {
    let placeid = place.properties.place_id;
    let dayplan = {
      place: place.properties.address_line1,
      accomodation: "We're sorry, no accommodations are available at your selected destination. Please try adjusting your preferences or checking nearby options.",
      airport: "We're sorry, no nearby airports were found.",
      railway: "We're sorry, no nearby railway stations were found.",
      bus: "We're sorry, no nearby bus stations were found.",
      hospital: "We're sorry, no nearby hospitals were listed.",
      police: "We're sorry, no nearby police stations were listed.",
      parking: "We're sorry, no nearby parking areas were found.",
      nearbyCafeResto: "We're sorry, no nearby cafes or restaurants were found."
    };

    const fetchPromises = [
      fetch(`https://api.geoapify.com/v2/places?categories=accommodation&filter=place:${placeid}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`),
      fetch(`https://api.geoapify.com/v2/places?categories=airport&filter=place:${placeid}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`),
      fetch(`https://api.geoapify.com/v2/places?categories=public_transport.train,railway.train&filter=place:${placeid}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`),
      fetch(`https://api.geoapify.com/v2/places?categories=public_transport.bus&filter=place:${placeid}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`),
      fetch(`https://api.geoapify.com/v2/places?categories=service.police&filter=place:${placeid}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`),
      fetch(`https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=place:${placeid}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`),
      fetch(`https://api.geoapify.com/v2/places?categories=parking&filter=place:${placeid}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`),
      fetch(`https://api.geoapify.com/v2/places?categories=catering&filter=place:${placeid}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`)
    ];

    const responses = await Promise.all(fetchPromises);
    const jsonPromises = responses.map((response) => response.json());
    const [
      accomodationsData,
      airportData,
      railwayData,
      busData,
      policeData,
      hospitalData,
      parkingData,
      cafeRestoData
    ] = await Promise.all(jsonPromises);

    // Accommodation
    if (accomodationsData.features && accomodationsData.features.length > 0) {
      dayplan.accomodation = {
        address_line1: accomodationsData.features[0].properties.address_line1,
        address_line2: accomodationsData.features[0].properties.address_line2,
        contact: accomodationsData.features[0].properties.contact
      };
    }

    // Airport
    if (airportData.features && airportData.features.length > 0) {
      dayplan.airport = {
        name: airportData.features[0].properties.name,
        address_line1: airportData.features[0].properties.address_line1,
        address_line2: airportData.features[0].properties.address_line2
      };
    }

    // Railway
    if (railwayData.features && railwayData.features.length > 0) {
      dayplan.railway = {
        name: railwayData.features[0].properties.name,
        address_line1: railwayData.features[0].properties.address_line1,
        address_line2: railwayData.features[0].properties.address_line2
      };
    }

    // Bus
    if (busData.features && busData.features.length > 0) {
      dayplan.bus = {
        name: busData.features[0].properties.name,
        address_line1: busData.features[0].properties.address_line1,
        address_line2: busData.features[0].properties.address_line2
      };
    }

    // Police
    if (policeData.features && policeData.features.length > 0) {
      dayplan.police = {
        name: policeData.features[0].properties.name,
        address_line1: policeData.features[0].properties.address_line1,
        address_line2: policeData.features[0].properties.address_line2,
        contact: `National Police Number is 100`
      };
    }
    
    //Hospital
    if (hospitalData.features && hospitalData.features.length > 0) {
      dayplan.hospital = {
        name: hospitalData.features[0].properties.name,
        address_line1: hospitalData.features[0].properties.address_line1,
        address_line2: hospitalData.features[0].properties.address_line2,
        contact: `National Ambulance Service Number is 108`
      };
    }

    // Parking
    if (parkingData.features && parkingData.features.length > 0) {
      dayplan.parking = {
        name: parkingData.features[0].properties.name,
        address_line1: parkingData.features[0].properties.address_line1,
        address_line2: parkingData.features[0].properties.address_line2
      };
    }

    // Cafe/Restaurant
    if (cafeRestoData.features && cafeRestoData.features.length > 0) {
      dayplan.nearbyCafeResto = {
        name: cafeRestoData.features[0].properties.name,
        address_line1: cafeRestoData.features[0].properties.address_line1,
        address_line2: cafeRestoData.features[0].properties.address_line2
      };
    }

    customItinerary.push(dayplan);
  }

  return res.status(200).json({ itinerary: customItinerary });
};

export {fetchDataItinerary}