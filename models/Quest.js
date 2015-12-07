var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  post: {type: Schema.Types.ObjectId, required: true, trim: true},
  question: {type: String, required: true, trim: true},
  answer: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Quest = mongoose.model('Quest', schema);

module.exports = Quest;
