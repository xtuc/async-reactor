/* @flow */

import {Component, createElement} from 'react';

function isFunction(p) {
  return typeof p === 'function'
}

function isPromise(p = {}) {
  return isFunction(p.then);
}

function defer(fn) {
  setTimeout(fn, 0);
}

export class Reactactor extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {

    defer(() => {

      const promise = this.props.wait(this.props.passthroughProps);

      if (!isPromise(promise)) {
        throw new Error('you must provide an async component');
      }

      promise
        .then((data) => {
          this.setState({data});
        })
      .catch((err) => {
        throw err;
      });
    });
  }

  render() {
    if ('data' in this.state) {
      return this.state.data;
    }

    return createElement(this.props.loader);
  }
}

export function asyncReactor(component, loaderComponent = 'div') {
  if (!isFunction(component)) {
    throw new Error('you must provide an async component');
  }

  return function (passthroughProps = {}) {
    const props = {
      wait: component,
      loader: loaderComponent,
      passthroughProps: passthroughProps,
    };

    return createElement(Reactactor, props);
  };
}
