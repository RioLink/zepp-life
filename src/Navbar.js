import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Головна</Link>
        </li>
        <li>
          <Link to="/training">Тренування</Link>
        </li>
        <li>
          <Link to="/saved">Збережене</Link>
        </li>
        <li>
          <Link to="/account">Акаунт</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
