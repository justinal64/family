"use strict";

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

module.exports = editTodo;