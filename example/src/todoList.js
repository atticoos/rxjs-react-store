import React from 'react';
import connect from 'rxjs-react-store/lib/connect.js';
import {Button, Form, FormControl} from 'react-bootstrap';

class TodoList extends React.Component {
  addTodo (e) {
    if (e) {
      e.preventDefault();
    }
    this.props.addTodo(this.props.newTodo);
    this.props.clearNewTodoText();
  }

  render () {
    return (
      <div>
        <h2>Todo List</h2>

        {/* Input form */}
        <Form inline onSubmit={e => this.addTodo(e)}>
          <FormControl
            type="text"
            value={this.props.newTodo}
            onChange={e => this.props.setNewTodoText(e.target.value)}
          />
          <Button onClick={() => this.addTodo()}>Add</Button>
        </Form>

        {/* List of Todos */}
        <ul>
          {this.props.todos.map((todo, i) => (
            <TodoItem
              key={i}
              todo={todo}
              onRemove={() => this.props.removeTodo(todo)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

function TodoItem ({todo, onRemove}) {
  return (
    <li>
      {todo}
      {' '}
      <a href="#" onClick={onRemove}>x</a>
    </li>
  );
}

// Select the values from the state.
// These will become properties on the component.
// Reselect can also be used.
const selector = state => ({
  todos: state.todos,
  newTodo: state.newTodo
});

// Select the actions from the store's actions.
// These will become properties on the component.
const actions = storeActions => ({
  addTodo: storeActions.todos.add,
  removeTodo: storeActions.todos.remove,
  setNewTodoText: storeActions.newTodo.setText,
  clearNewTodoText: storeActions.newTodo.clearText
});

// Connect the store and actions to the component.
export default connect(selector, actions)(TodoList);
