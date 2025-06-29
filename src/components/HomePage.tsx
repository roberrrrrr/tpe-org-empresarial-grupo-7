import React from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { ServicesSection } from './ServicesSection';
import { TechSection } from './TechSection';
import { PricingSection } from './PricingSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <ServicesSection />
        <TechSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
