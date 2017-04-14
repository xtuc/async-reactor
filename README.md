# async-reactor

> Render async Stateless Functional Components

## Installation

```shell
npm install --save async-reactor
```

## Usage

```js
asyncReactor(component: Function, loader?: Component): Component
```

| name               | type             | description                                     |
|--------------------|------------------|-------------------------------------------------|
| component          | Function (async) | The `async` component you want to render        |
| loader (optionnal) | Component        | Will be shown until the first component renders |

The returned value is a regular `Component`.

### Example

```js
import React from 'react';
import {asyncReactor} from 'async-reactor';

function Loader() {

  return (
    <h2>Loading ...</h2>
  );
}

async function AsyncPosts() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await data.json();

  return (
    <ul>
      {posts.map((x) => <h3 key={x.id}>{x.title}</h3>)}
    </ul>
  );
}

export default asyncReactor(AsyncPosts, Loader);
```

This example exports a regular React component. You can integrate it into an existing application or render it on the page.

See more examples [here](https://github.com/xtuc/async-reactor/tree/master/examples)
