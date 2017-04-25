/**
 * Created by 巍 on 2017/2/5.
 */
var mongoose = require('mongoose');
var reviewSchema = require('../schemas/review');
var reviewModel = mongoose.model('review',reviewSchema);

module.exports = reviewModel;