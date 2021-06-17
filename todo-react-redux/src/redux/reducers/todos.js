export default function todoApp(state = [], action) {
  switch (action.type) {
    case 'LOAD_TODO':
      return action.payload;
    case 'ADD_TODO':
      const newTodo = action.payload;
      return [...state, newTodo];
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);
    case 'UPDATE_TODO':
      const editTodo = action.payload;
      return state.map((todo) =>
        todo.id === editTodo.id ? { ...todo, title: editTodo.title } : todo
      );
    case 'TOGGLE_TODO':
      const { id } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'TOGGLE_ALL':
      return state.map((todo) => {
        return { ...todo, completed: !todo.completed };
      });
    case 'CLEAR_COMPLETED':
      return state.filter((todo) => todo.completed === false);
    case 'COMPLETE_ALL_TODOS':
      return state.filter((todo) => todo.completed);
    default:
      return state;
  }
}
