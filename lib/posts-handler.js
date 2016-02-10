'use strict';
let jade = require('jade');
let contents = [];

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'charset': 'utf-8'
      });
      res.end(jade.renderFile('./views/posts.jade', {}));
      break;
    case 'POST':
      req.on('data', (data) => {
        let decoded = decodeURIComponent(data);
        let content = decoded.split('content=')[1];
        contents.push(content);
        console.info('投稿されました: ' + content);
        console.info('投稿一覧: ' + contents);
        handleRedirectPosts(req, res);
      });
      break;
    default:
      break;
  }
}

function handleRedirectPosts(req, res) {
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}

module.exports = {
  handle: handle
};
