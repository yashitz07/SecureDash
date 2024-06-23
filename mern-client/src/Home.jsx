import React, { useEffect } from 'react';
import Velocity from 'velocity-animate';
import './Home.css';

const Home = () => {
  useEffect(() => {
    // Select elements for animation using Velocity
    const animateSlideUpElements = document.querySelectorAll('.home .animate-slide-up');

    // Animation options
    const animationOptions = {
      opacity: [1, 0],
      translateY: ['0px', '50px'],
      easing: 'easeInOutQuart',
      duration: 800,
      delay: 300,
      stagger: 140
    };

    // Apply Velocity animation to each element
    Velocity(animateSlideUpElements, animationOptions);
  }, []);

  return (
    <div className="home flex-container bkg__spotlight">
      <div className="flex-item">
       
          <h1 className="animate-slide-up text-shadow">SecureDash</h1>
          <h2 className="animate-slide-up text-shadow">Your Gateway to Secure Access</h2>
          <div className="animate-slide-up">
            <a href="#more-info" className="register-link">
              <button className="register-button">
                Enter
              </button>
            </a>
          </div>
       
      </div>
    </div>
  );
}

export default Home;
