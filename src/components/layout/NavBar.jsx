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
    </nav>
  );
}
