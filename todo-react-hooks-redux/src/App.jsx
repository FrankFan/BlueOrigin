import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Filter from './components/Filter';
import 'todomvc-app-css/index.css';
import store from './redux/store';
import todoStorage from './utils/storage';

store.subscribe(() => {
  const { todos } = store.getState();
  todoStorage.save(todos);
});

function App() {
  return (
    <>
      <section className='todoapp'>
        <AddTodo />
        <TodoList />
        <Filter />
      </section>
      <footer className='info'>
        <p>Double-click to edit a todo</p>
        <p>
          Written by <a href='void:javascript(0)'>you</a>
        </p>
        <p>
          Part of <a href='http://todomvc.com'>TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;
