/**
 * Created by 巍 on 2017/2/5.
 */
var mongoose = require('mongoose'),Schema = mongoose.Schema;
var reviewSchema = mongoose.Schema({
    aid: [{
    	type: Schema.Types.ObjectId,
    	ref: 'articles'
    }],
    con: String,
    uid: String,
    pubdate: Date
});

module.exports = reviewSchema;