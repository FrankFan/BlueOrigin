# 使用 react hooks + redux 实现一个 TodoAPp

## flux redux react-redux 一些概念

### 一、组件

`React`中组件可以分为`UI`组件和容器组件：UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。

### 单向数据流

![img](https://www.ruanyifeng.com/blogimg/asset/2016/bg2016011503.png)

## redux 常用 API

`import {createStore,combineReducers} from 'redux';`

<https://cn.redux.js.org/docs/api/>

### 1. createStore

创建全局 store 用来存放应用中所有的 state。

- 应用中有且仅有 1 个 store
- 改变 store 唯一的方法是 `dispatch action`
- 可以监听 state 的变化(store.subscribe)做一些事情。

<https://cn.redux.js.org/docs/api/Store.html>

### 1. combineReducers

## react-redux 常用 API

`import {connect} from 'react-redux';`

<http://cn.redux.js.org/docs/react-redux/>

## 实现过程

由于使用了 Redux，就可以划分组件开发了，跨组件通信通过使用 store 就可以了，合理的划分 reducer 可以减少很多工作量。

此外，在纯 hooks 版本和纯 class API 版本中，保存数据需要手动多次调用 `todoStorage.save()` 方法，稍显重复。但是有了 store 以后，就可以很轻松的订阅 store 的变化事件，在回调函数中调用一次`todoStorage.save()`即可。

```js
store.subscribe(() => {
  const { todos } = store.getState();
  todoStorage.save(todos);
});
```
