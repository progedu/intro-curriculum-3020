'use strict';
//posts-handler.js における jade のモジュールを読み込んでいます
const jade = require('jade');
//投稿内容を保存するための配列
const contents = [];

function handle(req, res) {
  switch (req.method) {
    ///posts に GET でアクセスした時
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(jade.renderFile('./views/posts.jade', {}));
      break;
    ///posts に POST でアクセスした時
    case 'POST':
      //リクエストで data と end という名前のデータを受け取ったイベントが生じた時の処理
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();

        //ここでは、データを受け取り URI エンコードをデコードします。
        const decoded = decodeURIComponent(body);

        //ここでは、内容が key=value の形式で渡されるため、
        // フォームで設定した contentというキー名の値の部分を取得しています。
        const content = decoded.split('content=')[1];

        //ここでは、ログを出力
        console.info('投稿されました: ' + content);

        //内容をこの配列に追加
        contents.push(content);
        console.info('投稿された全内容: ' + contents);

        //handleRedirectPosts という関数を呼び出しています。
        handleRedirectPosts(req, res);
      });

      break;
    default:
      break;
  }
}

///posts へのリダイレクト
function handleRedirectPosts(req, res) {
  //
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}

module.exports = {
  handle: handle
};
