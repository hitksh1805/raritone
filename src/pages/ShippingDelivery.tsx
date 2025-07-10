import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Truck, Clock, MapPin, Package } from 'lucide-react'

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen bg-[#2a2a2a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Shipping & Delivery</h1>
        
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="text-blue-400" size={24} />
              <h2 className="text-2xl font-semibold">Delivery Options</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2">Standard Delivery (5-7 business days)</h3>
                <p>Free shipping on orders above ₹999. ₹99 shipping fee for orders below ₹999.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Express Delivery (2-3 business days)</h3>
                <p>₹199 shipping fee. Available in major cities across India.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Same Day Delivery</h3>
                <p>₹299 shipping fee. Available in Mumbai, Delhi, and Bangalore for orders placed before 2 PM.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-green-400" size={24} />
              <h2 className="text-2xl font-semibold">Delivery Areas</h2>
            </div>
            <div className="text-gray-300">
              <p className="mb-4">We currently deliver to all major cities and towns across India including:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad</li>
                <li>Pune, Ahmedabad, Jaipur, Lucknow, Kanpur, Nagpur</li>
                <li>Indore, Thane, Bhopal, Visakhapatnam, Pimpri-Chinchwad</li>
                <li>And 500+ other cities and towns</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Package className="text-purple-400" size={24} />
              <h2 className="text-2xl font-semibold">Order Processing</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>• Orders are processed within 24-48 hours of confirmation</p>
              <p>• You will receive a tracking number via email and SMS once your order is shipped</p>
              <p>• Custom-fit items may take an additional 2-3 days for processing</p>
              <p>• Orders placed on weekends will be processed on the next business day</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-orange-400" size={24} />
              <h2 className="text-2xl font-semibold">Important Notes</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>• Delivery times may vary during festive seasons and adverse weather conditions</p>
              <p>• Please ensure someone is available to receive the package during delivery hours</p>
              <p>• We require a valid ID proof for delivery verification</p>
              <p>• For any delivery issues, contact our customer support at +91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingDelivery