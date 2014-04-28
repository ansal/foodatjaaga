// All pages are done here
var FoodModel = require('../models/food.js');
var Config = require('../config.js');

var Food = FoodModel.Food;
var ItemType = FoodModel.ItemType;
var Menu = FoodModel.Menu;
var Vote = FoodModel.Vote;

exports.index = function(req, res){

  var response = {};

  function findBreakfasts(err, breakfasts) {
    if(err) throw err;
    response.breakfasts = breakfasts;
    Menu.find({
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      when: 'lunch'
    })
    .populate('_food')
    .exec(findLunch);    
  }

  function findLunch(err, lunchs) {
    if(err) throw err;
    response.lunchs = lunchs;
    Menu.find({
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      when: 'snacks'
    })
    .populate('_food')
    .exec(findSnacks);    
  }

  function findSnacks(err, snacks) {
    if(err) throw err;
    response.snacks = snacks;
    Menu.find({
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      when: 'dinner'
    })
    .populate('_food')
    .exec(findDinner);    
  }

  function findDinner(err, dinners) {
    if(err) throw err;
    response.dinners = dinners;
    Vote.find({
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear()  
    }, findVotes);
  }

  function findVotes(err, votes) {
    if(err) throw err;

    response.votes = votes;
    res.render('index', response);    
  }

  if(!req.user) {
    res.redirect('/auth/login/google');
    return;
  }

  var response = {};
  response.user = req.user;
  var today = new Date();

  Menu.find({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    when: 'breakfast'
  })
  .populate('_food')
  .exec(findBreakfasts);
};