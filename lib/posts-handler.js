'use strict';
const jade = require('jade');
const contents = [];

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
        const decoded = decodeURIComponent(data);
        const content = decoded.split('content=')[1];
        console.info('投稿されました: ' + content);
        contents.push(content);
        console.info('投稿された全内容：'　+ contents);
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
