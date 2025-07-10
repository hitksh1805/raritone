import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ShippingDelivery from './pages/ShippingDelivery'
import ReturnsExchanges from './pages/ReturnsExchanges'
import FAQs from './pages/FAQs'
import TermsConditions from './pages/TermsConditions'
import ContactUs from './pages/ContactUs'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#2a2a2a] text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App