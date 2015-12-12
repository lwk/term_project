var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  post: {type: Schema.Types.ObjectId, required: true, trim: true},
  question: {type: String, required: true, trim: true},
  answer1: {type: Number, trim: true},
  answer2: {type: Number, trim: true},
  answer3: {type: Number, trim: true},
  answer4: {type: Number, trim: true},
  answer5: {type: String, trim: true},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Multi = mongoose.model('Multi', schema);

module.exports = Multi;
