'use strict';
const pug = require('pug');
const qs = require('querystring');
const contents = [];

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(pug.renderFile('./views/posts.pug'));
      break;
    case 'POST':
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      }).on('end', () => {
        body = qs.parse(body);
        contents.push(body['content']);
        console.info(`投稿されました: ${body['content']}`);
        console.info(`投稿内容一覧: ${contents}`);
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