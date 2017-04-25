/**
 * Created by 巍 on 2016/12/26.
 */
var express = require('express');
var app = express();

//引入模板处理模块
var swig = require('swig');
//定义模板引擎名称，同时也是模板文件后缀
app.engine('html',swig.renderFile);
//设置模板目录
app.set('views','./views');
//设置模板引擎
app.set('view engine','html');

//设置静态文件托管
app.use('/static',express.static(__dirname +'/public'));


//body模块
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

//加载,cookie,session模块
// Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work.
var expressSession = require('express-session');
app.use(expressSession({
    name:'session_id',
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    },
    resave: false,
    secret: 'liuwei',
    saveUninitialized : true
}));

//判断用户是否登录
app.use(function(req,res,next){
    req.isLogin = req.session.username || '';
    next();
})

//引入路由
var main = require('./routes/main');
app.use('/',main);

//接口路由
var api = require('./routes/api');
app.use('/api',api);

//测试路由

var test = require('./routes/test');
app.use('/test',test);
//连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    console.log('connect success!')
    app.listen(80,function(){
        console.log('80已绑定');
    });
})



