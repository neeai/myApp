/**
 * Created by 巍 on 2016/12/29.
 */
var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
    title: String
});

module.exports = categorySchema;