// @ts-check

/**
 * @type {import('f2e-server').F2EConfig}
 */
const config = {
    port: 18588,
    livereload: false,
    build: false,
    gzip: true,
    useLess: false,
    buildFilter: pathname => /^(asserts|css|favicon|index|static|$)/.test(pathname),
    middlewares: [
        {
            middleware: 'proxy',
            test: /^\/?meta/,
            url: 'http://172.16.0.201:5001',
            pathname: '/get',
        },
        require('./lib').default,
        { middleware: 'authority' },
    ],
}
module.exports = config