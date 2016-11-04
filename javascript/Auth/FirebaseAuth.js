'use strict';

const registerUser = require("./fbRegisterUser");
const loginUser = require("./fbLoginuser");
const logoutUser = require("./fbLogoutUser");
const credentialsCurrentUser = require("./fbCredentialsCurrentUser");

let fbAuth = {
  registerUser, loginUser, logoutUser, credentialsCurrentUser
};

module.exports = fbAuth;
