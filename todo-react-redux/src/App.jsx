import React, { useState } from 'react';
import classNames from 'classnames';
import 'todomvc-app-css/index.css';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  function onInputKeyUp(e) {
    const { value } = e.target;
    if (!value) {
      return;
    }

    if (e.key === 'Enter') {
      addTodo({
        id: +new Date(),
        title: value.trim(),
        completed: false,
      });
    }
  }

  function addTodo(todo) {
    todos.push(todo);
    console.log('addTodo', todos);
    setTodos([...todos]);
    setNewTodo('');
  }

  return (
    <>
      <section className='todoapp'>
        <header className='header'>
          <h1>todo Redux</h1>
          <input
            autoFocus
            autoComplete='off'
            className='new-todo'
            placeholder='What needs to be done?'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyUp={onInputKeyUp}
          />
        </header>
        <section className='main'>
          <input id='toggle-all' className='toggle-all' type='checkbox' />
          <label htmlFor='toggle-all'>Mark all as completed</label>
          <ul className='todo-list'>
            {todos.map((todo) => {
              const liClzName = classNames({
                completed: todo.completed,
                editing: todo === editedTodo,
              });
              return (
                <li key={todo.id} className={liClzName}>
                  <div className='view'>
                    <input className='toggle' type='checkbox' />
                    <label>{todo.title}</label>
                    <button className='destroy'></button>
                  </div>
                  {/* <input
                    className='edit'
                    ref={(el) => (editTodoRef.current[todo.id] = el)}
                    value={editTodoValue}
                    onChange={onEditInputChange}
                    onKeyUp={(e) => {
                      onEditInputKeyUp(todo, e);
                    }}
                    onBlur={(e) => {
                      doneEdit(todo);
                    }}
                  /> */}
                </li>
              );
            })}
          </ul>
        </section>
      </section>
      <footer className='info'>
        <p>Double-click to edit a todo</p>
        <p>
          Written by <a href='void:javascript(0)'>Frank Fan</a>
        </p>
        <p>
          Part of <a href='http://todomvc.com'>TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;
