import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './Components/Home';
import RouteA from './Components/RouteA';
import RouteError from './Components/RouteError';

import './index.css';

render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />

      <Route path="/routeA" component={RouteA} />
      <Route path="/routeError" component={RouteError} />
    </div>
  </Router>,
  document.querySelector('#app')
);
