'use strict';
const jade = require('jade');
const contents = [];

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
        const content = decoded.split('content=')[1];
        const postDate = new Date();
        const postIp = req.connection.remoteAddress;
        contents.push([content, postDate, postIp]);
        console.info('投稿されました: ' + content);
        contents.forEach((element) => {
          console.info(`[${element[1]}] ${element[0]}(${element[2]})`);
        });
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
