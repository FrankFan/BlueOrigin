import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import 'todomvc-app-css/index.css';
import todoStorage from './utils/storage';
import { getMaxId } from './utils/index';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState(todoStorage.fetch());
  const [editedTodo, setEditedTodo] = useState(null);
  const editTodoRef = useRef([]);
  const [editTodoValue, setEditTodoValue] = useState('');

  function onInputKeyUp(e) {
    const { value } = e.target;
    if (!value) {
      return;
    }

    if (e.key === 'Enter') {
      addTodo({
        id: getMaxId(todos) + 1,
        title: value.trim(),
        completed: false,
      });
    }
  }

  function addTodo(todo) {
    todos.push(todo);
    setTodos([...todos]);
    setNewTodo('');

    // 手动调用保存方法
    todoStorage.save(todos);
  }

  function removeTodo(todo) {
    todos.splice(todos.indexOf(todo), 1);
    setTodos([...todos]);

    // 手动调用保存方法
    todoStorage.save(todos);
  }

  function onToggle(todo) {
    todo.completed = !todo.completed;
    setTodos([...todos]);

    // setRemaining(filter.active(todos).length);

    // 手动调用保存方法
    todoStorage.save(todos);
  }

  function onToggleAll(e) {
    todos.forEach((todo) => (todo.completed = !e.target.checked));
    setTodos([...todos]);

    // setRemaining(filter.active(todos).length);

    // 手动调用保存方法
    todoStorage.save(todos);
  }

  function editTodoItem(todo) {
    setEditedTodo(todo);
    setEditTodoValue(todo.title);

    setTimeout(() => {
      editTodoRef.current[todo.id].focus();
    }, 0);
  }

  function doneEdit(todo) {
    if (editTodoValue) {
      // save
      todos[todos.indexOf(todo)].title = editTodoValue.trim();
      setTodos([...todos]);

      // 手动调用保存方法
      todoStorage.save(todos);
    } else {
      // calcel
      removeTodo(todo);
    }

    // cleanup
    setEditedTodo(null);
    // setBeforeEditCache('');
  }

  function cancelEdit(todo) {}

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
          <input
            id='toggle-all'
            className='toggle-all'
            type='checkbox'
            onChange={onToggleAll}
          />
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
                    <input
                      className='toggle'
                      type='checkbox'
                      checked={todo.completed}
                      onChange={() => {
                        onToggle(todo);
                      }}
                    />
                    <label
                      onDoubleClick={() => {
                        editTodoItem(todo);
                      }}
                    >
                      {todo.title}
                    </label>
                    <button
                      className='destroy'
                      onClick={() => {
                        removeTodo(todo);
                      }}
                    ></button>
                  </div>
                  <input
                    className='edit'
                    ref={(el) => (editTodoRef.current[todo.id] = el)}
                    value={editTodoValue}
                    onChange={(e) => {
                      setEditTodoValue(e.target.value);
                    }}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        doneEdit(todo);
                      }
                      if (e.key === 'Escape') {
                        cancelEdit(todo);
                      }
                    }}
                    onBlur={(e) => {
                      doneEdit(todo);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </section>
      <footer className='info'>
        <p>Double-click to edit a todo</p>
        <p>
          Written by <a href='void:javascript(0)'>You</a>
        </p>
        <p>
          Part of <a href='http://todomvc.com'>TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;
