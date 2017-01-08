import React from 'react';

// Compose a store-connected React container
export default function createConnector (stateSelector, actionSelector) {
  return function connect (Component) {
    return class Connected extends React.Component {
      // Access the store from the Provider context
      static contextTypes = {
        store: React.PropTypes.object,
        actions: React.PropTypes.object
      };

      componentWillMount() {
        // Observe changes from the store
        this.context.store.subscribe(state => {
          // Generate properties for the connected component
          // based on the provided selector
          this.setState(stateSelector(state));
        });

        // Provide actions to the connected component
        this.setState(actionSelector(this.context.actions));
      }

      render () {
        return (
          <Component {...this.props} {...this.state} />
        );
      }
    }
  }
}
