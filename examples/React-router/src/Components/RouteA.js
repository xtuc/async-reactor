import React from 'react';
import {asyncReactor} from 'async-reactor';
import {Loader} from './Loader';
import {Error} from './Error';
import Navigation from './Navigation';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function RouteA() {
  await sleep(1000);

  const style = {backgroundColor: '#4CAF50'};

  return (
    <div className="container">
      <article className="box" style={style}>
        <h2>Route A</h2>

        <Navigation />
      </article>
    </div>
  );
}

export default asyncReactor(RouteA, Loader, Error);
