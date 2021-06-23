export const loadTodo = (todo) => {
  return {
    type: 'LOAD_TODO',
    payload: [...todo],
  };
};

export const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    payload: { ...todo },
  };
};

export const removeTodo = (todo) => {
  return {
    type: 'REMOVE_TODO',
    payload: { ...todo },
  };
};

export const toggleTodo = (todo) => {
  return {
    type: 'TOGGLE_TODO',
    payload: { ...todo },
  };
};

export const updateTodo = (todo) => {
  return {
    type: 'UPDATE_TODO',
    payload: { ...todo },
  };
};

export const clearCompleted = (todo) => {
  return {
    type: 'CLEAR_COMPLETED',
    payload: [...todo],
  };
};

export const completeAllTodos = (todos) => {
  return {
    type: 'COMPLETE_ALL_TODOS',
    payload: [...todos],
  };
};

export const toggleAllTodos = (checked) => {
  return {
    type: 'TOGGLE_ALL',
    payload: checked,
  };
};

export const setRemaining = (remaining) => {
  return {
    type: 'SET_REMAINING',
    payload: remaining,
  };
};

export const setVisibility = (visibility) => {
  return {
    type: 'SET_VISIBILITY',
    payload: visibility,
  };
};
