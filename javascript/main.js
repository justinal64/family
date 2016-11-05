"use strict";

let fbAuth = require("./Auth/FirebaseAuth");
let fbCredentials = require("./FBCredentials/Credentials");
let todos = require("./Todo/Todo");
let user = require("./FBUser/User");

let familyMembers = {};
let apiKeys = {};
let uid = "";
let nfmId = 2;

// eventListeners
$("#nfm-submit").on("click", function(event) {
    // Stops the page from refreshing
    event.preventDefault();
    formValidation();
});

// eventListener for a button that hasn't been created yet
$(document).on("click", ".btn-danger", function(event) {
    // Get the id of the family member that will be removed from the db
    let id = $(this).closest('div').siblings('#fm-name').data("fbid");
    // Remove the entire row when delete is clicked
    $(this).closest('div').parent().remove();
    // delete the familymember from the db
    todos.deleteTodo(apiKeys, id);
});


function formValidation() {
    // Create an object with the new users info
    let nfm = {
        "id": nfmId,
        "name": $('#nfm-name').val(),
        "age" : $("#nfm-age").val(),
        "gender": "",
        "skills": $("#nfm-skills").val()
    };

    // Check to see if a gender was selected
    if($("#nfm-male").is(":checked")) {
        nfm.gender = "male";
    } else if($("#nfm-female").is(":checked")) {
        nfm.gender = "female";
    }
    addFamilyMember(nfm);
}

function addFamilyMember(newFM) {
    user.addUser(apiKeys, newFM);
    getFamilyMembers(apiKeys);
    nfmId++;
}

function getFamilyMembers(apiKeys) {
    todos.getTodos(apiKeys).then(function(fbFamily) {
        familyMembers = fbFamily;
        putFamilyMembersInDom(familyMembers);
    });
}

function putFamilyMembersInDom(data) {
    let $output = $('#output');
    $output.html("");
    // Add Each Family Member to the dom
    let outputString = "";
    data.forEach(function(member) {
        outputString += "<div class='row'>";
            outputString += `<div class="col-xs-4 col-md-4" id="fm-name" data-fbid="${member.id}">${member.name}</div>`;
            outputString += `<div class="col-xs-4 col-md-4">${member.age}</div>`;
            outputString += `<div class="col-xs-4 col-md-4">${member.gender}<button type="button" class="btn btn-danger fright">Delete</button></div>`;
        outputString += "</div>";
    });
    $('.output').append(outputString);
}

$(document).ready(function() {
    // get firebase credentials from apiKeys.json
    fbCredentials.firebaseCredentials().then(function(keys) {
        apiKeys = keys;
        firebase.initializeApp(apiKeys);
        getFamilyMembers(apiKeys);
    });
});


