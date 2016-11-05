'use strict';

// const registerUser = require("./fbRegisterUser");
// const loginUser = require("./fbLoginuser");
// const logoutUser = require("./fbLogoutUser");
// const credentialsCurrentUser = require("./fbCredentialsCurrentUser");

function loginUser(credentials){
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((authData) =>{
          resolve(authData);
        })
        .catch((error)=>{
          reject(error);
        });
    });
}

function credentialsCurrentUser(){
    return firebase.auth().currentUser;
}

function logoutUser(){
    firebase.auth().signOut();
}

function registerUser(credentials){
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((authData) =>{
          resolve(authData);
        })
        .catch((error)=>{
          reject(error);
        });
    });
}

let fbAuth = {
  registerUser, loginUser, logoutUser, credentialsCurrentUser
};

module.exports = fbAuth;
