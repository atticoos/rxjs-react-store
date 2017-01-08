import React from 'react';
import ReactDom from 'react-dom';
import Provider from 'rxjs-react-store/lib/provider';
import TodoList from './todoList';
import createStore from './store';

const {actions, store} = createStore();

class App extends React.Component {
  render () {
    return (
      <Provider store={store} actions={actions}>
        <TodoList />
      </Provider>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);
