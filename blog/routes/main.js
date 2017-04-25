/**
 * Created by 巍 on 2016/12/26.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var userModel = require('../models/user');
var categoryModel = require('../models/category');
var articleModel = require('../models/article');
var reviewModel = require('../models/review');
var moment = require('moment');
//
//var insertData = new userModel({
//    name:'liuwei',
//    password:'123456'
//});
//insertData.save().then(function(){
//
//});
router.get('/', function(req, res, next) {
	//res.send('hi')
	//	var showNum = 100;
	//	reviewModel.find().sort({ '_id': -1 }).limit(showNum).populate('aid').exec(function(err, result) {
	//		if(err) {
	//			return handleError(err);
	//		}
	//		var viewObj = null;
	//		var aList = JSON.parse(JSON.stringify(result));//mongoose返回的并非直接的json,需要转换成json格式才可以进行属性的改动
	//		for(var i=0;i<result.length;i++){
	//			aList[i].aid[0]._id = result[i].aid[0]._id.toString();
	//			aList[i].aid[0].pubdate = moment(result[i].aid[0].pubdate).format('YYYY-MM-DD HH:mm:ss');
	//		}
	//		viewObj = {
	//			'title': '博客首页',
	//			'isLogin': req.isLogin,
	//			'aList': aList
	//		};
	//		res.render('./main/index', viewObj);
	//	});
	articleModel.find().sort({ '_id': -1 }).exec(function(err, result) {
		if(err) {
			return handleError(err);
		}
		var viewObj = null;
		var aList = JSON.parse(JSON.stringify(result)); //mongoose返回的并非直接的json,需要转换成json格式才可以进行属性的改动
		var loaded = [];
		for(var i = 0; i < aList.length; i++) {
			aList[i]._id = aList[i]._id.toString();
			aList[i].pubdate = moment(aList[i].pubdate).format('YYYY-MM-DD HH:mm:ss');
			aList[i].con = aList[i].con.replace(/<(.*?)>/g, '').replace(/<\/(.*?)>/g, '').replace(/^\s+|\s+$/g,'');
			aList[i].con = aList[i].con.substr(0,100);
			aList[i].con = aList[i].con.length > 0 ? aList[i].con + '...' : '暂无文字描述';
			
			(function(i) {
				reviewModel.where({ aid: aList[i]._id }).count(function(err, num) {
					if(err) {
						return handleError(err);
					}
					aList[i].viewCount = num;
					if(i === aList.length - 1) {
						viewObj = {
							'title': '博客首页',
							'isLogin': req.isLogin,
							'indexActive': true,
							'aList': aList
						};
						res.render('./main/index', viewObj);
					}
				});
			})(i)
		}
	});
});

//文章列表

router.get('/list',function(req,res,next){
	articleModel.count({}, function(error, num) {
		if(error){
			return error;
		}else{
			var pageNum = Math.ceil(num / 5);
			var pageArr = [];
			for(var i = 0;i < pageNum; i++){
				pageArr[i] = '<li><a href="/list?page=' + i + '">' + (i + 1) + '</a></li>';
			}
			var viewObj = {
				'title': '文章列表',
				'num' : pageArr,
				'listActive': true
				};
		res.render('./main/article/list',viewObj);
		}
	});
	
	
})




//login
router.get('/login', function(req, res, next) {
	if(req.isLogin) {
		res.redirect('/user/home');
		return;
	}
	res.render('./main/login', { 'title': '用户登录', 'isLogin': req.isLogin });
});

//logout
router.get('/login/out', function(req, res, next) {
	req.session.username = null;
	res.redirect('/');
});

//reg
router.get('/register', function(req, res, next) {
	if(req.isLogin) {
		res.redirect('/user/home');
		return;
	}
	res.render('./main/register', { 'title': '用户注册', 'isLogin': req.isLogin });
});

//用户主页
router.get('/user/home', function(req, res, next) {
	if(!req.isLogin) {
		res.send('您无权查看该页');
		return;
	} else {
		articleModel.where({ author: req.isLogin }).count().then(function(num) {
			res.render('./main/user/home', { 'title': '会员中心', 'isLogin': req.isLogin, 'num': num, 'flag': 'home' });
		})
	}
});

//发布博文
router.get('/user/pub', function(req, res, next) {
	if(!req.isLogin) {
		res.send('您无权查看该页');
		return;
	} else {
		articleModel.where({ author: req.isLogin }).count().then(function(num) {
			categoryModel.find(

			).then(function(result) {
				res.render('./main/user/pub', { 'title': '发布博文', 'isLogin': req.isLogin, 'categories': result, 'num': num, 'flag': 'pub' })
			});
		});
	}
});

//我的博文列表
router.get('/user/publist', function(req, res, next) {
	if(!req.isLogin) {
		res.send('您无权查看该页');
		return;
	} else {
		articleModel.where({ author: req.isLogin }).count().then(function(num) {
			articleModel.find({ author: req.isLogin }).then(function(result) {
				res.render('./main/user/publist', { 'title': '我的博文', 'isLogin': req.isLogin, 'result': result, 'num': num, 'flag': 'publist' })
			});

		});

	}
});

//

//BLOG DETAIL
router.get('/article/:id', function(req, res, next) {
	var articleId = req.params.id;
	articleModel.count().then(function(num) {
		articleModel.findOne({ "_id": articleId }).then(function(result) {
			reviewModel.find({"aid": articleId}).sort({"_id": -1}).exec(function(err, reviewResult) {
				if(err){
					return handleError(err);
				}
				var reviewResult = JSON.parse(JSON.stringify(reviewResult));
				for(var i=0;i < reviewResult.length; i++){
					reviewResult[i].pubdate = moment(reviewResult[i].pubdate).format('YYYY-MM-DD HH:mm:ss');
				}
				res.render('./main/user/pubdetail', {
					'title': result.title + '--博文详情',
					'artitle': result.title,
					'pubdate': moment(result.pubdate).format('YYYY-MM-DD HH:mm:ss'),
					'author': result.author,
					'con': result.con,
					'hasit': true,
					'isLogin': req.isLogin,
					'num': num,
					'flag': 'publist',
					'articleId': articleId,
					'reviewResult': reviewResult
				});

			})

		}, function(result) {
			res.send('您查看的文章不存在');
		})
	});
});

module.exports = router;