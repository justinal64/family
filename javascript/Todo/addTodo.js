"use strict";

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

module.exports = addTodo;