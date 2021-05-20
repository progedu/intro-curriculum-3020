'use strict';
const pug = require('pug');
const contents = []; // 投稿内容を保存する配列

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(pug.renderFile('./views/posts.pug'));
      break;
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        const decoded = decodeURIComponent(body);
        const content = decoded.split('content=')[1];
        // 投稿内容を配列に保存
        contents.push(content);
        console.info('投稿されました: ' + content);
        // 配列の内容をログに表示
        console.info('投稿された全内容: ');
        contents.forEach(function(value) {
          console.info(value);
        });
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
  handle
};