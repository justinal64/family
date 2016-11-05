'use strict';

// const addTodo = require("./addTodo");
// const deleteTodo = require("./deleteTodo");
// const editTodo = require("./editTodo");
// const getTodo = require("./getTodo");

function addTodo(apiKeys, newItem){
    console.log("apiKeys", apiKeys);
    console.log("newItem", newItem);
    return new Promise((resolve, reject) => {
        $.ajax({
            method:  'POST',
            url:`${apiKeys.databaseURL}/items.json`,
            data: JSON.stringify(newItem),
            dataType: 'json'
          }).then((response) => {
            console.log("response from POST", response);
            resolve(response);
          }, (error) => {
            reject(error);
        });
    });
}

function deleteTodo(apiKeys, id){
    return new Promise((resolve, reject) => {
        $.ajax({
            method:  'DELETE',
            url:`${apiKeys.databaseURL}/family/${id}.json`
            }).then((response) => {
            console.log("response from Delete", response);
            resolve(response);
            }, (error) => {
            reject(error);
        });
    });
}

function editTodo(apiKeys, itemId, editedItem){
    return new Promise((resolve, reject) => {
    $.ajax({
        method:  'PUT',
        url:`${apiKeys.databaseURL}/items/${itemId}.json`,
        data: JSON.stringify(editedItem),
        dataType: 'json'
        }).then((response) => {
        console.log("response from POST", response);
        resolve(response);
        }, (error) => {
            reject(error);
        });
    });
}

function getTodos(apiKeys){
    return new Promise((resolve, reject) => {
        $.ajax({
            method:  'GET',
            // url:`${apiKeys.databaseURL}/items.json?orderBy="uid"&equalTo="${uid}"`
            url:`${apiKeys.databaseURL}/family.json`
        }).then((response) => {
            let items = [];
            Object.keys(response).forEach(function(key){
            response[key].id = key;
            items.push(response[key]);
            });
            resolve(items);
        }, (error) => {
            reject(error);
        });
    });
}

let todo = {
  addTodo, deleteTodo, editTodo, getTodos
};

module.exports = todo;