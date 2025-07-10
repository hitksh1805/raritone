import React from 'react'
import { Camera, ShoppingBag, Star, Phone, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const categories = [
    { name: 'Men\'s Fashion', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Women\'s Fashion', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Accessories', image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Footwear', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'The AI body scanning technology is incredible! I finally found clothes that fit perfectly. RARITONE has revolutionized my shopping experience.'
    },
    {
      name: 'Rahul Verma',
      location: 'Delhi',
      rating: 5,
      comment: 'Amazing quality and perfect fit every time. The virtual try-on feature saved me so much time. Highly recommend RARITONE!'
    },
    {
      name: 'Anita Patel',
      location: 'Bangalore',
      rating: 5,
      comment: 'Outstanding customer service and innovative technology. The personalized recommendations are spot on. Love shopping with RARITONE!'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="text-center">
          {/* RARITONE Logo - Centered and prominent */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-white">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                RARITONE
              </span>
            </h1>
          </div>
          
          {/* Tagline - Made smaller */}
          <p className="text-sm md:text-base text-gray-300 mb-10 font-light">
            Fashion Meets Technology
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="flex items-center gap-2 bg-transparent border border-gray-500 text-white px-6 py-2.5 rounded-full hover:bg-gray-700 transition-colors text-sm">
              <Camera size={18} />
              Start Body Scan
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-black px-6 py-2.5 rounded-full hover:bg-gray-300 transition-colors text-sm">
              <ShoppingBag size={18} />
              Browse Collection
            </button>
          </div>
          
          {/* Privacy Notice */}
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            This site uses webcam access to enable AI-powered try-ons. Your camera data is never stored or shared.
          </p>
        </div>
        
        {/* Chat Button */}
        <button className="fixed bottom-6 right-6 bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-600 transition-colors text-sm">
          <span>💬</span>
          Chat with us
        </button>
      </section>

      {/* Revolutionary Fashion Technology Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Revolutionary Fashion Technology
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Experience the future of fashion with our AI-powered body scanning technology. 
            Get perfect-fit recommendations and virtual try-ons that revolutionize how you shop.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3">AI Body Scanning</h3>
              <p className="text-gray-400 text-sm">Advanced computer vision technology for accurate body measurements and perfect fit recommendations.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Virtual Try-On</h3>
              <p className="text-gray-400 text-sm">See how clothes look on you before purchasing with our immersive virtual try-on experience.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Personalized Style</h3>
              <p className="text-gray-400 text-sm">AI-driven style recommendations based on your preferences, body type, and fashion trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Shop by Category
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <h3 className="text-lg font-semibold text-center text-white group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Customers Say Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            What Our Customers Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic text-sm">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                  <p className="text-gray-400 text-xs">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">RARITONE</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Revolutionizing fashion with AI-powered body scanning technology. 
                Experience perfect fit and personalized style recommendations across India.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/shipping-delivery" className="text-gray-400 hover:text-white transition-colors text-sm">Shipping & Delivery</Link></li>
                <li><Link to="/returns-exchanges" className="text-gray-400 hover:text-white transition-colors text-sm">Returns & Exchanges</Link></li>
                <li><Link to="/faqs" className="text-gray-400 hover:text-white transition-colors text-sm">FAQs</Link></li>
                <li><Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-colors text-sm">Terms & Conditions</Link></li>
                <li><Link to="/contact-us" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">hello@raritone.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-xs">
              © 2025 RARITONE. All rights reserved. | Powered by AI Fashion Technology | Made in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage