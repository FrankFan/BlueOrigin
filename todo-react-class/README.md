# todo-react-class

[visit online](https://todo-class.surge.sh/)

## deps

```bash
npm i todomvc-app-css -S

npm i classnames -S
```

## 概述

在 React 版本 16.8 以前，React API 只有一套。但是现在有 2 套：类（class）API 和基于函数的钩子（hooks）API。

本仓库使用 `React Class API` 实现一个完整的 TodoMVCApp。

## 注意点

HTML 结构如下：

```html
<section class="todoapp">
   <header class="header"></header>
   <section class="main"></main>
   <footer class="footer"></footer>
</section>
<footer class="info"></footer>
```

所有的交互全部使用`this.setState`进行完成，持久化的数据保存在`localStorage`中，看代码可以发现，有很多重复的代码都是为了保存数据引起的。
