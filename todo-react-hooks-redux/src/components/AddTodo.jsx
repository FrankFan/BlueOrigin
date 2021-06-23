import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions';
import store from '../redux/store';
import { getMaxId } from '../utils/index';

function AddTodo({ addTodo }) {
  const [newTodo, setNewTodo] = useState('');

  return (
    <header className='header'>
      <h1>Hooks Redux</h1>
      <input
        autoFocus
        autoComplete='off'
        className='new-todo'
        placeholder='What needs to be done?'
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && newTodo !== '') {
            const { todos } = store.getState();
            addTodo({
              id: getMaxId(todos) + 1,
              title: newTodo.trim(),
              completed: false,
            });
            setNewTodo('');
          }
        }}
      />
    </header>
  );
}

// use Redux

const mapStateToProps = null;

// Uncaught Error: Actions must be plain objects. Use custom middleware for async actions.
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addNewTodo: () => {
//       dispatch(addTodo);
//     },
//   };
// };

export default connect(mapStateToProps, { addTodo })(AddTodo);
