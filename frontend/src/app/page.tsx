'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import TripPlannerForm from '@/components/TripPlannerForm'

interface Place {
  _id: string
  name: string
  place_type: string
  region: string
  images: string[]
  description: string
}

interface Blog {
  _id: string
  title: string
  content: string
  images: string[]
  author: string
  createdAt: string
}

export default function Home() {
  const [showTripForm, setShowTripForm] = useState(false)
  const [hiddenGems, setHiddenGems] = useState<Place[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    fetchHiddenGems()
    fetchBlogs()
  }, [])

  const fetchHiddenGems = async () => {
    try {
      const response = await fetch('/api/places/collection', {
        credentials: 'include',
      })
      const data = await response.json()
      if (data) {
        setHiddenGems(data.slice(0, 8)) // Show first 8 places
      }
    } catch (error) {
      console.error('Error fetching places:', error)
    }
  }

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs/collection', {
        credentials: 'include',
      })
      const data = await response.json()
      if (data) {
        setBlogs(data.slice(0, 6)) // Show first 6 blogs
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="hero bg-gradient-to-br from-blue-600 to-blue-800 text-white py-32 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            DISCOVER HIDDEN GEMS AND LOCAL SECRETS
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Your Ultimate Guide to Unforgettable Journeys!
          </p>
          
          <div className="mb-12">
            <SearchBar />
          </div>

          <button
            onClick={() => setShowTripForm(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Plan Your Trip
          </button>
        </div>
      </section>

      {/* Hidden Gems Section */}
      <section className="hidden-gems py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Take a look at some of the Hidden Gems of Maharashtra
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {hiddenGems.map((gem) => (
              <div key={gem._id} className="gem-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={gem.images[0]}
                  alt={gem.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{gem.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {gem.description}
                  </p>
                  <Link
                    href={`/location/${gem._id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/hotspots"
              className="inline-flex items-center bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              View More <i className="ri-arrow-right-s-line ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      <hr className="border-gray-300" />

      {/* Blogs Section */}
      <section className="blogs py-16 px-4 bg-gray-800 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Latest Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="blog-card bg-white text-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={blog.images[0]}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {blog.content.substring(0, 150)}...
                  </p>
                  <Link
                    href={`/blog-page/${blog._id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              View More <i className="ri-arrow-right-s-line ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <TripPlannerForm
        isOpen={showTripForm}
        onClose={() => setShowTripForm(false)}
      />
    </div>
  )
}
