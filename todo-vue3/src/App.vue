<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos vue3</h1>
      <input
        class="new-todo"
        type="text"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="state.newTodo"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
      <label for="toggle-all">Mark all as completed</label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          :data-set-x="todo === editedTodo"
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
    <footer v-show="filteredTodos.length > 0" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ pluralize('item', remaining) }} left
      </span>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
        </li>
        <li>
          <a href="#/active" :class="{ selected: visibility === 'active' }">Active</a>
        </li>
        <li>
          <a href="#/completed" :class="{ selected: visibility === 'completed' }">Completed</a>
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="state.todos.length > remaining"
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
</template>

<script setup>
import { ref, reactive, watch, computed, isReactive } from 'vue';
import { getMaxId, pluralize } from './utils/index.js';
import todoStorage from './utils/store.js';
import filter from './utils/filter.js';

// data
const state = reactive({
  newTodo: '',
  todos: todoStorage.fetch(),
});
let editedTodo = ref(null);
let beforeEditCache = '';
const visibility = ref(location.hash.slice(2) || 'all');

// test
window.todos = state.todos;

// watch
watch(() => state.todos, (todos) => todoStorage.save(todos), { deep: true });

// computed
const remaining = computed(() => filter.active(state.todos).length);

const filteredTodos = computed(() => filter[visibility.value](state.todos));

const allDone = computed({
  get: () => remaining === 0,
  set: (value) => state.todos.forEach(todo => todo.completed = value),
});

// register hashchange event
window.addEventListener('hashchange', (e) => {
  visibility.value = e.currentTarget.location.hash.slice(2);
});

// methods
function addTodo() {
  const value = state.newTodo;
  if (value) {
    state.todos.push({
      id: getMaxId(state.todos) + 1,
      title: value.trim(),
      completed: false,
    });
    state.newTodo = '';
  }
}

function removeTodo(todo) {
  state.todos.splice(state.todos.indexOf(todo), 1);
}

function editTodoItem(todo) {
  beforeEditCache = todo.title;
  editedTodo.value = todo;
}

function doneEdit(todo) {
  if (!editedTodo.value) {
    return;
  }
  editedTodo.value = null;
  todo.title = todo.title.trim();
  if (!todo.title) {
    removeTodo(todo);
  }
}

function cancelEdit(todo) {
  editedTodo.value = null;
  todo.title = beforeEditCache;
}

function removeCompleted() {
  state.todos = filter.active(state.todos);
}

</script>

<style>
@import url("todomvc-app-css");
</style>
