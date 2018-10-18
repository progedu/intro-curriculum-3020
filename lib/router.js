'use strict';
const postsHandler = require('./posts-handler');

function route(req, res) {
 switch (req.url) {
//urlにpostsが含まれていればhandleメソッドを呼び出す
    case '/posts':
      postsHandler.handle(req, res);
      break;
    default:
      break;
  }
}

module.exports = {
  route: route
};
