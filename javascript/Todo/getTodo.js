"use strict";

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

module.exports = getTodos;