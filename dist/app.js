(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const registerUser = require("./fbRegisterUser");
const loginUser = require("./fbLoginuser");
const logoutUser = require("./fbLogoutUser");
const credentialsCurrentUser = require("./fbCredentialsCurrentUser");

let fbAuth = {
  registerUser, loginUser, logoutUser, credentialsCurrentUser
};

module.exports = fbAuth;

},{"./fbCredentialsCurrentUser":2,"./fbLoginuser":3,"./fbLogoutUser":4,"./fbRegisterUser":5}],2:[function(require,module,exports){
"use strict";

function credentialsCurrentUser(){
    return firebase.auth().currentUser;
}

module.exports = credentialsCurrentUser;
},{}],3:[function(require,module,exports){
"use strict";

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

module.exports = loginUser;
},{}],4:[function(require,module,exports){
"use strict";

function logoutUser(){
    firebase.auth().signOut();
}

module.exports = logoutUser;
},{}],5:[function(require,module,exports){
  'use strict';

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

module.exports = registerUser;
},{}],6:[function(require,module,exports){
'use strict';

const credentials = require("./fbCredentials");


let fbCredentials = {
  credentials
};

module.exports = fbCredentials;
},{"./fbCredentials":7}],7:[function(require,module,exports){
"use strict";

function firebaseCredentials() {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            url: `./apiKeys.json`
        }).then((response)=>{
            resolve(response);
        }, (error)=>{
            reject(error);
        });
    });
}

module.exports = firebaseCredentials;
},{}],8:[function(require,module,exports){
'use strict';

const addUser = require("./addUser");
const getUser = require("./getUser");


let user = {
  addUser, getUser
};

module.exports = user;
},{"./addUser":9,"./getUser":10}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
'use strict';

const addTodo = require("./addTodo");
const deleteTodo = require("./deleteTodo");
const editTodo = require("./editTodo");
const getTodo = require("./getTodo");


let todo = {
  addTodo, deleteTodo, editTodo, getTodo
};

module.exports = todo;
},{"./addTodo":12,"./deleteTodo":13,"./editTodo":14,"./getTodo":15}],12:[function(require,module,exports){
"use strict";

function addTodo(apiKeys, newItem){
    console.log("apiKeys", apiKeys);
    console.log("newItem", newItem);
    return new Promise((resolve, reject) => {
        $.ajax({
            method:  'POST',
            url:`${apiKeys.databaseURL}/items.json`,
            data: JSON.stringify(newItem),
            dataType: 'json'
          }).then((response) => {
            console.log("response from POST", response);
            resolve(response);
          }, (error) => {
            reject(error);
        });
    });
}

module.exports = addTodo;
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
"use strict";

 function editTodo(apiKeys, itemId, editedItem){
    return new Promise((resolve, reject) => {
    $.ajax({
        method:  'PUT',
        url:`${apiKeys.databaseURL}/items/${itemId}.json`,
        data: JSON.stringify(editedItem),
        dataType: 'json'
        }).then((response) => {
        console.log("response from POST", response);
        resolve(response);
        }, (error) => {
            reject(error);
        });
    });
}

module.exports = editTodo;
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
"use strict";

let fbAuth = require("./Auth/FirebaseAuth");
let fbCredentials = require("./FBCredentials/Credentials");
let todos = require("./Todo/Todo");
let user = require("./FBUser/User");

console.log("fbAuth", fbAuth);
console.log("fbCredentials", fbCredentials);
console.log("todos", todos);
console.log("user", user);


// let apiKeys = {};
// let uid = "";

// function putTodoInDOM (){
//     FbAPI.getTodos(apiKeys, uid).then(function(items){
//         console.log("items from FB", items);
//         $('#completed-tasks').html("");
//         $('#incomplete-tasks').html("");
//         items.forEach(function(item){
//             if(item.isCompleted === true){
//                 let newListItem = `<li data-completed="${item.isCompleted}">`;
//                 newListItem+=`<div class="col-xs-8" data-fbid="${item.id}">`;
//                 newListItem+='<input class="checkboxStyle" type="checkbox" checked>';
//                 newListItem+=`<label class="inputLabel">${item.task}</label>`;
//                 newListItem+='</div>';
//                 newListItem+='</li>';
//                 //apend to list
//                 $('#completed-tasks').append(newListItem);
//             } else {
//                 let newListItem = `<li data-completed="${item.isCompleted}">`;
//                 newListItem+=`<div class="col-xs-8" data-fbid="${item.id}">`;
//                 newListItem+='<input class="checkboxStyle" type="checkbox">';
//                 newListItem+=`<label class="inputLabel">${item.task}</label>`;
//                 newListItem+='<input type="text" class="inputTask">';
//                 newListItem+='</div>';
//                 newListItem+='<div class="col-xs-4">';
//                 newListItem+=`<button class="btn btn-default col-xs-6 edit" data-fbid="${item.id}">Edit</button>`;
//                 newListItem+=`<button class="btn btn-danger col-xs-6 delete"  data-fbid="${item.id}">Delete</button> `;
//                 newListItem+='</div>';
//                 newListItem+='</li>';
//                 //apend to list
//                 $('#incomplete-tasks').append(newListItem);
//             }

//       });
//     });
// }

// function createLogoutButton() {
//     FbAPI.getUser(apiKeys, uid).then(function(userResponse) {
//         $('#logout-container').html("");
//         let currentUsername = userResponse.username;
//         let logoutButton = `<button class="btn btn-danger" id="logoutButton">LOGOUT ${currentUsername}</button>`;
//         $('#logout-container').append(logoutButton);
//     });
// }

// $(document).ready(function(){
//     FbAPI.firebaseCredentials().then(function(keys){
//         // console.log("keys", keys);
//         apiKeys = keys;
//         firebase.initializeApp(apiKeys);
//     });

//     $('#add-todo-button').on('click', function(){
//         console.log("clicked new todo button");
//         let newItem = {
//             "task": $('#add-todo-text').val(),
//             "isCompleted" : false,
//             "uid": uid
//         };
//         FbAPI.addTodo(apiKeys, newItem).then(function(){
//             putTodoInDOM();
//         });
//     });


//     $('ul').on("click", ".delete", function(){
//         let itemId = $(this).data("fbid");
//         FbAPI.deleteTodo(apiKeys, itemId).then(function(){
//             putTodoInDOM();
//         });
//     });

//     $('ul').on("click", ".edit", function() {
//         let parent = $(this).closest('li');
//         if(!parent.hasClass("editMode")) {
//             parent.addClass("editMode");

//         } else {
//             let itemId = $(this).data("fbid");
//             let editedItem = {
//                 "task": parent.find(".inputTask").val(),
//                 "isCompleted": false,
//                 "uid": uid
//             };
//             // firebase stuff...
//             FbAPI.editTodo(apiKeys, itemId, editedItem).then(function() {
//                 parent.removeClass("editMode");
//                 putTodoInDOM();
//             });
//         }
//     });

//     $('ul').on('change', 'input[type="checkbox"]', function() {
//         let updateIsCompleted = $(this).closest('li').data('completed');
//         console.log("updateIsCompleted", updateIsCompleted );
//         let itemId = $(this).parent().data('fbid');
//         let task = $(this).siblings(".inputLabel").html();

//         let editedItem = {
//             "task": task,
//             "isCompleted": !updateIsCompleted,
//             "uid": uid
//         };
//         FbAPI.editTodo(apiKeys, itemId, editedItem).then(function() {
//             putTodoInDOM();
//         });
//     });

//     $('#registerButton').on("click", function() {

//         let username = $('#inputUsername').val();
//         let user = {
//             "email": $('#inputEmail').val(),
//             "password": $('#inputPassword').val()
//         };

//         FbAPI.registerUser(user).then(function(registerResponse) {
//             console.log("register response", registerResponse);
//             let uid = registerResponse;
//             let newUser = {
//                 "username": username,
//                 "uid": registerResponse.uid
//             };
//             return FbAPI.addUser(apiKeys, newUser);
//         }).then(function(addUserResponse) {

//             return FbAPI.loginUser(user);
//         }).then(function(loginResponse) {
//             console.log("loginResponse", loginResponse);
//             uid = loginResponse.uid;
//             createLogoutButton();
//             putTodoInDOM();
//             $('#login-container').addClass("hide");
//             $('#todo-container').removeClass("hide");
//         });
//     });

//     $('#loginButton').on('click', function() {
//         let user = {
//             "email": $('#inputEmail').val(),
//             "password": $('#inputPassword').val()
//         };
//         FbAPI.loginUser(user).then(function(loginResponse) {
//             uid = loginResponse.uid;
//             createLogoutButton();
//             putTodoInDOM();
//             $('#login-container').addClass("hide");
//             $('#todo-container').removeClass("hide");
//         });
//     });
// });


// $('#logout-container').on("click", "#logoutButton", function() {
//     FbAPI.logoutUser();
//     uid = "";
//     $('#login-container').removeClass("hide");
//     $('#todo-container').addClass("hide");
//     $('#incomplete-tasks').html("");
//     $('#completed-tasks').html("");
//     $('#inputUsername').val("");
//     $('#inputEmail').val("");
//     $('#inputPassword').val("");
// });


},{"./Auth/FirebaseAuth":1,"./FBCredentials/Credentials":6,"./FBUser/User":8,"./Todo/Todo":11}]},{},[16]);
