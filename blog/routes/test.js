/**
 * Created by 巍 on 2017/1/5.
 */
var express = require('express');
var router = express.Router();
var os = require('os');
var fs = require('fs');
var request = require('request');

router.get('/',function(req,res,next){
    res.render('./test/index');
});
router.get('/os',function(req,res,next){
    console.log( fs.readFile('d:/blog/package.json'))
    res.send(''+ (os.uptime()));
    //res.render('./test/os');
});
router.get('/mm',function(req,res,next){



    res.send('1');
});
module.exports = router;