import React from 'react';

/**
 * Call a load function to load data
 * @param {React.Component} Component the component to change
 * @param {function} load the load function
 */
export default function withLoader(Component, load) {
  class NewComponent extends React.Component {
    // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
      load(this.props);
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  return NewComponent;
}
