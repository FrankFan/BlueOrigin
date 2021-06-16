# Todo App

## 一、最终效果

![final](../hero.png))

## 二、需求分析

根据 [TodoMVC](https://todomvc.com/) 的规范，开发一个基本符合规格要求的 `TodoApp` 应用。

该文档记录了使用 `React.js` 和 `Vue.js` 这 2 个框架完成这个 `TodoApp` 的过程，一方面是为了学习如何利用前端框架快速开发应用，另一方面是使用一个开发者耳熟能详的高级 `HelloWorld` 版本的 `TodoApp`这一个例子进行框架的对比学习，看看到底整体上和细节上这 2 个框架有哪些相同点，又有哪些不同点。

再往细划分，每个框架随着时间的推移都退出了新的版本和架构，`React.js` 分为 `react-class` 版本的写法和 `react-hooks` 版本的写法；`Vue.js` 分为 `vue2` 和 `vue3` 版本的写法。

下面我们就分别用不同的框架的不同玩法，实现一个功能完全一样的应用：`TodoApp`。

`Vue` 的 2 个版本：

- [todo-vue3 版本](../todo-vue3/)
- [todo-vue2 版本](../todo-vue2/)

`React` 有两套 API，类（class）API 和基于函数的钩子（hooks） API，所以有以下 2 个版本：

- [todo-react-hooks](../todo-react-hooks/)
- [todo-react-class](../todo-react-class/)

### feature list

根据 todoMVC 项目的规定，实现一个 `todo` 应用需要实现以下功能：

1. 创建 `todo`
2. 没有 `todo` 时要隐藏 **#main**标签和 **#footer** 标签
3. 标记为全部完成

   > 当单个 todo 项目的状态被更新时，`"Mark all as complete"` `checkbox` 也应该被更新。

4. 每一个 todo 项目有 3 种交互形式：

   - 1. 单击 `todo` 前面的 `checkbox` 可以把状态更改为 `completed`
   - 2. 双击 `label` 进入编辑模式
   - 3. 鼠标悬浮到 `todo` 上方时显示 `remove` 按钮

5. 编辑状态

   - 1. 当编辑模式被启用时，应当把另外几个控件隐藏起来，并且把一个包含 `todo` 标题的 `input` 显示出来，同时这个 `input` 应该是聚焦(`focus`)状态。
   - 2. 当失焦或者按回车后编辑的内容应该被保存起来，同时 `editing` `class` 类名被移除。
   - 3. 当内容被清空后应该移除这个 `todo`
   - 4. 可以使用 `ESC` 键放弃编辑

6. 清除所有已完成的 `todo`

7. 计数器

   - 1. 需要显示 `active` 状态的 todo 项目
   - 2. 确保数字用 `strong` 标签包起来
   - 3. 确保使用正确的单复树：`1 item, 2 items`

8. 持久化

   - 1. 需要使用 `localStorage` 持久化应用数据
   - 2. 建议使用关键字：`id,title,completed` 描述每个 todo 项目
   - 3. 确保使用 `todo-[framework]` 作为 `localStorage` 的键名
   - 4. 编辑模式不用存储

9. 路由

   - 1. 实现路由基础功能
   - 2. 如果框架本身支持路由功能的话，就用内置的；否则建议使用其他的
   - 3. 需要实现以下路由：`#!/` hash tag 也支持
     - `#/` 默认的
     - `#/active`
     - `#/completed`
   - 4. 当路由改变时 `todolist` 应该同步改变
   - 5. 一种特殊情况：如果有 `todo item` 处于编辑状态时切换路由，应该先保存在切换。

### HTML 结构模板

```html
<section class="todoapp">
   <header class="header"></header>
   <section class="main"></main>
   <footer class="footer"></footer>
</section>
<footer class="info"></footer>
```

### CSS 模板

使用这个库 [todomvc-app-css](https://github.com/tastejs/todomvc-app-css/blob/master/index.css)
