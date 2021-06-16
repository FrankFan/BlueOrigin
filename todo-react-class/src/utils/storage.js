const STORAGE_KEY = 'todos-react-class';

export default {
  fetch() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};
