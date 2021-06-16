# todo-react-hooks

[visit online demo](http://todo-react-hooks-woad.vercel.app/)

![hooks](../react-hooks.png)

## 注意点

1. 操作`className`需要引入 [classnames](https://github.com/JedWatson/classnames#readme) 这个库；
2. 几个常用的 hooks: `useState, useEffect, useRef`;
3. React 的特点之一就是 `immutable`不可变的，所以`setState`时传递的参数一定要和之前的不一样：如`setTodos([...todos])` 而不是 `setTodos(todos)`， 后者是不会生效的。
4. 用 `hooks` 是写起来代码简洁，随处可见的 `function` 利于复用和单元测试。
