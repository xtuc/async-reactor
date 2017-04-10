/* @flow */

import {Component, createElement} from 'react';

function isFunction(p) {
  return typeof p === 'function'
}

function isPromise(p = {}) {
  return isFunction(p.then);
}

export class Reactactor extends Component {
  _promise: Promise;

  constructor(props) {
    super(props);

    this.state = {};

    const promise = this.props.wait(this.props.passthroughProps);

    if (!isPromise(promise)) {
      throw new Error('you must provide an async component');
    }

    this._promise = promise;
  }

  componentWillMount() {

    this._promise
      .then((data) => {
        this.setState({data});
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    return this.state.data;
  }
}

export function asyncReactor(component) {
  if (!isFunction(component)) {
    throw new Error('you must provide an async component');
  }

  return function (passthroughProps = {}) {
    const props = {
      wait: component,
      passthroughProps: passthroughProps,
    };

    return createElement(Reactactor, props);
  };
}

