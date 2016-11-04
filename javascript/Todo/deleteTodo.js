"use strict";

function deleteTodo(apiKeys, itemId){
    return new Promise((resolve, reject) => {
        $.ajax({
            method:  'DELETE',
            url:`${apiKeys.databaseURL}/items/${itemId}.json`
            }).then((response) => {
            console.log("response from Delete", response);
            resolve(response);
            }, (error) => {
            reject(error);
        });
    });
}

module.exports = deleteTodo;