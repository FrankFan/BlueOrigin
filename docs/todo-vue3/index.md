# todo-vue3

[visit online demo](https://todo-vue3-kappa.vercel.app/)

![vue3](../vue3.png)

开发环境：

- [Vue3](https://vue3js.cn/)
- [Vite.js](https://cn.vitejs.dev/)
- [Node.js](https://nodejs.org/en/)

## 一、主要功能

1. 先画 UI 界面

   - HTML：基本是固定结构，参考官方结构
   - CSS： 结构定好后，不需要自己写`CSS`，使用官方提供的 [todomvc-app-css](https://github.com/tastejs/todomvc-app-css#readme)，就可以套出来一个漂亮的页面。

2. 实现逻辑

   - 增: `addTodo`
   - 删除: `removeTodo`
   - 修改: `editTodo`
   - 过滤： `filters`
   - 路由切换: `hashchange`

3. 用户体验方面

- 自动聚焦 autofocus: 自定义指令 `v-todo-focus`
- 单复数
- `todo` 状态过滤

## 二、技术注意点

### 1. 响应式系统 `reactive` vs `ref`

数组直接赋值无法触发响应

```js
// 现象
const arr = reactive([]); // 注意：arr是一个Proxy对象
arr = [1, 2, 3]; // 失败，直接赋值会丢失响应性

// 解决办法1
const obj = reactive({
  arr: [],
});
obj.arr = [1, 2, 3];

// 解决办法2
const arr = reactive([]);
arr.push(...[1, 2, 3]);

// 解决办法3
const arr = reactive([]);

arr[0] = 1;
arr[1] = 2;
arr[2] = 3;

// 解决办法4
const arr = reactive([]);
arr.splice.apply(arr, [0, arr.length, ...[1, 2, 3]]);
// 总之就是通过各种方法触发响应式

// see more details https://xianh5.com/archives/58/
```

`reactive` 接受一个 `object`, 也就是它的参数需要是 `key-value` 的形式，才能通过`proxy`进行响应式包装。

数组应该用 `ref([])`，或者包裹在对象属性里 `reactive({ arr: [] })`才能实现响应式。
