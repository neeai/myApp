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

//用户注册处理
router.post('/register', function(req, res) {
	var postData = {
		name: req.body.user,
		password: req.body.password,
		regdate: req.body.regdate
	};

	var hash = crypto.createHash('sha256');

	hash.update(postData.password);

	postData.password = hash.digest('hex');

	if(postData.name == '') {
		res.json({
			code: 1,
			message: '用户名不能为空'
		})
	}

	if(postData.password == '') {
		res.json({
			code: 2,
			message: '密码不能为空'
		})
	}

	//查找用户名是否已被注册
	userModel.findOne({ name: postData.name }).then(function(resultData) {
		if(!resultData) {
			var userInstance = new userModel(postData);
			userInstance.save().then(function(result) {
				req.session.username = result.name;
				res.json({
					code: 3,
					message: '用户注册成功，1s后跳转到会员中心',
					url: '/user/home'
				})
			})
		} else {
			res.json({
				code: 4,
				message: '用户已存在，不能注册'
			})
		}
	});

});

//用户登录处理
router.post('/login', function(req, res) {
	var postData = {
		name: req.body.user,
		password: req.body.password
	};

	var hash = crypto.createHash('sha256');

	hash.update(postData.password);

	postData.password = hash.digest('hex');

	if(postData.name == '') {
		res.json({
			code: 1,
			message: '用户名不能为空'
		})
	}

	if(postData.password == '') {
		res.json({
			code: 2,
			message: '密码不能为空'
		})
	}

	//查找用户名是否已被注册
	userModel.findOne({ name: postData.name }).then(function(resultData) {
		if(!resultData) {
			res.json({
				code: 3,
				message: '用户不存在，请先注册'
			})
		} else if(resultData.name == postData.name && resultData.password == postData.password) {
			req.session.username = resultData.name;
			res.json({
				code: 4,
				message: '登陆成功',
				url: '/user/home'
			})
		} else {
			res.json({
				code: 5,
				message: '用户名或密码错误'
			})
		}
	});
});
//
//获取登陆用户信息接口
router.post('/getuserinfo', function(req, res) {
	if(req.isLogin) {
		userModel.findOne({ name: req.isLogin }).then(function(result) {

			res.json(result);

		});
	} else {
		res.json({});
	}
});

//发布博文接口
router.post('/user/pubArticle', function(req, res) {
	var postData = {
		title: req.body.title,
		category: req.body.category,
		con: req.body.con,
		author: req.isLogin,
		pubdate: req.body.pubdate
	};

	if(postData.title == '') {
		res.json({
			code: 1,
			message: '请填写标题'
		})
	}

	if(postData.category == '') {
		v
		res.json({
			code: 2,
			message: '请选择分类'
		})
	}

	if(postData.con == '') {
		res.json({
			code: 3,
			message: '请填写正文'
		})
	}

	//插入博文数据
	var artInstance = new articleModel(postData);
	artInstance.save().then(function(result) {
		res.json({
			code: 4,
			message: '发布成功 ',
			url: ''
		})
	})

});

//获取所有博文
router.get('/getArtList', function(req, res, next) {
	reviewModel.find().sort({ '_id': -1 }).populate('aid').exec(function(err, result) {
		if(err) {
			return handleError(err);
		}
		res.json(result);
	});
});

//评论
router.post('/review', function(req, res, next) {
	if(!req.isLogin) {
		res.json({
			code: 0,
			message: '请先登录 ',
			url: '/login'
		})
		return;
	} else {
		var postData = {
			aid: req.body.aid,
			uid: req.isLogin,
			con: req.body.con,
			pubdate: req.body.pubdate
		};
		var reviewInstance = new reviewModel(postData);
		reviewInstance.save().then(function() {
			res.json({
				code: 1,
				message: '发布成功 ',
				url: ''
			})
		});
	}
});

//文章列表
router.get('/getList', function(req, res, next) {
	var pageSize = 5;
	var page = req.query.page || 0;
	articleModel.count({}, function(error, num) {
		if(error) {
			return error;
		} else {
			//总页数
			var pageNum = Math.ceil(num / pageSize);
			page = page < 0 ? Math.max(0,page) : Math.min(page, pageNum - 1);
			articleModel.find().sort({ '_id': -1 }).limit(pageSize).skip(pageSize * page).exec(function(err, result) {
				if(err) {
					return handleError(err);
				}
				var viewObj = null;
				var aList = JSON.parse(JSON.stringify(result)); //mongoose返回的并非直接的json,需要转换成json格式才可以进行属性的改动
				var loaded = [];
				for(var i = 0; i < aList.length; i++) {
					aList[i]._id = aList[i]._id.toString();
					aList[i].pubdate = moment(aList[i].pubdate).format('YYYY-MM-DD HH:mm:ss');
					aList[i].con = aList[i].con.replace(/<(.*?)>/g, '').replace(/<\/(.*?)>/g, '').replace(/^\s+|\s+$/g, '');
					aList[i].con = aList[i].con.substr(0, 100);
					aList[i].con = aList[i].con.length > 0 ? aList[i].con + '...' : '暂无文字描述';

					(function(i) {
						reviewModel.where({ aid: aList[i]._id }).count(function(err, num) {
							if(err) {
								return handleError(err);
							}
							aList[i].viewCount = num;
							if(i === aList.length - 1) {
								viewObj = {
									'aList': aList
								};
								res.json(viewObj);
							}
						});
					})(i)
				}
			});

		}
	});
});

module.exports = router;