<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos vue2</h1>
        <input
          class="new-todo"
          type="text"
          autofocus
          autocomplete="off"
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="What needs to be done?"
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
        <label for="toggle-all">Mark all as completed</label>
        <ul class="todo-list">
          <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            :class="{ completed: todo.completed, editing: todo === editedTodo }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodoItem(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input
              class="edit"
              v-model="todo.title"
              v-todo-focus="todo == editedTodo"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
              @blur="doneEdit(todo)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length > 0">
        <span class="todo-count">
          <strong v-text="remaining"></strong>
          {{ pluralize('item', remaining) }} left
        </span>
        <ul class="filters">
          <li>
            <a :class="{ selected: visibility === 'all' }" href="#/all">All</a>
          </li>
          <li>
            <a :class="{ selected: visibility === 'active' }" href="#/active">Active</a>
          </li>
          <li>
            <a :class="{ selected: visibility === 'completed' }" href="#/completed">Completed</a>
          </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button
          @click="removeCompleted"
          v-show="todos.length > remaining"
          class="clear-completed"
        >Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <!-- Remove the below line ↓ -->
      <p>
        Template by
        <a href="http://sindresorhus.com">Sindre Sorhus</a>
      </p>
      <!-- Change this out with your name and url ↓ -->
      <p>
        Created by
        <a href="http://todomvc.com">you</a>
      </p>
      <p>
        Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>
</template>

<script>
import "todomvc-app-css/index.css";
import { getMaxId, pluralize } from './utils/index.js';
import todoStorage from './utils/storage.js';
import filter from './utils/filter.js';

export default {
  name: 'TodoApp',
  data() {
    return {
      newTodo: '',
      todos: todoStorage.fetch() || [],
      editedTodo: null,
      beforeEditCache: '',
      visibility: location.hash.slice(2) || 'all',
    }
  },
  watch: {
    todos(todos) {
      todoStorage.save(todos);
    }
  },
  computed: {
    remaining() {
      return filter.active(this.todos).length;
    },
    filteredTodos() {
      return filter[this.visibility](this.todos);
    },
    allDone: {
      get: function() {
        return this.remaining === 0;
      },
      set: function(value) {
        this.todos.forEach(todo => todo.completed = value);
      }
    }
  },
  created() {
    window.addEventListener('hashchange', (e) => {
      this.visibility = e.currentTarget.location.hash.slice(2);
    })
  },
  methods: {
    pluralize: pluralize,
    addTodo() {
      const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: getMaxId(this.todos) + 1,
        title: value,
        completed: false,
      });
      this.newTodo = '';
    },
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    editTodoItem(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },
    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },
    removeCompleted() {
      this.todos = filter.active(this.todos);
    },
  },
  directives: {
    'todo-focus': function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  }
}
</script>

<style lang="scss">
</style>
