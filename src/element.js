/* @flow */
import {Component, createElement} from 'react';

export function createReactorElement(
  Reactor: Component<any,any,any>,
  component: Function,
  loaderComponent: Component<any,any,any> | string = 'div'
) {

  return function renderReactorElement(passthroughProps: Object = {}) {
    const props = {
      wait: component,
      loader: loaderComponent,
      passthroughProps: passthroughProps,
    };

    return createElement(Reactor, props);
  };
}
