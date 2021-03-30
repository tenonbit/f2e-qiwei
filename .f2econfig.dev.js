// @ts-check

/**
 * @type {import('f2e-server').F2EConfig}
 */
const config = {
  port: 8000,
  livereload: true,
  build: false,
  gzip: true,
  useLess: true,
  buildFilter: pathname => /^(asserts|css|favicon|index|src|$)/.test(pathname),
  middlewares: [
    // 对应文本支持简单ejs语法的服务端渲染，通常用来给资源链接加时间戳
    { middleware: 'template', test: /\.html?/ },
    // 编译构建前端资源可以使用 esbuild 或者 webpack, esbuild更快、webpack兼容性更好
    { middleware: 'esbuild' },
    // 使用webpack 需要安装中间件 f2e-middle-webpack
    // { middleware: 'webpack' },

    // {
    //   middleware: 'proxy',
    //   test: /^\/?meta/,
    //   url: 'http://172.16.0.201:5001',
    //   pathname: '/get',
    // },

    // rule-manage
    {
      middleware: 'proxy',
      test: /^\/v1\/gpm/,
      url: 'http://172.16.0.163:18080',
    },

    require('./lib').default,
    { middleware: 'authority' },
  ],
  // onServerCreate: (server) => {
  //     const { Server } = require('ws')
  //     const wss = new Server({server});
  //     wss.on('connection', (socket) => {
  //         socket.send('init')
  //     })
  // }
}
module.exports = config