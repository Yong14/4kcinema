const path = require('path');
let comingsoon = require('./public/data/comingsoon.json');
let newplay = require('./public/data/newplay.json');
let cityList = require('./public/data/cityList.json');

module.exports = {
  configureWebpack: {
    devServer: {
      proxy: 'http://39.97.33.178',
      before(app) {
        app.get('/api/coming', function (req, res) {
          res.json(comingsoon);
        });
        app.get('/api/new', function (req, res) {
          res.json(newplay);
        });
        app.get('/api/cityList', function (req, res) {
          res.json(cityList);
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
