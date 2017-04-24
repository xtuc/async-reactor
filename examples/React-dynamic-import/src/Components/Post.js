import React from 'react'

export default function Post({title, body}) {
  return (
    <article className="box">
      <h2>{title}</h2>

      <p>{body}</p>
    </article>
  );
}
