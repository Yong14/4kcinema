const path = require('path');
let UserDb = require('./public/data/userDb.json');

module.exports = {
  configureWebpack: {
    devServer: {
      proxy: 'http://39.97.33.178',
      before(app) {
        app.get('/api/UserDb', function (req, res) {
          res.json(UserDb);
        });
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/scss/*.scss'),
      ]
    }
  }
}
