/**
 * Created by 巍 on 2016/12/29.
 */
var mongoose = require('mongoose');
var articleSchemas = require('../schemas/article');
var articleModel = mongoose.model('articles',articleSchemas);
module.exports = articleModel;