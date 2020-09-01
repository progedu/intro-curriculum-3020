'use strict';
const pug = require('pug');
const contents = [];//投稿内容保存用の配列を用意する

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(pug.renderFile('./views/posts.pug'));
      break;
    case 'POST':
      //TODO POSTの処理
      let body = '';//文字列として
      req.on('data',(chank) => {//細切れデータが送られてきたら受け取って
        body = body + chank;//どんどん足していく。文字列連結
      }).on('end', () => {//送り終わったら
        const decoded = decodeURIComponent(body);
        const content = decoded.split('content=')[1];//配列にして文字部分だけ取る。
        contents.push(content);//配列に投稿内容を足す
        console.info('投稿されました:' + content);
        console.info('全投稿:' + contents);
        handleRedirectPosts(req, res);//投稿が完了したらリダイレクトする
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