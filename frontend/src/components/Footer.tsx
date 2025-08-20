import Image from 'next/image'

export default function Footer() {
  return (
    <section className="bg-blue-600 text-white py-12" id="footer">
      <div className="container mx-auto px-4">
        <div className="footer-content flex flex-wrap justify-between gap-16">
          <div className="about-us flex-1 min-w-[300px]">
            <h4 className="text-2xl font-semibold mb-4">About Us</h4>
            <p className="text-base leading-relaxed mb-5">
              Welcome to your insiders guide to authentic travel experiences. Discover hidden gems and essential
              tips from locals to explore destinations like never before!
            </p>
            <div className="social-icons flex gap-12 mt-10">
              <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer">
                <Image src="/images/instagram.png" alt="Instagram" width={35} height={35} className="hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <Image src="/images/facebook.png" alt="Facebook" width={35} height={35} className="hover:scale-110 transition-transform" />
              </a>
              <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer">
                <Image src="/images/x.png" alt="Twitter" width={35} height={35} className="hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                <Image src="/images/youtube.png" alt="YouTube" width={35} height={35} className="hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          <div className="query-form flex-1 min-w-[300px]">
            <h4 className="text-2xl font-semibold mb-4">Have a Query?</h4>
            <form className="space-y-4">
              <input 
                type="text" 
                name="name" 
                placeholder="Name"
                className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input 
                type="email" 
                name="email" 
                placeholder="E-mail"
                className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea 
                name="query" 
                placeholder="Write Query"
                rows={4}
                className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button 
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}