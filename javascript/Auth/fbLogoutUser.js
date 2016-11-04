"use strict";

function logoutUser(){
    firebase.auth().signOut();
}

module.exports = logoutUser;