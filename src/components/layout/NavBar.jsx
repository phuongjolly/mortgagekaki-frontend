import React from 'react';
import './NavBar.less';

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="brand">
        Mortgage Kaki
      </div>
      <div className="actions">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </nav>
  );
}
