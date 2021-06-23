class TodoStore {
  todos = [];

  get completedTodos() {
    return this.todos.filter((todo) => todo.completed === true).length;
  }

  report() {
    if (this.todos.length === 0) {
      return '<none>';
    }
  }

  addTodo(title) {
    this.todos.push({
      id: +new Date(),
      title: title,
      completed: false,
    });
  }
}
