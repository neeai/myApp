/**
 * Created by 巍 on 2016/12/29.
 */
var mongoose = require('mongoose');
var articleSchema = mongoose.Schema({
    category: String,
    title: String,
    con: String,
    author: String,
    pubdate: Date
});

module.exports = articleSchema;