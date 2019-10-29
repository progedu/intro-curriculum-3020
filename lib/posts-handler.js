'use strict';
const pug = require('pug');
const contents =[]; // 投稿内容を保存するための配列を用意

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
        contents.push(content); //投稿内容を保存 ---配列の要素の追加。
        console.info(`【新しい投稿】 \n${content}`); //投稿内容の表示        
        //console.info(`投稿内容一覧：${contents}\n\n`);// 普通の表示（「,」区切り）。投稿内に改行があるとわかりづらいのが難点。
        //     ↓「join」メソッドを使うと配列の要素ごとにの区切りが変えられるらしい。コンソール内での改行なども可能。
        console.info(`【投稿内容一覧】\n${contents.join('\n------------ (投稿の区切り)\n')}\n============ (これで全部です）\n`);//投稿ごとに区切りを入れてみた
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