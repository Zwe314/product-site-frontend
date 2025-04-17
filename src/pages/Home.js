import React from 'react';
import './Home.css';
import logoIcon from '../assets/logo-icon.png'; // ✅ Use the new logo without text

const Home = () => {
  return (
    <div className="home-page">
      <div className="container py-5">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="hero-title">Welcome to Cynosure</h1>
          <p className="lead-text">
            Where style meets elegance. Explore timeless fashion curated with passion.
          </p>
        </div>

        {/* About Section */}
        <section className="mb-5 mx-auto text-center" style={{ maxWidth: '900px' }}>
          <h2 className="section-title mb-4">About Cynosure: Handcrafted to Celebrate You</h2>
          <p className="body-text">
            At Cynosure, our passion lies in the beauty and soul of handcrafted creations. It's a deep
            appreciation for the artistry and individuality of handmade items that sparked our journey.
          </p>
          <p className="body-text">
            The heart behind Cynosure is a simple yet powerful desire: to help you feel truly unique and special.
            In a world that often favors the uniform, we cherish the personal touch, the meticulous detail,
            and the love woven into every beaded handbag. We see our bags as more than just accessories;
            they are expressions of your personality, little pieces of art designed to accompany you and reflect
            your inner radiance.
          </p>
          <p className="body-text">
            We understand that your style is deeply personal. That's why we offer the empowering option
            of customization. Imagine the joy of creating your ideal bag – a specific color story, a pattern
            that resonates, the perfect size to fit your life. We work closely with you, transforming your
            vision into a tangible piece that feels like it was made just for you, because it was.
          </p>
          <p className="body-text">
            More than just crafting beautiful bags, Cynosure is about creating a connection – between the
            care of the maker and the joy of the wearer, between you and a piece that truly belongs to you.
            We pour our dedication into every bead, hoping our creations will bring a touch of joy, confidence,
            and a celebration of your unique spirit to your everyday.
          </p>
          <p className="body-text">
            Thank you for choosing Cynosure and becoming a cherished part of our story. We are honored to help
            you discover a handcrafted treasure that speaks directly to your heart.
          </p>
        </section>

        {/* Logo at bottom */}
        <div className="text-center mt-5">
          <img src={logoIcon} alt="Cynosure Logo" className="about-logo" />
        </div>
      </div>
    </div>
  );
};

export default Home;









