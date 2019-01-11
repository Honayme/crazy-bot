//Vue using web pack dev server behind the scene
//Allow to bypass the CORS
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
};
