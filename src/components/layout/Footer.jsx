import React from 'react';
import './Footer.less';

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="content">
          <div className="brand">
            <div>
            Our goal at MortgageKaki.com is to provide valuable advice
            to housing loan at the best interest rates to
            clients who would like to purchase or refinance
            residential properties in Singapore
            </div>
            <div className="phone">
              <i className="fas fa-phone-volume" />
              <a href="tel:+6597367168">+65-9736-7168</a>
            </div>
          </div>
          <div className="menu">
            <ul className="listnone">
              <li>
                <i className="fas fa-angle-right" />
                <a href="http://mortgagekaki.com/">Home</a>
              </li>
              <li>
                <i className="fas fa-angle-right" />
                <a href="http://www.mortgagekaki.com/?page_id=1626">About Us</a>
              </li>
              <li>
                <i className="fas fa-angle-right" />
                <a href="http://www.mortgagekaki.com/?page_id=1448">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="facebook">
            <i className="fab fa-facebook-f" />
            <a href="https://www.facebook.com/mortgagekaki">facebook</a>
          </div>
        </div>
      </div>
      <div className="tiny-footer">
        <div className="copyright">
        © Copyright 2018| MortgageKaki.com
        </div>
        <div className="term">
          <a href="http://www.mortgagekaki.com/?page_id=34">Terms of use</a>
          {' '}
          |
          {' '}
          <a href="http://www.mortgagekaki.com/?page_id=29">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
