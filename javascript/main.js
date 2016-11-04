"use strict";

let fbAuth = require("./Auth/FirebaseAuth");
let fbCredentials = require("./FBCredentials/Credentials");
let todos = require("./Todo/Todo");
let user = require("./FBUser/User");

console.log("fbAuth", fbAuth);
console.log("fbCredentials", fbCredentials);
console.log("todos", todos);
console.log("user", user);

// eventListeners
$("#nfm-submit").on("click", function(event) {
    // Stops the page from refreshing
    event.preventDefault();
    formValidation();
});


function formValidation() {
    // Used to show fields that need to be populated
    // Checked for a name
    if($('#nfm-name').val() === "") {
        console.log("Please Enter a value for the name field!!");
    }
    // Checks for an age
    if($("#nfm-age").val() === "") {
        console.log("Please Enter a value for the age field!!");
    }
    // Checks to see if a gender was selected
    if($("#nfm-male").is(":checked")) {
        console.log("male is checked!");
    } else if($("#nfm-female").is(":checked")) {
        console.log("female is checked!");
    } else {
        console.log("Please select a gender");
    }
    if($("#nfm-skills").val() === "") {
        console.log("please enter a value in the skills field!");
    }
}



let familyMembers = {};
let apiKeys = {};
let uid = "";

$(document).ready(function() {
    // get firebase credentials from apiKeys.json
    fbCredentials.credentials().then(function(keys) {
        apiKeys = keys;
        console.log("apiKeys", apiKeys);
        firebase.initializeApp(apiKeys);
        getFamilyMembers(apiKeys);
    });

    function getFamilyMembers(apiKeys) {
        todos.getTodo(apiKeys).then(function(fbFamily) {
            familyMembers = fbFamily;
            putFamilyMembersInDom(familyMembers);
        });
    }

    function putFamilyMembersInDom(data) {
        console.log("data", data);
        let $output = $('#output');
        // Add Each Family Member to the dom
        let outputString = "";
        data.forEach(function(member) {
            outputString += "<div class='row'>";
            outputString += `<div class="col-xs-6 col-md-4">${member.name}</div>`;
            outputString += `<div class="col-xs-6 col-md-4">${member.age}</div>`;
            outputString += `<div class="col-xs-6 col-md-4">${member.gender}</div>`;

                // outputString += `<td>${member.name}</td>`;
                // outputString += `<td>${member.age}</td>`;
                // outputString += `<td>${member.gender}</td>`;
        });
        outputString += "</table>";
        $('.output').append(outputString);
        $('.output').append(`<div class="row">
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>`);
    }











});
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
//                 //append to list
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
//                 //append to list
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

