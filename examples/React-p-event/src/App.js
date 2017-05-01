import './App.css';

import React from 'react'
import {asyncReactor} from 'async-reactor';
import pEvent from 'p-event';

function Loader() {

  return (
    <div className='container'>
      <div className='box'>
        <h1>Waiting for a key</h1>
      </div>
    </div>
  );
}

async function Component() {
  const {key} = await pEvent(document, 'keypress');

  return (
    <div className='container'>
      <div className='box'>
        <h1>Cool!</h1>

        <p>You entered: <b>{key}</b></p>
      </div>
    </div>
  );
}

export default asyncReactor(Component, Loader);
