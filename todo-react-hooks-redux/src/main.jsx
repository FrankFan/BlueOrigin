import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};

render();

// store.subscribe(render);
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// const defaultState = 0;
// const reducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case 'ADD':
//       return state + action.payload;
//     default:
//       return state;
//   }
// };

// window.reducer = reducer;

// const state = reducer(1, {
//   type: 'ADD',
//   payload: 2
// });

// const Counter = ({ value }) => <h1>{value}</h1>;

// const MyButton = () => <button onClick={clickBtn}>add</button>;

// const clickBtn = () => {
//   store.dispatch({
//     type: 'ADD',
//     payload: 1,
//   });
// };
