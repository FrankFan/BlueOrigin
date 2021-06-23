import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTodo, toggleAllTodos, setRemaining } from '../redux/actions';
import Todo from './Todo';
import todoStorage from '../utils/storage';
import filter from '../utils/filter';

function TodoList({
  todos,
  visibility,
  loadTodo,
  toggleAllTodos,
  setRemaining,
}) {
  useEffect(() => {
    loadTodo(todoStorage.fetch());
  }, []); // <-- 只执行一次

  useEffect(() => {
    setRemaining(filter.active(todos).length);
  }); // <-- 每次都会执行

  const filteredTodos = filter[visibility](todos);

  return (
    <section className='main'>
      <input
        type='checkbox'
        id='toggle-all'
        className='toggle-all'
        onChange={(e) => {
          toggleAllTodos(e.target.checked);
        }}
      />
      <label htmlFor='toggle-all'></label>
      <ul className='todo-list'>
        {filteredTodos.length > 0
          ? filteredTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
          : null}
      </ul>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    visibility: state.visibility,
  };
};

export default connect(mapStateToProps, {
  loadTodo,
  toggleAllTodos,
  setRemaining,
})(TodoList);
