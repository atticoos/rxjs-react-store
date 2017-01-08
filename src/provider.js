import React from 'react';

// Provides the Store to a Connected Container
export default class StoreProvider extends React.Component {
  static childContextTypes = {
    store: React.PropTypes.object,
    actions: React.PropTypes.object
  };
  getChildContext() {
    return {
      store: this.props.store,
      actions: this.props.actions
    };
  }
  render () {
    return this.props.children;
  }
}
