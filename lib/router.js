'use strict';
let postsHandler = require('./posts-handler');

function route(req, res) {
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    default:
      break;
  }
}

module.exports = {
  route: route
}