import './App.css';

import React from 'react'
import {asyncReactor} from 'async-reactor';

async function AsyncPosts() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await data.json();

  return (
    <div className='container'>
      {posts.map((post) => (

        <article key={post.id}>
          <h2>{post.title}</h2>

          <p>{post.body}</p>
        </article>

      ))}
    </div>
  );
}

export default asyncReactor(AsyncPosts);
