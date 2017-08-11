const portconfig = require('../port_config');
const jsonServer = require('json-server');
const db = require('./API.js');
//定义自己的路由
const routes = {
  //"/get.action": "/index_db",
 // "/comment/add.action": "/addComment"
};
const port = portconfig.apiServerPort;

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter(routes);

server.use(middlewares);
// 将 POST 请求转为 GET
server.use((request, res, next) => {
  request.method = 'GET';
  next();
});

server.use(rewriter); // 注意：rewriter 的设置一定要在 router 设置之前
server.use(router);

server.listen(port, () => {
  console.log('open mock server at localhost:' + port)
});