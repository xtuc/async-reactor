import './App.css';

import React from 'react'
import {asyncReactor} from 'async-reactor';

function Error(props) {

  return (
    <div className='container'>
      <div className='box'>
        <h2>An error occurred</h2>
      </div>
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

const Post = asyncReactor(import('./Components/Post'), Loader, Error);

async function AsyncPosts() {
  const Container = (await import('./Components/Container')).default;

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

export default asyncReactor(AsyncPosts, Loader, Error);
