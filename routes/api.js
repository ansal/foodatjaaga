var FoodModel = require('../models/food.js');
var Config = require('../config.js');

var Food = FoodModel.Food;
var ItemType = FoodModel.ItemType;
var Menu = FoodModel.Menu;

var authenticationError = {error: 'You are not authenticated'};
var adminError = {error: 'You are not admin'};
var validationError = {error: 'Validation error'};
var alreadyExistError = {error: 'This object already exists'};

// Creates a food
exports.CreateFood = function(req, res) {
  if(!req.user) {
    res.json(authenticationError);
    return;
  }
  if(Config.admins.indexOf(req.user.email) === -1) {
    res.json(adminError);
    return;
  }

  var title = req.body.title;
  var imgUrl = req.body.imgUrl;
  if(typeof title === 'undefined' ||
    typeof imgUrl === 'undefined') {
    res.json(validationError);
    return;
  }
  var food = new Food({
    title: title,
    imgUrl: imgUrl,
    user: req.user._id
  });
  food.save(function(err, obj){
    if(err) throw err;
    res.json(obj);
  });

};

// Creates a Menu
exports.CreateMenu = function(req, res) {

  if(!req.user) {
    res.json(authenticationError);
    return;
  }
  if(Config.admins.indexOf(req.user.email) === -1) {
    res.json(adminError);
    return;
  }

  var _food = req.body._food;
  var when = req.body.when;
  
  if(typeof _food === 'undefined'
    || typeof when === 'undefined') {
    res.json(validationError);
    return;
  }

  var today = new Date();
  var menu = new Menu({
    _food: _food,
    when: when,
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    user: req.user._id
  });

   menu.save(function(err, newObj){
    if(err) throw err;
    res.json(newObj);
  });

};