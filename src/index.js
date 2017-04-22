/* @flow */

import {Component, createElement, isValidElement} from 'react';
import {createReactorElement} from './element';

function interopRequireModule(obj) {
  return obj && obj.__esModule ? obj.default : obj;
}

function isFunction(p) {
  return typeof p === 'function';
}

function isPromise(p = {}) {
  return p && isFunction(p.then);
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
      let renderer: any = interopRequireModule(this.state.data);

      if (isFunction(renderer)) {
        renderer = createElement(renderer, this.props.passthroughProps);
      }

      return renderer;
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

  if (isPromise(component)) {
    return createReactorElement(
      Reactor,
      () => component,
      loaderComponent
    );
  }

  if (!isFunction(component)) {
    throw new Error(`You must provide an async component, ${JSON.stringify(component)} given`);
  }

  return createReactorElement(Reactor, component, loaderComponent);
}
