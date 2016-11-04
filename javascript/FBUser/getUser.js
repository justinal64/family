"use strict";

function getUser(apiKeys, uid) {
    return new Promise((resolve, reject) => {
        $.ajax({
        method:  'GET',
        url:`${apiKeys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
        }).then((response) => {
            let users = [];
            Object.keys(response).forEach(function(key){
                response[key].id = key;
                users.push(response[key]);
        });
            resolve(users[0]);
        }, (error) => {
            reject(error);
        });
    });
}

module.exports = getUser;