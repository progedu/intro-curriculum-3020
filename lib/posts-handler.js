'use strict';
const jade = require('jade');
const contents = [];

function handle(req, res) {
  switch (req.method) {
    case 'GET':
    res.writeHead(200, {
      'content-type': 'text/html; charset=utf-8'
    });
    res.write(jade.renderFile('./views/posts.jade', { pretty:true }));
    if (contents){
      for (let content of contents) {
        res.write(`<p>${content}</p>`);
      }  
    }
    res.end();
    break;
    case 'POST':
      let body = [];
      req.on('data', chunk => body.push(chunk) )
      .on('end', () => {
        body = Buffer.concat(body).toString();
        const decoded = decodeURIComponent(body);
        const content = decoded.split('content=')[1];
        console.info(`投稿されました: ${content}`);
        handleRedirectPosts(req, res);
        contents.push(content);
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
