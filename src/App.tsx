import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BookingCalculator } from './components/BookingCalculator';
import { ProductsShowcase } from './components/ProductsShowcase';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { LocationHours } from './components/LocationHours';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [activeBookingService, setActiveBookingService] = useState<string>('banho-completo');

  const handleSelectServiceForBooking = (serviceId: string) => {
    setActiveBookingService(serviceId);
    const element = document.getElementById('agendamento');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans text-stone-800 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top sticky Navigation */}
      <Navbar onOpenBookingModal={() => {
        const element = document.getElementById('agendamento');
        element?.scrollIntoView({ behavior: 'smooth' });
      }} />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Specialized Services */}
        <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* Interactive Booking & Price Simulator */}
        <BookingCalculator initialServiceId={activeBookingService} />

        {/* Featured Products, Pet Food & Pharmacy */}
        <ProductsShowcase />

        {/* Real Google Maps Reviews & Rating */}
        <ReviewsSection />

        {/* About Agro-pet Mix */}
        <AboutSection />

        {/* Location, Google Maps & Operating Hours */}
        <LocationHours />

        {/* FAQ */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick WhatsApp Floating Contact */}
      <FloatingWhatsApp />
    </div>
  );
}
