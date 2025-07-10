import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, Shield, AlertTriangle } from 'lucide-react'

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-[#2a2a2a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-300">Last updated: January 2025</p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-blue-400" size={24} />
              <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>By accessing and using the RARITONE website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
              <p>If you do not agree to abide by the above, please do not use this service.</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-green-400" size={24} />
              <h2 className="text-2xl font-semibold">2. Use License</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>Permission is granted to temporarily download one copy of the materials on RARITONE's website for personal, non-commercial transitory viewing only.</p>
              <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-semibold">3. Privacy and Data Protection</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>Your privacy is important to us. Our AI body scanning technology processes data locally on your device.</p>
              <p>We collect and use personal information solely for providing and improving our services.</p>
              <p>Camera data used for body scanning is never stored, transmitted, or shared with third parties.</p>
              <p>We comply with applicable data protection laws and regulations in India.</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-purple-400" size={24} />
              <h2 className="text-2xl font-semibold">4. Product Information and Pricing</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>We strive to provide accurate product descriptions, images, and pricing information.</p>
              <p>Prices are subject to change without notice. We reserve the right to modify or discontinue products.</p>
              <p>All prices are in Indian Rupees (INR) and include applicable taxes unless otherwise stated.</p>
              <p>In case of pricing errors, we reserve the right to cancel orders and provide full refunds.</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-400" size={24} />
              <h2 className="text-2xl font-semibold">5. Orders and Payment</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>All orders are subject to acceptance and availability.</p>
              <p>We reserve the right to refuse or cancel orders for any reason.</p>
              <p>Payment must be received before order processing and shipment.</p>
              <p>We accept various payment methods as displayed during checkout.</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-400" size={24} />
              <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>RARITONE shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
              <p>Our total liability shall not exceed the amount paid by you for the specific product or service.</p>
              <p>We are not responsible for delays or failures due to circumstances beyond our control.</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-green-400" size={24} />
              <h2 className="text-2xl font-semibold">7. Governing Law</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>These terms and conditions are governed by and construed in accordance with the laws of India.</p>
              <p>Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, India.</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-purple-400" size={24} />
              <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>RARITONE reserves the right to revise these terms at any time without notice.</p>
              <p>By using this website, you agree to be bound by the current version of these terms.</p>
              <p>Continued use of the service after changes constitutes acceptance of the new terms.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-blue-900 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-3">Questions about our Terms?</h3>
          <p className="text-gray-300 mb-4">
            If you have any questions about these Terms & Conditions, please contact us.
          </p>
          <div className="space-y-2 text-gray-300">
            <p>📧 Email: legal@raritone.in</p>
            <p>📞 Phone: +91 98765 43210</p>
            <p>📍 Address: RARITONE Fashion Technologies Pvt. Ltd., Mumbai, India</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions