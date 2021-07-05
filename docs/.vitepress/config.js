module.exports = {
  title: 'TodoApp',
  description: '带你玩转TodoApp',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '概述', link: '/guide/' },
      { text: 'vue2版', link: '/todo-vue2/' },
      { text: 'vue3版', link: '/todo-vue3/' },
      { text: 'react-class版', link: '/todo-react-class/' },
      { text: 'react-hooks版', link: '/todo-react-hooks/' },
      { text: 'Github', link: 'https://github.com/FrankFan/BlueOrigin' },
    ],
  },
  // 扩展 markdown
  markdown: {
    lineNumbers: true,
    // use more markdown-it plugins!
    config: (md) => {
      md.use(require('markdown-it-task-lists'), { enable: true });
    },
  },
};
