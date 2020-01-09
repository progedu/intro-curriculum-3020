'use strict';
const pug = require('pug');
const contents = [];

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      const now = new Date(Date.now());
      res.end(pug.renderFile('./views/posts.pug',{
        time : now
      }));
      break;
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString() +': ' + new Date(Date.now()).toString() +'\nIPアドレス'+ req.connection.remoteAddress;
        var decoded = decodeURIComponent(body);
        console.info('[新しい投稿]\n' + decoded);
        contents.push(decoded.split('content=')[1]);
        //joinでcontentsのそれぞれの末尾に\n------------(投稿の区切り)\nが追加される
        console.info('[投稿内容一覧]\n' + contents.join('\n------------(投稿の区切り)\n') + '\n=========== (これで全部です) \n');//投稿内容の確認
        contents.length <= 4 ? handleRedirectPosts(req,res,'/posts') : handleRedirectPosts(req,res,'https://www.nnn.ed.nico/');
      });
      break;
    default:
      break;
  }
}

function handleRedirectPosts(req, res,url) {
  res.writeHead(303, {
    'Location': url
  });
  res.end();
}

module.exports = {
  handle
};