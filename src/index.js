/* @flow */

import {Component, createElement, isValidElement} from 'react';

function isFunction(p) {
  return typeof p === 'function';
}

function isPromise(p = {}) {
  return isFunction(p.then);
}

type ReactorState = {
  data?: any
}

class Reactor extends Component {
  state: ReactorState;

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const promise = this.props.wait(this.props.passthroughProps);

    if (!isPromise(promise)) {
      throw new Error('You must provide an async component');
    }

    promise
      .then((data) => {
        this.setState({data});
      })
    .catch((err) => {
      throw err;
    });
  }

  render() {
    if ('data' in this.state) {
      return this.state.data;
    }

    return createElement(this.props.loader);
  }
}

export function asyncReactor(
  component: Function,
  loaderComponent: Component<any,any,any> | string = 'div'
) {
  if (isValidElement(component)) {
    throw new Error(
      'Incompatible React element given, please change'
      + ` asyncReactor(<${component.type.name} />) to asyncReactor(${component.type.name}).`
    );
  }

  if (!isFunction(component)) {
    throw new Error(`You must provide an async component, ${JSON.stringify(component)} given`);
  }

  return function (passthroughProps: Object = {}) {
    const props = {
      wait: component,
      loader: loaderComponent,
      passthroughProps: passthroughProps,
    };

    return createElement(Reactor, props);
  };
}
