module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    devServer: {
      port: 10086,
      https: false,
      proxy: {
        '/api/gridcloud-usercenter': {
          target: 'http://192.168.1.179:6080',
          changeOrigin: true,
        },
      },
    },
  },
};
