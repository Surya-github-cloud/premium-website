
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import QuoteSection from './components/QuoteSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import FeaturesSection from './components/FeaturesSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflowY = 'hidden';

    const timer = setTimeout(() => {
      setLoading(false);
      // Restore scrolling
      document.body.style.overflowY = 'auto';
    }, 2500); // This duration should be slightly longer than the splash screen animations

    return () => {
      clearTimeout(timer);
      document.body.style.overflowY = 'auto';
    };
  }, []);


  return (
    <div className="text-gray-900 relative">
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="./bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10">
        <AnimatePresence>
          {loading && <SplashScreen />}
        </AnimatePresence>

        <Header />
        <main>
          <HeroSection />
          <QuoteSection />
          <WhyChooseUsSection />
          <FeaturesSection />
          <ServicesSection />
          <TestimonialsSection />
          <ProjectsSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;