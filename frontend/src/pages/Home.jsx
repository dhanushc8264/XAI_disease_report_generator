import React, { useEffect, useRef } from 'react';
import '../styles/home.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const particlesRef = useRef(null);
   const navigate = useNavigate();

  useEffect(() => {
    createParticles();
  }, []);

  const createParticles = () => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    const particleCount = 50;
    particlesContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
      particlesContainer.appendChild(particle);
    }
  };

  const navigateToPredictor = (type) => {
    if (type === 'diabetes') {
      // Replace with your actual diabetes predictor navigation
      navigate('/diabetes')
      // window.location.href = '/diabetes-predictor';
    } else if (type === 'heart') {
      // Replace with your actual heart predictor navigation
      navigate('/heart')
      // window.location.href = '/heart-predictor';
    }
  };

  const handleCardClick = (e, type) => {
    const card = e.currentTarget;
    const ripple = document.createElement('div');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(102, 126, 234, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;
    
    card.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);

    navigateToPredictor(type);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="app">
      <div className="particles" ref={particlesRef}></div>
      
      <header>
        <nav className="container">
          <a href="#" className="logo">
            <div className="logo-icon">H+</div>
            HealthPredict
          </a>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
            <li><a href="#predictors" onClick={(e) => handleNavClick(e, 'predictors')}>Predictors</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero container" id="home">
          <h1>XAI-Powered Health Assessment</h1>
          <p>Know Your Health, Before It Knows You.</p>
          <p className="subtitle">Take control of your health with intelligent predictions</p>
        </section>

        <section className="predictors container" id="predictors">
          <div className="predictor-card floating" onClick={(e) => handleCardClick(e, 'diabetes')}>
            <div className="card-icon diabetes-icon">🩺</div>
            <h3 className="card-title">Diabetes Predictor</h3>
            <p className="card-description">
              Early detection of diabetes risk using advanced AI algorithms. Input your health metrics 
              and get personalized risk assessment with actionable recommendations.
            </p>
            <button className="card-button">Start Assessment</button>
          </div>

          <div className="predictor-card floating" onClick={(e) => handleCardClick(e, 'heart')}>
            <div className="card-icon heart-icon">❤️</div>
            <h3 className="card-title">Heart Health Predictor</h3>
            <p className="card-description">
              Comprehensive cardiovascular risk analysis. Evaluate your heart health status 
              and receive insights to maintain optimal cardiac wellness.
            </p>
            <button className="card-button">Start Assessment</button>
          </div>
        </section>

        <section className="features container" id="about">
          <h2>Why Choose HealthPredict?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🧠</div>
              <h3 className="feature-title">Powered by Explainable AI (XAI)</h3>
              <p className="feature-description">Know why a result was predicted, not just what — with clear, human-friendly insights.

</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">100% Private & Secure</h3>
              <p className="feature-description">Your personal health data is never stored or shared. The app runs securely and respects your privacy.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title"> Early Detection Saves Lives</h3>
              <p className="feature-description">Predict disease risks early — before symptoms get serious.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Fast & Easy to Use</h3>
              <p className="feature-description">Get your health risk assessment in seconds, not days</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="container" id="contact">
        <p>&copy; 2024 HealthPredict. Empowering healthier lives through AI. Always consult healthcare professionals for medical advice.</p>
      </footer>
    </div>
  );
};

export default Home;