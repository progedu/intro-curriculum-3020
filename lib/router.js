'use strict';
const pug = require('pug');
const postsHandler = require('./posts-handler');

function route(req, res) {
  switch (req.url) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=urf-8'
      });
      res.end(pug.renderFile('./views/posts.pug'));
      break;

    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/logout':
      // TODO ログアウト処理
      break;
    default:
      break;
  }
}

module.exports = {
  route
};