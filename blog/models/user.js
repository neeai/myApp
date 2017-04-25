/**
 * Created by 巍 on 2016/12/26.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/user');
var userModel = mongoose.model('users',userSchema);

module.exports = userModel;