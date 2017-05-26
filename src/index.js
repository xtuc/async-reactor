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
  _isMounted: boolean;
  _passthroughProps: Object;
  state: ReactorState;

  constructor(props: any) {
    super(props);

    this.state = {};
    this._passthroughProps = props.passthroughProps;
  }

  _handleError(error: Error) {
    const errorComponent = this.props.error;

    if (errorComponent && this._isMounted) {
      this._passthroughProps = {...this._passthroughProps, error};
      this._setResult(errorComponent);
    } else {
      throw error;
    }
  }

  _setResult(data) {
    if (this._isMounted) {
      this.setState({data: interopRequireModule(data)});
    }
  }

  componentDidMount() {
    this._isMounted = true;

    let promise;

    if (isPromise(this.props.wait)) {
      promise = this.props.wait;
    } else {
      promise = this.props.wait(this._passthroughProps);
    }

    if (!isPromise(promise)) {
      throw new Error('You must provide an async component');
    }

    promise
      .then(
        (data) => this._setResult(data),
        (err) => this._handleError(err)
      );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if ('data' in this.state) {
      const renderer: any = this.state.data;

      if (isFunction(renderer)) {
        return createElement(renderer, this._passthroughProps);
      } else {
        return renderer;
      }
    }

    return createElement(this.props.loader);
  }
}

export function asyncReactor(
  component: Function,
  loaderComponent?: Component<any,any,any> | string,
  errorComponent?: Component<any,any,any> | string,
) {
  if (isValidElement(component)) {
    throw new Error(
      'Incompatible React element given, please change'
      + ` asyncReactor(<${component.type.name} />) to asyncReactor(${component.type.name}).`
    );
  }

  if (!loaderComponent) {
    loaderComponent = 'div';
  }

  if (!errorComponent) {
    errorComponent = 'div';
  }

  if (!isFunction(component) && !isPromise(component)) {
    throw new Error(`You must provide an async component, ${JSON.stringify(component)} given`);
  }

  return createReactorElement(Reactor, component, loaderComponent, errorComponent);
}
