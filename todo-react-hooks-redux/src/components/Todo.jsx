import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { removeTodo, toggleTodo, updateTodo } from '../redux/actions';
import { connect } from 'react-redux';
import filter from '../utils/filter';

function Todo({ todo, todos, removeTodo, toggleTodo, updateTodo }) {
  const [editedTodo, setEditedTodo] = useState(null);
  const [editTodoValue, setEditTodoValue] = useState('');
  const [beforeEditCache, setBeforeEditCache] = useState('');
  const editTodoRef = useRef('');

  function editTodo(todo) {
    setBeforeEditCache(todo.title.trim());
    setEditTodoValue(todo.title.trim());
    setEditedTodo(todo);

    setTimeout(() => {
      editTodoRef.current.focus();
    }, 0);
  }

  function doneEdit(todo) {
    if (!editedTodo) return;
    if (editTodoValue) {
      todo.title = editTodoValue;

      updateTodo(todo);
    } else {
      removeTodo(todo);
    }

    // cleanup
    setEditedTodo(null);
    setEditTodoValue('');
    setBeforeEditCache('');
  }

  function cancelEdit(todo) {
    todo.title = beforeEditCache;

    // cleanup
    setEditedTodo(null);
    setBeforeEditCache('');
    setEditTodoValue('');
  }

  const clzName = classNames('todo', {
    editing: todo === editedTodo,
    completed: todo.completed,
  });

  return (
    <li className={clzName}>
      <div key={todo.id} className='view'>
        <input
          type='checkbox'
          className='toggle'
          checked={todo.completed}
          onChange={() => {
            toggleTodo({ id: todo.id });
          }}
        />
        <label
          onDoubleClick={() => {
            editTodo(todo);
          }}
        >
          {todo.title}
        </label>
        <button className='destroy' onClick={() => removeTodo(todo)}></button>
      </div>
      <input
        type='text'
        className='edit'
        ref={editTodoRef}
        value={editTodoValue}
        onChange={(e) => {
          setEditTodoValue(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            doneEdit(todo);
          } else if (e.key === 'Escape') {
            cancelEdit(todo);
          }
        }}
        onBlur={() => doneEdit(todo)}
      />
    </li>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps, {
  removeTodo,
  toggleTodo,
  updateTodo,
})(Todo);
