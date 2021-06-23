import React, { useState, useRef, useEffect } from 'react';
import 'todomvc-app-css/index.css';
import todoStorage from './utils/storage';
import filter from './utils/filter';
import { getMaxId, pluralize, getHash } from './utils/index';
import classNames from 'classnames';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState(todoStorage.fetch());
  const [editedTodo, setEditedTodo] = useState(null);
  const editTodoRef = useRef([]);
  const [editTodoValue, setEditTodoValue] = useState('');
  const [beforeEditCache, setBeforeEditCache] = useState('');
  const [remaining, setRemaining] = useState(filter.active(todos).length);
  const [visibility, setVisibility] = useState(getHash() || 'all');

  // 用于渲染的 todolist
  const filteredTodos = filter[visibility](todos);

  // 用于监听hash值的变化
  useEffect(() => {
    function hashchangeHandler() {
      const visibility = getHash() || 'all';
      setVisibility(visibility);
    }
    window.addEventListener('hashchange', hashchangeHandler);
  }, []);

  function addTodo(value) {
    if (value) {
      todos.push({
        id: getMaxId(todos) + 1,
        title: value.trim(),
        completed: false,
      });
      setTodos(todos);
      setNewTodo('');
      setRemaining(filter.active(todos).length);
      // 手动调用保存方法
      todoStorage.save(todos);
    }
  }
  function removeTodo(todo) {
    todos.splice(todos.indexOf(todo), 1);
    setTodos([...todos]);
    setRemaining(filter.active(todos).length);

    // 手动调用保存方法
    todoStorage.save(todos);
  }

  function onToggleChange(todo) {
    todo.completed = !todo.completed;
    setTodos([...todos]);
    setRemaining(filter.active(todos).length);

    // 手动调用保存方法
    todoStorage.save(todos);
  }

  function onAllDoneChange(e) {
    todos.forEach((todo) => (todo.completed = !e.target.checked));
    setTodos([...todos]);
    setRemaining(filter.active(todos).length);

    // 手动调用保存方法
    todoStorage.save(todos);
  }

  function editTodoItem(todo) {
    setEditedTodo(todo);
    setEditTodoValue(todo.title);
    setBeforeEditCache(todo.title);

    setTimeout(() => {
      editTodoRef.current[todo.id].focus();
    }, 0);
  }

  function onEditInputChange(e) {
    setEditTodoValue(e.target.value);
  }

  function onEditInputKeyUp(todo, e) {
    if (e.key === 'Enter') {
      doneEdit(todo);
    }

    if (e.key === 'Escape') {
      cancelEdit(todo);
    }
  }

  function doneEdit(todo) {
    if (!editedTodo) return;
    if (editTodoValue) {
      todos[todos.indexOf(todo)].title = editTodoValue.trim();
      setTodos([...todos]);

      // 手动调用保存方法
      todoStorage.save(todos);
    } else {
      removeTodo(todo);
    }
    // cleanup
    setEditedTodo(null);
    setBeforeEditCache('');
    setEditTodoValue('');
  }

  function cancelEdit(todo) {
    todo.title = beforeEditCache;

    // cleanup
    setEditedTodo(null);
    setBeforeEditCache('');
    setEditTodoValue('');
  }
  function removeCompleted() {
    const activeTodos = filter.active(todos);
    setTodos([...activeTodos]);

    // 手动调用保存方法
    todoStorage.save(activeTodos);
  }

  return (
    <>
      <section className='todoapp'>
        <header className='header'>
          <h1>todo hooks</h1>
          <input
            className='new-todo'
            type='text'
            autoFocus
            autoComplete='off'
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                addTodo(e.target.value);
              }
            }}
            placeholder='What needs to be done?'
          />
        </header>
        <section className='main'>
          <input
            id='toggle-all'
            className='toggle-all'
            type='checkbox'
            onChange={onAllDoneChange}
          />
          <label htmlFor='toggle-all'>Mark all as completed</label>
          <ul className='todo-list'>
            {filteredTodos.map((todo) => {
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
                      onChange={() => onToggleChange(todo)}
                    />
                    <label onDoubleClick={() => editTodoItem(todo)}>
                      {todo.title}
                    </label>
                    <button
                      onClick={() => {
                        removeTodo(todo);
                      }}
                      className='destroy'
                    ></button>
                  </div>
                  <input
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
                  />
                </li>
              );
            })}
          </ul>
        </section>
        <footer className='footer'>
          <span className='todo-count'>
            <strong>{remaining}</strong> {pluralize('item', remaining)} left
          </span>
          <ul className='filters'>
            <li>
              <a
                className={classNames({
                  selected: visibility === 'all',
                })}
                href='#/all'
              >
                All
              </a>
            </li>
            <li>
              <a
                className={classNames({
                  selected: visibility === 'active',
                })}
                href='#/active'
              >
                Active
              </a>
            </li>
            <li>
              <a
                className={classNames({
                  selected: visibility === 'completed',
                })}
                href='#/completed'
              >
                Completed
              </a>
            </li>
          </ul>
          {/* <!-- Hidden if no completed items are left ↓ --> */}
          {todos.length > remaining ? (
            <button className='clear-completed' onClick={removeCompleted}>
              Clear Completed
            </button>
          ) : null}
        </footer>
      </section>
      <footer className='info'>
        <p>Double-click to edit a todo</p>
        <p>
          Template by
          <a href='http://sindresorhus.com'> Sindre Sorhus</a>
        </p>
        {/* <!-- Change this out with your name and url ↓ --> */}
        <p>
          Created by
          <a href='http://todomvc.com'> you</a>
        </p>
        <p>
          Part of
          <a href='http://todomvc.com'> TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;
