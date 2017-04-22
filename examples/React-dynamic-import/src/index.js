import React from 'react';
import {render} from 'react-dom';
import {asyncReactor} from '../../../src';

function Loader() {

  return (
    <div className='container'>
      <div className='box'>
        <h2>Loading ...</h2>
      </div>
    </div>
  );
}

const App = asyncReactor(import('./App'), Loader);

render(<App/>, document.querySelector('#app'));
