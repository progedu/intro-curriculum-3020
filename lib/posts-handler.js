'use strict';
const jade = require('jade');

//書き込みの実装
const fs = require('fs');
const contents = [];
const fineName = './postlog.txt'


function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(jade.renderFile('./views/posts.jade', {}));
      break;
    case 'POST':
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        const decoded = decodeURIComponent(body);

        // 書き込みの保存
        let content = decoded.split('content=')[1];
        console.info('投稿されました: ' + content);
        content = '['+ new Date() + '] ' + content + '\n';
        fs.appendFileSync(fineName, content, 'utf8');
        contents.push(content);
        console.info('これまでの投稿： ' + contents)
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
