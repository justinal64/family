"use strict";

function addUser(apiKeys, newUser) {
    return new Promise((resolve, reject) => {
        $.ajax({
            method:  'POST',
            url:`${apiKeys.databaseURL}/users.json`,
            data: JSON.stringify(newUser),
            dataType: 'json'
        }).then((response) => {
            console.log("response from POST", response);
            resolve(response);
        }, (error) => {
            reject(error);
        });
    });
}

module.exports = addUser;