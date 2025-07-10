import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, HelpCircle, Plus, Minus } from 'lucide-react'
import { useState } from 'react'

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does the AI body scanning technology work?",
      answer: "Our AI body scanning technology uses your device's camera to capture precise body measurements. The system analyzes your body shape and provides accurate size recommendations. All processing is done locally on your device for privacy and security."
    },
    {
      question: "Is my camera data stored or shared?",
      answer: "No, your camera data is never stored or shared. All body scanning and measurements are processed locally on your device. We prioritize your privacy and security above all else."
    },
    {
      question: "What devices are compatible with the body scanning feature?",
      answer: "Our body scanning technology works on most modern smartphones, tablets, and computers with a front-facing camera. We recommend using devices with good lighting for the best results."
    },
    {
      question: "How accurate are the size recommendations?",
      answer: "Our AI provides highly accurate size recommendations with over 95% accuracy rate. The system continuously learns and improves to provide better fit recommendations for each customer."
    },
    {
      question: "Can I return items if they don't fit properly?",
      answer: "Yes, we offer a 30-day return policy for all items. If our AI recommendations don't provide the perfect fit, you can easily return or exchange the item at no additional cost."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. We're working on expanding our services internationally. Please subscribe to our newsletter to be notified when we start shipping to your country."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 5-7 business days, express delivery takes 2-3 business days, and same-day delivery is available in select cities for orders placed before 2 PM."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and cash on delivery. All payments are processed securely through encrypted channels."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your order status in real-time through our website or mobile app."
    },
    {
      question: "Can I modify or cancel my order after placing it?",
      answer: "You can modify or cancel your order within 2 hours of placing it. After that, the order enters processing and cannot be modified. Please contact our customer support for assistance."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-[#2a2a2a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300 text-lg">Find answers to common questions about RARITONE</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-blue-400" size={20} />
                  <span className="font-semibold">{faq.question}</span>
                </div>
                {openFAQ === index ? (
                  <Minus className="text-gray-400" size={20} />
                ) : (
                  <Plus className="text-gray-400" size={20} />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <div className="pl-8 text-gray-300">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-900 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
          <p className="text-gray-300 mb-4">
            Our customer support team is here to help you with any additional questions.
          </p>
          <div className="space-y-2 text-gray-300">
            <p>📧 Email: support@raritone.in</p>
            <p>📞 Phone: +91 98765 43210</p>
            <p>🕒 Support Hours: Monday to Saturday, 9 AM to 7 PM</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQs