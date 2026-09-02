import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="foot-panel1" onClick={backToTop}>
        Back to Top
      </div>

      <div className="foot-panel2">
        <ul>
          <p>Get to Know Us</p>
          <a>Careers</a>
          <a>Blog</a>
          <a>About Amazon</a>
          <a>Investor Relations</a>
          <a>Amazon Devices</a>
          <a>Amazon Science</a>
        </ul>
        <ul>
          <p>Make Money with Us</p>
          <a>Sell products on Amazon</a>
          <a>Sell on Amazon Business</a>
          <a>Sell apps on Amazon</a>
          <a>Become an Affiliate</a>
          <a>Advertise Your Products</a>
          <a>Self-Publish with Us</a>
        </ul>
        <ul>
          <p>Amazon Payment Products</p>
          <a>Amazon Business Card</a>
          <a>Shop with Points</a>
          <a>Reload Your Balance</a>
          <a>Investor Relations</a>
          <a>Amazon Currency Converter</a>
        </ul>
        <ul>
          <p>Let Us Help You</p>
          <a>Amazon and COVID-19</a>
          <a>Your Account</a>
          <a>Shipping Rates & Policies</a>
          <a>Returns & Replacements</a>
          <a>Manage Your Content and Devices</a>
          <a>Amazon Assistant</a>
        </ul>
      </div>

      <div className="foot-panel3">
        <Link to="/"><div className="logo1"></div></Link>
      </div>

      <div className="foot-panel4">
        <div className="pages">
          <a>Conditions of Use</a>
          <a>Privacy Notice</a>
          <a>Your Ads Privacy Choices</a>
        </div>
        <div className="copyright">
          © 1996-2023, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </footer>
  );
}

export default Footer;
