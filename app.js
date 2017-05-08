//依赖express服务
var express = require('express');
var app = express();
//log
var log4js = require('log4js');
var logger = log4js.getLogger();
//配置
var config = require('./config.default.js');
//创建im服务
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || config.PORT;


server.listen(port, function () {
    logger.debug('服务启动端口:'+port);
});

//静态目录
app.use(express.static(__dirname + '/public'));

//链接成功
io.on('connection', function (socket) {
    logger.debug(socket);
    socket.on('identity',function(args){
        logger.debug(args);
        if(args.uid == 1) {
            socket.emit('result',{msg:'ok'});
        }
    });
    socket.on('test01',function(args){
        logger.debug(args);
        socket.emit('test02',{data:'hi'});
    });
    //断开链接
    socket.on('disconnect', function () {

    });
});