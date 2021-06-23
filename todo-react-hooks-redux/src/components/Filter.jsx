import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { pluralize, getHash } from '../utils/index';
import filter from '../utils/filter';
import { clearCompleted, setVisibility } from '../redux/actions';

function Filter({
  todos,
  remaining,
  visibility,
  clearCompleted,
  setVisibility,
}) {
  // 用于监听hash值的变化
  useEffect(() => {
    function hashchangeHandler() {
      const visibility = getHash();
      console.log('[visibility] = ', visibility);
      setVisibility(visibility);
    }
    window.addEventListener('hashchange', hashchangeHandler);
  }, []); // <---- 只运行一次

  function removeCompleted() {
    const activeTodos = filter.active(todos);
    clearCompleted(activeTodos);
  }

  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{remaining}</strong> {pluralize('item', remaining)} left.
      </span>
      <ul className='filters'>
        <li>
          <a
            href='#/all'
            className={classNames({ selected: visibility === 'all' })}
          >
            All
          </a>
        </li>
        <li>
          <a
            href='#/active'
            className={classNames({ selected: visibility === 'active' })}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href='#/completed'
            className={classNames({
              selected: visibility === 'completed',
            })}
          >
            Completed
          </a>
        </li>
      </ul>
      {todos.length > remaining ? (
        <button onClick={removeCompleted} className='clear-completed'>
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    remaining: state.remaining,
    visibility: state.visibility,
  };
};

export default connect(mapStateToProps, { clearCompleted, setVisibility })(
  Filter
);
