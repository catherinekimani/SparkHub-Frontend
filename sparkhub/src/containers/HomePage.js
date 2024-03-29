import React, { useState } from "react";

import "../styles/HomePage.css";

import team from "../assets/team.png";
import techImage from "../assets/tech.png";
import food from "../assets/food.png";
import health from "../assets/health.png";
import lady from "../assets/lady.jpg";
import net from "../assets/net.jpeg";

const HomePage = (props) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleCardHover = (index) => {
    setHoveredIndex(index);
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
  };

  const cardBackgrounds = Array(6).fill("#FFFFFF");
  if (hoveredIndex !== null) {
    cardBackgrounds[hoveredIndex] = "#87CEEB";
  }
  return (
    <div className="homepage">
      <div className="background">
        <img src={team} alt="team" className="background-image" />
      </div>
      <div className="content">
        <h1 className="main-heading">Welcome to SparkHub</h1>
        <p className="additional-text">
          SparkHub is where curiosity meets collaboration. It's a vibrant
          community where learners, thinkers, and creators come together to
          explore, connect, and grow.
        </p>
      </div>
      <div className="card-container">
        <div
          className="card"
          style={{ backgroundColor: cardBackgrounds[0] }}
          onMouseEnter={() => handleCardHover(0)}
          onMouseLeave={handleCardLeave}
        >
          <img src={techImage} alt="Technology" className="card-image" />
          <h3>Technology</h3>
          <p>Explore the latest tech trends and innovations.</p>
        </div>
        <div
          className="card"
          style={{ backgroundColor: cardBackgrounds[1] }}
          onMouseEnter={() => handleCardHover(1)}
          onMouseLeave={handleCardLeave}
        >
          <img
            src={
              "https://img.freepik.com/premium-photo/funky-vibes-elements-abstract-art-brush-strokes-illustartion_739548-1120.jpg?w=826"
            }
            alt="Art"
            className="card-image"
          />
          <h3>Art & Design</h3>
          <p>
            Discover and share creative works from artists around the world.
          </p>
        </div>
        <div
          className="card"
          style={{ backgroundColor: cardBackgrounds[2] }}
          onMouseEnter={() => handleCardHover(2)}
          onMouseLeave={handleCardLeave}
        >
          <img src={health} alt="health" className="card-image" />
          <h3>Health & Fitness </h3>
          <p>
            Engage with fellow members in meaningful discussions and
            collaborations.
          </p>
        </div>
        <div
          className="card"
          style={{ backgroundColor: cardBackgrounds[3] }}
          onMouseEnter={() => handleCardHover(3)}
          onMouseLeave={handleCardLeave}
        >
          <img src={food} alt="food" className="card-image" />
          <h3>Food & Cooking</h3>
          <p>Find mouthwatering recipes and cooking tips from top chefs.</p>
        </div>
        <div
          className="card"
          style={{ backgroundColor: cardBackgrounds[4] }}
          onMouseEnter={() => handleCardHover(4)}
          onMouseLeave={handleCardLeave}
        >
          <img src={lady} alt="fashion" className="card-image" />
          <h3>Fashion</h3>
          <p>
            Stay updated with the latest fashion trends and style inspirations.
          </p>
        </div>
        <div
          className="card"
          style={{ backgroundColor: cardBackgrounds[5] }}
          onMouseEnter={() => handleCardHover(5)}
          onMouseLeave={handleCardLeave}
        >
          <img src={net} alt="net" className="card-image" />
          <h3>Global Reach</h3>
          <p>
            Join a diverse community with members from all corners of the globe.
          </p>
        </div>
        <footer className="footer">
          <div className="footer-container">
            <div className="row">
              <div className="footer-col">
                <h4>About Us</h4>
                <p>
                  SparkHub is a knowledge sharing platform that fosters
                  collaboration and learning across diverse communities.
                </p>
              </div>
              <div className="footer-col">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <a href="#!">Home</a>
                  </li>
                  <li>
                    <a href="#1">About</a>
                  </li>
                  <li>
                    <a href="#!">Services</a>
                  </li>
                  <li>
                    <a href="#!">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="#!">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#!">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#!">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#!">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 SparkHub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
