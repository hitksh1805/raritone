import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RefreshCw, Shield, AlertCircle, CheckCircle } from 'lucide-react'

const ReturnsExchanges = () => {
  return (
    <div className="min-h-screen bg-[#2a2a2a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Returns & Exchanges</h1>
        
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-green-400" size={24} />
              <h2 className="text-2xl font-semibold">Our Return Policy</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>At RARITONE, we want you to be completely satisfied with your purchase. We offer a hassle-free return and exchange policy.</p>
              <p>• <strong>30-day return window</strong> from the date of delivery</p>
              <p>• Items must be in original condition with tags attached</p>
              <p>• Free returns for defective or incorrect items</p>
              <p>• Easy online return process</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="text-blue-400" size={24} />
              <h2 className="text-2xl font-semibold">Exchange Process</h2>
            </div>
            <div className="text-gray-300">
              <h3 className="font-semibold text-white mb-3">How to Exchange:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Log into your RARITONE account and go to 'My Orders'</li>
                <li>Select the item you want to exchange and choose 'Exchange'</li>
                <li>Select your preferred size/color and reason for exchange</li>
                <li>Schedule a pickup or drop off at our partner locations</li>
                <li>Once we receive and verify the item, your exchange will be processed</li>
              </ol>
              <p className="mt-4"><strong>Exchange Timeline:</strong> 5-7 business days after we receive your item</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-green-400" size={24} />
              <h2 className="text-2xl font-semibold">Eligible Items</h2>
            </div>
            <div className="text-gray-300">
              <h3 className="font-semibold text-white mb-3">Items that can be returned/exchanged:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Clothing items in original condition with tags</li>
                <li>Accessories that haven't been worn</li>
                <li>Footwear in original packaging</li>
                <li>Items that don't fit as per our AI recommendations</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-400" size={24} />
              <h2 className="text-2xl font-semibold">Non-Returnable Items</h2>
            </div>
            <div className="text-gray-300">
              <h3 className="font-semibold text-white mb-3">Items that cannot be returned:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Intimate apparel and undergarments</li>
                <li>Customized or personalized items</li>
                <li>Items damaged by misuse</li>
                <li>Items without original tags or packaging</li>
                <li>Items purchased during final sale events</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="text-purple-400" size={24} />
              <h2 className="text-2xl font-semibold">Refund Process</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>• Refunds are processed within 5-7 business days after we receive your return</p>
              <p>• Refunds will be credited to your original payment method</p>
              <p>• For cash on delivery orders, refunds will be processed via bank transfer</p>
              <p>• You will receive an email confirmation once your refund is processed</p>
              <p>• Return shipping is free for defective or incorrect items</p>
              <p>• For other returns, ₹99 return shipping fee will be deducted from your refund</p>
            </div>
          </div>
          
          <div className="bg-blue-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
            <p className="text-gray-300 mb-4">
              Our customer support team is here to help you with any return or exchange queries.
            </p>
            <div className="space-y-2 text-gray-300">
              <p>📧 Email: returns@raritone.in</p>
              <p>📞 Phone: +91 98765 43210</p>
              <p>🕒 Support Hours: Monday to Saturday, 9 AM to 7 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnsExchanges