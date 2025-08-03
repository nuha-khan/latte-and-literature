import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import RouteLoader from '../components/loaders/RouteLoader';
import NavBar from '../components/NavBar';

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Loader ends after 1.5 sec (adjust as needed)
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <RouteLoader />
      ) : (
        <>
          <HeroSection />
          <FeaturedProducts />
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
