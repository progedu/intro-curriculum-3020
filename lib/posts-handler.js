'use strict';
const pug = require('pug');
const contents = [];

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf8'
      });
      res.end(pug.renderFile('./views/posts.pug'))
      break;
    case 'POST':
      // TODO POSTの処理 done
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        const decode = decodeURIComponent(body);
        const content = decode.split('content=')[1];
        console.info('投稿されました: ' + content);
        contents.push(content);
        console.info('Saved \"' + content + '\" in the array \"contents\".');
        handleRedirectPosts(req,res);
      })
      break;
    default:
      break;
  }
}

function handleRedirectPosts(req,res) {
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}

module.exports = {
  handle
};
