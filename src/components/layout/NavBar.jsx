import React from 'react';
import './NavBar.less';

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="brand">
        <img
          alt="logo"
          src="/bank-logos/MortgageKaki.png"
          className="logo"
        />
      </div>
      <div className="actions">
        <a href="http://www.mortgagekaki.com/">
          Home
        </a>
        <a className="hide-on-mobile" href="http://www.mortgagekaki.com/about-us-2">
          WHY US
        </a>
        <a className="hide-on-mobile" href="http://www.mortgagekaki.com/contact-us">
          CONTACT US
        </a>
      </div>
    </nav>
  );
}
