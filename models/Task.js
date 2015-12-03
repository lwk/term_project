var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true, trim: true},
  explanation: {type: String, required: true, trim: true},
  password: {type: String},
  //content: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  read: {type: Number, default: 0}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Task', schema);

module.exports = Post;
