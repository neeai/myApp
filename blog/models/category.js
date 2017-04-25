/**
 * Created by 巍 on 2016/12/29.
 */
var mongoose = require('mongoose');
var categorySchema = require('../schemas/category');
var categoryModel = mongoose.model('categories',categorySchema);

module.exports = categoryModel;