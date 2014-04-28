var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var foodSchema = new Schema({
  title: String,
  imgUrl: String,
  updated: { type: Date, default: Date.now },
  user: ObjectId
});

// when can be 'breakfast', 'lunch', 'dinner' and 'sancks'
var menuSchema = new Schema({
  when : String,
  _food: { type: ObjectId, ref: 'Food' },
  date: Number,
  month: Number,
  year: Number,
  user: ObjectId
});

var voteSchema = new Schema({
  menu: ObjectId,
  user: ObjectId,
  date: Number,
  month: Number,
  year: Number,
});

module.exports.Food = mongoose.model('Food', foodSchema);
module.exports.Menu = mongoose.model('Menu', menuSchema);
module.exports.Vote = mongoose.model('Vote', voteSchema);