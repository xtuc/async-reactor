import './App.css';

import React from 'react'
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

const Post = asyncReactor(import('./Components/Post'), Loader);
const Container = asyncReactor(import('./Components/Container'), Loader);

async function AsyncPosts() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await data.json();

  return (
    <Container>
      {posts.map((post) => (
        <Post title={post.title} body={post.body} key={post.id} />
      ))}
    </Container>
  );
}

export default asyncReactor(AsyncPosts, Loader);
