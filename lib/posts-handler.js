'use strict';
const pug = require('pug');
const allContents = new Map();

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
        const qs = require('querystring');
        const decoded = qs.parse(body);
        const newContent = `${decoded.content}`;
        allContents.set(newContent);
        console.info(`新規投稿:\n${newContent}\n************\n投稿一覧:`);
        for(let [key, value] of allContents) {
          console.info(`${key}\n------------`);
        }
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