# async-reactor

> Render async Stateless Functional Components

## Installation

```shell
npm install --save async-reactor
```

## Example

component.js:
```js
import React from 'react';
import {asyncReactor} from 'async-reactor';

async function AsyncPosts() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await data.json();

  return (
    <ul>
      {posts.map((x) => <h3 key={x.id}>{x.title}</h3>)}
    </ul>
  );
}

export default asyncReactor(AsyncPosts);
```

index.js:
```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './component';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```
