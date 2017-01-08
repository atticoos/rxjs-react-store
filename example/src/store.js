import {createReducer, combineReducers} from 'rxjs-store';


const TodoActions = {
  /**
   * Add a todo item.
   *
   * 1. The new todo is passed in.
   * 2. Then the store will pass in the last list of todos.
   * 3. Finally the action will return the next list of todos w/ the new item back to the store.
   */
  add: newTodo => todos => todos.concat(newTodo),

  /**
   * Remove a todo item.
   *
   * 1. The todo to remove is passed in.
   * 2. Then the store will pass in the last list of todos.
   * 3. Finally the action will return the next list of todos w/o the item back to the store.
   */
  remove: oldTodo => todos => todos.filter(todo => todo !== oldTodo)
};

const NewTodoActions = {
  /**
   * Update the current text of a new todo item.
   *
   * 1. The new text is passed in.
   * 2. Then the store will call the returned function; no last state is necessary here
   *    since we always want the latest value to be the next state.
   * 3. Finally the new text is returned, which becomes the next state.
   */
  setText: text => () => text,

  /**
   * Clears the current text of a new todo item.
   *
   * 1. No input is passed in, as this is purely a command.
   * 2. No last state is needed, as this is purely a command.
   * 3. Finally an empty string is returned, which becomes the next state.
   */
  clearText: () => () => ''
};

export default function createStore () {
  const todos = createReducer(TodoActions, []);
  const newTodo = createReducer(NewTodoActions, '');

  // Composes a store, which will produce values in the same tree structure as defined.
  // Example:
  // {todos: todos.store, newTodo: newTodo.store}
  //
  // Becomes:
  // {todos: ['a', 'b'], newTodo: 'c'}
  const store = combineReducers({
    todos: todos.store,
    newTodo: newTodo.store
  });

  // An object of composed store actions
  const actions = {
    todos: todos.actions,
    newTodo: newTodo.actions
  };

  return {store, actions};
}
