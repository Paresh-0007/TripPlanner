'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Place {
  _id: string
  name: string
  place_type: string
  region: string
  images: string[]
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Place[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) {
      setShowResults(false)
      alert('Please enter some words to search.')
      return
    }

    try {
      const response = await fetch(`/api/places/search?query=${query}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const places = await response.json()
      setResults(places)

      if (places.length === 0) {
        setShowResults(false)
        alert('No place found!')
      } else {
        setShowResults(true)
      }
    } catch (error) {
      console.error('Error searching places:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Explore Here..."
          className="flex-1 px-6 py-4 text-lg focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-4 hover:bg-blue-700 transition-colors"
        >
          <i className="ri-search-line text-xl"></i>
        </button>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg mt-2 max-h-96 overflow-y-auto z-10">
          {results.map((place) => (
            <Link
              key={place._id}
              href={`/location/${place._id}`}
              className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-100"
              onClick={() => setShowResults(false)}
            >
              <Image
                src={place.images[0]}
                alt={place.name}
                width={100}
                height={66}
                className="rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-gray-800">{place.name}</h3>
                <p className="text-gray-600 text-sm">
                  {place.place_type.charAt(0).toUpperCase() + place.place_type.slice(1)}
                </p>
                <p className="text-gray-500 text-sm">{place.region}, Maharashtra</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}