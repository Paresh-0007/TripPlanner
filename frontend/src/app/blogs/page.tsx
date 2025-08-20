'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Blog {
  _id: string
  title: string
  content: string
  images: string[]
  author: string
  createdAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs/collection', {
        credentials: 'include',
      })
      const data = await response.json()
      if (data) {
        setBlogs(data)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
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
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Latest Travel Blogs
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src={blog.images[0]}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h2 className="font-bold text-xl mb-3 text-gray-800">{blog.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.content.substring(0, 200)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <Link
                      href={`/blog-page/${blog._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blogs available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}