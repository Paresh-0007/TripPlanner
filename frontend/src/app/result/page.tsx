'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface ItineraryData {
  city: string
  days: string
  itinerary: any[]
}

export default function ResultPage() {
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get itinerary data from localStorage
    const data = localStorage.getItem('itineraryData')
    if (data) {
      try {
        setItineraryData(JSON.parse(data))
      } catch (error) {
        console.error('Error parsing itinerary data:', error)
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your itinerary...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!itineraryData) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Itinerary Found</h1>
          <p className="text-gray-600 mb-8">
            It looks like you haven't planned a trip yet. Go back to the homepage to start planning!
          </p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Plan Your Trip
          </a>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Your Trip to {itineraryData.city}
          </h1>
          <p className="text-center text-gray-600 mb-12">
            {itineraryData.days} day{itineraryData.days !== '1' ? 's' : ''} itinerary
          </p>
          
          <div className="max-w-4xl mx-auto">
            {itineraryData.itinerary && itineraryData.itinerary.length > 0 ? (
              <div className="space-y-8">
                {itineraryData.itinerary.map((day: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4 text-blue-600">
                      Day {index + 1}
                    </h2>
                    
                    {day.places && day.places.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Places to Visit</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {day.places.map((place: any, placeIndex: number) => (
                            <div key={placeIndex} className="border border-gray-200 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-800">{place.name}</h4>
                              <p className="text-sm text-gray-600">{place.description}</p>
                              {place.location && (
                                <p className="text-xs text-gray-500 mt-2">📍 {place.location}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {day.accommodation && (
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Accommodation</h3>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700">
                            {day.accommodation.address_line1 || 'Accommodation suggestions available'}
                          </p>
                          {day.accommodation.contact && (
                            <p className="text-xs text-gray-600 mt-1">
                              Contact: {day.accommodation.contact}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {(day.nearbyRestaurants || day.nearbyCafeResto) && (
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Dining Options</h3>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700">
                            {day.nearbyRestaurants || day.nearbyCafeResto || 'Local dining recommendations available'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Itinerary Generated Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your trip to {itineraryData.city} has been planned. 
                  The detailed itinerary data is available for {itineraryData.days} days.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700">
                    💡 Your itinerary includes recommendations for places to visit, 
                    accommodation options, dining suggestions, and local transportation.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <a
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors mr-4"
            >
              Plan Another Trip
            </a>
            <button
              onClick={() => window.print()}
              className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              Print Itinerary
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}