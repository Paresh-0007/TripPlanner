'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface User {
  avatar?: string
  name: string
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/api/users/user-info', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.data)
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        alert('User Logged Out Successfully!')
        setUser(null)
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="logo">
            <Image src="/images/logo.png" alt="TripPlanner Logo" width={150} height={50} />
          </div>
        </Link>

        <div 
          className="menu-toggle md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </div>

        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full md:top-auto left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
          <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <li className="dropdown relative group">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                Hotspots <i className="ri-arrow-down-s-line ml-1"></i>
              </a>
              <ul className="dropdown-menu absolute left-0 top-full bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
                <li><Link href="/location/66ff91a0b5aaac5c3808b92c" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Bhogwe Beach</Link></li>
                <li><Link href="/location/66ff91a0b5aaac5c3808b932" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Kalavantin Durg trek</Link></li>
                <li><Link href="/location/66ff91a0b5aaac5c3808b92a" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Ambabai Temple</Link></li>
                <li><Link href="/location/66ff91a0b5aaac5c3808b92b" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Bhagwan Mahavir Wildlife Sanctuary</Link></li>
                <li><Link href="/location/66ff91a0b5aaac5c3808b935" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Karla Caves</Link></li>
                <li><Link href="/location/66ff91a0b5aaac5c3808b934" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Kandhar Fort</Link></li>
              </ul>
            </li>
            <li className="dropdown relative group">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                Categories <i className="ri-arrow-down-s-line ml-1"></i>
              </a>
              <ul className="dropdown-menu absolute left-0 top-full bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
                <li><Link href="/categories/beach" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Beaches</Link></li>
                <li><Link href="/categories/nationalpark" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">National Parks</Link></li>
                <li><Link href="/categories/trek" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Treks</Link></li>
                <li><Link href="/categories/religious" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Religious Places</Link></li>
                <li><Link href="/categories/fortcave" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Forts & Caves</Link></li>
              </ul>
            </li>
            <li><Link href="/blogs" className="text-gray-700 hover:text-blue-600">Blogs</Link></li>
            <li><Link href="#footer" className="text-gray-700 hover:text-blue-600">About Us</Link></li>
            {user ? (
              <>
                <li>
                  <Image 
                    src={user.avatar || "/images/user.png"} 
                    alt="Profile" 
                    width={40} 
                    height={40} 
                    className="rounded-full"
                  />
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  href="/signup" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}