# RxJS Store

An RxJS React Store Container implementation.

Used well with [rxjs-store](https://github.com/ajwhite/rxjs-store).

## Simple Example
```js
import {connect} from 'rxjs-react-store';

class HelloWorld extends React.Component {
  render () {
    <h1>{this.props.text}</h1>
  }
}

const selector = state => ({
  text: state.text
});

connect(selector)(HelloWorld);
```

## Full Usage

```js
import {Provider, connect} from 'rxjs-react-store';
import {createReducer, combineReducers} from 'rxjs-store';

// Counter actions
const CounterActions = {
  increment: (amount = 1) => count => count + amount,
  decrement: (amount = 1) => count => count - amount
};

// Create the store reducers
const counter = createReducer(CounterActions, 0);

// Create the application store
const store = combineReducers({
  count: counter.store
});

// Create an object of the store actions
const actions = {
  counter: counter.actions
};

// Wrap the application in the Provider, passing the store and actions
class App extends React.Component {
  render () {
    return (
      <Provider store={store} actions={actions}>
        <Counter />
      </Provider>
    );
  }
}

// Create a basic counter component.
// The store's state and actions will come in as properties.
class Counter extends React.Component {
  render () {
    return (
      <div>
        <Button onPress={() => this.props.increment()}>
          Increment
        </Button>
        <Button onPress={() => this.props.decrement()}>
          Decrement
        </Button>
        Count: {this.props.count}
      </div>
    );
  }
}

// Select the state for the component.
// These will come in as properties
const selector = state => ({
  count: state.count
});

// Select the actions for the component.
// These will come in as properties
const actions = storeActions => ({
  increment: storeActions.counter.increment,
  decrement: storeActions.counter.decrement
});

// Connect the component with the store and actions
connect(selector, actions)(Counter);
```
