// var fullName;
// var email;
// var user = {};
// var oldDB = [];
// oldDB = JSON.parse(localStorage.getItem('users'))||[];
// console.log(oldDB);

// function checkLocalStorage() {
//     var localEmail = [];
//     email = document.getElementById('email').value.toLowerCase();
//     for (var i = 0; i < oldDB.length; i++) {
//         localEmail[i] = oldDB[i].email;
//     }
//     if (localEmail.indexOf(email) > -1) {
//         alert('Username or Email are not available!');
//     } else {
//         register();
//     }
// }

// function register() {
//     var users = [];
//     if (oldDB) {
//         users = oldDB;
//     }
//     fullName = document.getElementById('fullName').value;
//     email = document.getElementById('email').value.toLowerCase();
//     let password = document.getElementById('password').value;
//     user = {
//         fullName: fullName,
//         email: email,
//         password: password,
//     };
//     users.push(user);
//     var json = JSON.stringify(users);
//     localStorage.setItem('users', json);
// }
const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fullNameRE = /^[A-Za-z]+( [A-Za-z]+)*$/;
var user = {};
// var oldDB = [];
var oldDB = JSON.parse(localStorage.getItem('users')) || [];

function checkLocalStorage() {
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value.toLowerCase();
    let password = document.getElementById('password').value;
    if (fullNameRE.test(fullName)&&emailRE.test(email)&&password.length>=8) {
        var localEmail = [];
        email = document.getElementById('email').value.toLowerCase();
        for (var i = 0; i < oldDB.length; i++) {
            localEmail[i] = oldDB[i].email;
        }
        if (localEmail.indexOf(email) > -1) {
            alert('Username or Email are not available!');
        } else {
            register(fullName, email, password);
        }
    }
    else
    {
        if(!document.getElementById('warning'))
        document.body.insertAdjacentHTML('afterbegin',`<div id="warning"><h2>Invalid Input</h2>
        <p>Please make sure that your name consists of characters only, your email is valid, and your password length is not less than 8.</p></div>`)
    }
}

function register(fullName, email, password) {
    var users = [];
    if (oldDB) {
        users = oldDB;
    }
    user = {
        fullName: fullName,
        email: email,
        password: password,
    };
    users.push(user);
    var json = JSON.stringify(users);
    localStorage.setItem('users', json);
    location.assign('login.html')
}
