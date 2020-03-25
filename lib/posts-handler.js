'use strict';
const jade = require('jade');
const contents = [];//書き込んだ内容を入れる配列
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
        body.push(chunk);//body配列にchunk関数にいれる
      }).on('end', () => {
        body = Buffer.concat(body).toString();//toStringはオブジェクトの文字表現を返す　コマ切れの文字をconcatでくっつける
        const decoded = decodeURIComponent(body);
        const content = decoded.split('content=')[1];
        console.info('投稿されました: ' + content);
        contents.push(content);//配列に内容を保存
        console.info('投稿された全内容: ' + contents);
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
