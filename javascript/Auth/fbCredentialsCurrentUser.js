"use strict";

function credentialsCurrentUser(){
    return firebase.auth().currentUser;
}

module.exports = credentialsCurrentUser;