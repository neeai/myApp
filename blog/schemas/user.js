/**
 * Created by 巍 on 2016/12/26.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: String,
    password: String,
    regdate: {
        type: Date,
        default: Date.now
    }
});

module.exports = userSchema;