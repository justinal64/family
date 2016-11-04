'use strict';

const addTodo = require("./addTodo");
const deleteTodo = require("./deleteTodo");
const editTodo = require("./editTodo");
const getTodo = require("./getTodo");


let todo = {
  addTodo, deleteTodo, editTodo, getTodo
};

module.exports = todo;