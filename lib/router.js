// 厳密モード
'use strict';
// 自作のposts-handlerモジュール呼び出し
const postsHandler = require('./posts-handler.js');
/**
 * リクエストされたURLによって処理を振り分ける（ルーティング）
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
function route(req, res) {
    switch (req.url) {
        // /postsのURLにリクエストがあった場合
        case '/posts':
            // posts-handlerモジュールの処理を行う
            postsHandler.handle(req, res);
            break;
        default:
            break;
    }
}
// このモジュール関数をに登録する
module.exports = {
    route: route
};