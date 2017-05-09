import React from 'react'
import {render} from 'react-dom'

import App from './App'

render(
  <App postsUrl='https://jsonplaceholder.typicode.com/posts'/>,
  document.querySelector('#app')
)
