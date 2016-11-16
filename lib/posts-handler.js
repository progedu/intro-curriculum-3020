'use strict';
const jade = require('jade');
const contents = []; //投稿内容を保存する為の配列

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
        contents.push(content); //投稿内容を配列cintentsに格納する
        console.info('過去に投稿された内容: ' + contents); //投稿された全てのログ
        handleRedirectPosts(req, res);
      });
      break;
    default:
      break;
  }
}

function handleRedirectPosts(req, res) {
  res.writeHead(303, { //303 リダイレクト
    'Location': '/posts'
  });
  res.end();
}

module.exports = {
  handle: handle
};
