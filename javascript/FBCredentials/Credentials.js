'use strict';

function firebaseCredentials() {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            url: `../../apiKeys.json`
        }).then((response)=>{
            // console.log("response", response);
            resolve(response);
        }, (error)=>{
            reject(error);
        });
    });
}

let fbCredentials = {
  firebaseCredentials
};

module.exports = fbCredentials;