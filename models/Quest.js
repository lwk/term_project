var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  post: {type: Schema.Types.ObjectId, required: true, trim: true},
  type: {type: String, trim: true},
  question: {type: String, required: true, trim: true},
  answer: {type: String, trim: true},
  answer1: {type: String},
  answer2: {type: String},
  answer3: {type: String},
  answer4: {type: String},
  answer5: {type: String}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Quest = mongoose.model('Quest', schema);

module.exports = Quest;
