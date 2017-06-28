import {Link} from 'react-router-dom';
import React from 'react';

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link to={'/routeA'}>RouteA</Link>
      </li>
      <li>
        <Link to={'/'}>Home</Link>
      </li>
      <li>
        <Link to={'/routeError'}>Error</Link>
      </li>
    </ul>
  );
}
