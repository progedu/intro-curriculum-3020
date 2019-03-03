'use strict';
const jade = require('jade');

/**
 * 投稿内容を保存する配列
 * @type {Array}
 */
const contents = [];

/**
 * /posts で入力されたリクエストを処理する
 * @param {string} req リクエストメッセージ
 * @param {string} res レスポンスメッセージ
 */
function handle(req, res) {
  // req.method で処理をスイッチする
  switch (req.method) {
    // /posts にアクセスされた場合
    case 'GET':
      res.writeHead(200, // アクセスが成功したら、200のステータスコードと、
        {'Content-Type': 'text/html; charset=utf-8'}); // リクエストのレスポンスヘッダーに Content-Type～を記述し送信する。writeHead の statusMessage は省略されています。
      res.end(jade.renderFile('./views/posts.jade', {}));
      break;
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        const decoded = decodeURIComponent(body);
        const content = decoded.split('content=')[1];
        console.info('投稿されました: ' + content);
        contents.push(content);
        console.log(contents);
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
