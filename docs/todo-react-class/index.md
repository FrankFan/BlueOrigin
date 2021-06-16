# todo-react-class

[visit online demo](http://todo-react-hooks-woad.vercel.app/)

![vue3](../react-class.png)

## 注意点

1. 操作`className`需要引入 [classnames](https://github.com/JedWatson/classnames#readme) 这个库；
2. React 的特点之一就是 `immutable`不可变的，所以`setState`时传递的参数一定要和之前的不一样：如`this.setState({todos: [...todos]})` 而不是 `this.setState({ todos })`， 后者是不会生效的。
3. 通过`refs`操作`DOM`需要注意

   1） 使用一个全局对象`this.myRefs={}`保存所有的`input`元素。

   2） 在 `jsx` 中绑定 `ref`

   3） 在双击时通过`React.createRef()`创建`ref`

4. 对比`hooks`的写法，`class`写起来略显繁琐。
