"use strict";

function getTodos(apiKeys, uid){
    return new Promise((resolve, reject) => {
        $.ajax({
            method:  'GET',
            url:`${apiKeys.databaseURL}/items.json?orderBy="uid"&equalTo="${uid}"`
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

module.exports = getTodos;