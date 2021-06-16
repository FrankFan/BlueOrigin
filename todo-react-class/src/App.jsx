import React from 'react';
import 'todomvc-app-css/index.css';
import todoStore from './utils/storage';
import { getMaxId, pluralize, getHash } from './utils/';
import filter from './utils/filter';
import todoStorage from './utils/storage';
import classNames from 'classnames';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodo: '',
      todos: todoStore.fetch(),
      editedTodo: null,
      beforeEditCache: '',
      editedTitle: '',
      visibility: location.hash.slice(2) || 'all',
      remaining: filter.active(todoStorage.fetch()).length,
    };

    // https://dev.to/ajsharp/-an-array-of-react-refs-pnf
    this.myRefs = {};
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const visibility = getHash() || 'all';
      this.setState({
        visibility,
      });
    });
  }

  onChange = (e) => {
    this.setState({
      newTodo: e.target.value,
    });
  };

  onKeyUp = (e) => {
    const { value } = e.target;
    if (!value) {
      return;
    }
    if (e.key === 'Enter') {
      this.addTodo(value);
    }
  };

  addTodo = (title) => {
    const { todos } = this.state;

    todos.push({
      id: getMaxId(todos) + 1,
      title: title.trim(),
      completed: false,
    });
    this.setState({
      newTodo: '',
      todos: todos,
      remaining: filter.active(todos).length,
    });

    // 手动写入storage
    todoStore.save(todos);
  };

  removeTodo = (todo) => {
    console.log('removeTodo');
    const { todos } = this.state;
    todos.splice(todos.indexOf(todo), 1);
    this.setState({
      todos,
      remaining: filter.active(todos).length,
    });

    // 手动写入storage
    todoStore.save(todos);
  };

  onToggle = (todo, e) => {
    const { todos } = this.state;
    const { checked } = e.target;
    const index = todos.indexOf(todo);
    todos.splice(index, 1, { ...todo, completed: checked });
    this.setState({
      todos,
      remaining: filter.active(todos).length,
    });

    // 手动写入storage
    todoStore.save(todos);
  };

  onToggleAll = (e) => {
    const { todos } = this.state;
    const { checked } = e.target;
    todos.map((todo) => (todo.completed = !checked));
    this.setState({
      todos,
      remaining: filter.active(todos).length,
    });

    // 手动写入storage
    todoStore.save(todos);
  };

  focusTextInput = (id) => {
    // 创建ref
    this.myRefs['textInput' + id] = React.createRef();
    setTimeout(() => {
      // 注意：通过 "current" 来访问 DOM 节点
      const currentElement = this.myRefs['textInput' + id].current;
      currentElement.focus();
    }, 0);
  };

  editTodoItem = (todo) => {
    this.focusTextInput(todo.id);

    this.setState({
      editedTodo: todo,
      beforeEditCache: todo.title,
      editedTitle: todo.title,
    });
  };

  onEditInputChange = (e) => {
    this.setState({ editedTitle: e.target.value });
  };

  doneEdit = (todo) => {
    console.log(`doneEdit`);
    const { editedTitle, todos, editedTodo } = this.state;

    // ↓↓↓ 非常重要 ↓↓↓
    if (!editedTodo) return;
    // ↑↑↑ 不加会导致 Esc 按钮触发 cancelEdit -> doneEdit -> removeTodo

    const index = todos.indexOf(todo);
    if (editedTitle) {
      todos.splice(index, 1, { ...todo, title: editedTitle });
      this.setState({
        todos,
        editedTodo: null,
        beforeEditCache: '',
      });
    } else {
      this.removeTodo(todo);
    }

    // 手动写入storage
    todoStore.save(todos);
  };

  cancelEdit = (todo) => {
    console.log('cancelEdit');

    this.setState({
      editedTodo: null,
      beforeEditCache: '',
      editedTitle: '',
    });
  };

  onEditInputKeyUp = (e, todo) => {
    if (e.key === 'Enter') {
      this.doneEdit(todo);
    }

    if (e.key === 'Escape') {
      this.cancelEdit(todo);
    }
  };

  removeCompleted = () => {
    let { todos } = this.state;

    todos = filter.active(todos);
    this.setState({
      todos,
      remaining: filter.active(todos).length,
    });

    // 手动写入storage
    todoStorage.save(todos);
  };

  render() {
    const { newTodo, todos, editedTodo, editedTitle, remaining, visibility } =
      this.state;

    const renderedTodos = filter[visibility](todos);

    return (
      <>
        <section className='todoapp'>
          <header className='header'>
            <h1>todo react class</h1>
            <input
              className='new-todo'
              type='text'
              autoFocus
              autoComplete='off'
              placeholder='What needs to be done?'
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
              value={newTodo}
            />
          </header>
          <section className='main'>
            <input
              type='checkbox'
              id='toggle-all'
              className='toggle-all'
              onChange={this.onToggleAll}
            />
            <label htmlFor='toggle-all'>Mark all as completed</label>
            <ul className='todo-list'>
              {renderedTodos.map((todo) => {
                const clzName = classNames({
                  completed: todo.completed,
                  editing: todo === editedTodo,
                });
                return (
                  <li className={clzName} key={todo.id}>
                    <div className='view'>
                      <input
                        type='checkbox'
                        className='toggle'
                        checked={todo.completed}
                        onChange={(e) => this.onToggle(todo, e)}
                      />
                      <label onDoubleClick={this.editTodoItem.bind(this, todo)}>
                        {todo.title}
                      </label>
                      <button
                        onClick={() => {
                          this.removeTodo(todo);
                        }}
                        className='destroy'
                      ></button>
                    </div>
                    <input
                      type='text'
                      className='edit'
                      ref={this.myRefs['textInput' + todo.id]}
                      value={editedTitle}
                      onChange={(e) => {
                        this.onEditInputChange(e);
                      }}
                      onKeyUp={(e) => {
                        this.onEditInputKeyUp(e, todo);
                      }}
                      onBlur={() => {
                        this.doneEdit(todo);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
          {renderedTodos.length > 0 ? (
            <footer className='footer'>
              <span className='todo-count'>
                <strong>{remaining}</strong> {pluralize('item', remaining)} left
              </span>
              <ul className='filters'>
                <li>
                  <a
                    className={classNames({ selected: visibility === 'all' })}
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
              {/* Hidden if no completed items are left ↓ */}
              {todos.length > remaining ? (
                <button
                  onClick={this.removeCompleted}
                  className='clear-completed'
                >
                  Clear completed
                </button>
              ) : null}
            </footer>
          ) : null}
        </section>
        <footer className='info'>
          <p>Double-click to edit a todo</p>
          {/* <!-- Remove the below line ↓ --> */}
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
}

export default App;
