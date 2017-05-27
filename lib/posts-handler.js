'use strict';
const jade = require('jade');
const contents = []; // 投稿を保存する配列を用意して空配列で初期化

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(jade.renderFile('./views/posts.jade', {}));
      break;
    case 'POST':
      req.on('data', (data) => {
        const decoded = decodeURIComponent(data);
        const content = decoded.split('content=')[1];
        console.info('投稿されました: ' + content);
        contents.push(content); // 配列contentsに投稿contentの内容を追加
        console.info('投稿内容一覧: ' + contents); // 投稿内容一覧として配列contentsの内容を表示
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
