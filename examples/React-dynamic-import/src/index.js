import React from 'react';
import {render} from 'react-dom';
import {asyncReactor} from 'async-reactor';

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
