'use strict';
const postsHandler = require('./posts-handler');//router.js から見ると posts-handler.js は同じディレクトリに存在するからこう書く


function route(req, res) {
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/logout':
      //TODO ログアウト処理
      break;
    default:
      break;
  }
}

module.exports = {
  route
};