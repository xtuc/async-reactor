import './App.css';

import React from 'react';
import {asyncReactor} from 'async-reactor';

function Error({postsUrl}) {

  return (
    <div className='container'>
      <h2>Error: cannot load {postsUrl}</h2>
    </div>
  );
}

function Loader() {

  return (
    <div className='container'>
      <div className='box'>
        <h2>Loading ...</h2>
      </div>
    </div>
  );
}

async function AsyncPosts({postsUrl}) {
  const data = await fetch(postsUrl);
  const posts = await data.json();

  return (
    <div className='container'>
      {posts.map((post) => (

        <article key={post.id} className='box'>
          <h2>{post.title}</h2>

          <p>{post.body}</p>
        </article>

      ))}
    </div>
  );
}

export default asyncReactor(AsyncPosts, Loader, Error);
