'use client'

import { useState } from 'react'

interface TripPlannerFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function TripPlannerForm({ isOpen, onClose }: TripPlannerFormProps) {
  const [formData, setFormData] = useState({
    city: '',
    days: '1',
    travellers: '1',
    budget: '10000',
    transportation: '',
    accommodation: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/generateItinerary/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          city: formData.city, 
          days: formData.days 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch itinerary.')
      }

      const data = await response.json()
      console.log(data)

      // Store the itinerary in localStorage before redirecting
      localStorage.setItem('itineraryData', JSON.stringify(data))

      // Redirect to the result page
      window.location.href = '/result'
    } catch (error) {
      console.error('Error fetching itinerary:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Plan Your Trip!!</h1>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              Enter City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="days" className="block text-sm font-medium text-gray-700">
              No. of Days:
            </label>
            <select
              id="days"
              name="days"
              value={formData.days}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="travellers" className="block text-sm font-medium text-gray-700">
              No. of Travellers:
            </label>
            <select
              id="travellers"
              name="travellers"
              value={formData.travellers}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Budget: ₹<span>{formData.budget}</span>
            </label>
            <input
              type="range"
              id="budget"
              name="budget"
              min="1000"
              max="100000"
              step="1000"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Transportation:</label>
            <div className="grid grid-cols-2 gap-2">
              {['Car', 'Flight', 'Train', 'Bus', 'Cruise/Ship'].map((transport) => (
                <div key={transport} className="flex items-center">
                  <input
                    type="radio"
                    id={`transportation-${transport.toLowerCase()}`}
                    name="transportation"
                    value={transport}
                    checked={formData.transportation === transport}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor={`transportation-${transport.toLowerCase()}`} className="text-sm">
                    {transport}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Accommodation:</label>
            <div className="grid grid-cols-2 gap-2">
              {['Hotel', 'Hostel', 'Airbnb', 'Camping'].map((accommodation) => (
                <div key={accommodation} className="flex items-center">
                  <input
                    type="radio"
                    id={`accommodation-${accommodation.toLowerCase()}`}
                    name="accommodation"
                    value={accommodation}
                    checked={formData.accommodation === accommodation}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor={`accommodation-${accommodation.toLowerCase()}`} className="text-sm">
                    {accommodation}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}