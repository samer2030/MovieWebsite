var emailLogin;
var fullNameLogin;
var check;
oldDB = JSON.parse(localStorage.getItem('users'));


function checkLocalStorageLogin() {
    emailLogin = document.getElementById('emailLogin').value.toLowerCase();
    var passwordLogin = document.getElementById('passwordLogin').value;
    if (oldDB) {
        for (let i = 0; i < oldDB.length; i++) {
            if (oldDB[i].email == emailLogin && oldDB[i].password == passwordLogin) {
                check = 0;
                login(oldDB[i].fullName);
                break;
            } else {
                check = 1;
            }
        }
    }
    if ((check == 1||!oldDB)&&!document.getElementById('warning')) {
        document.body.insertAdjacentHTML('afterbegin', `<div id="warning"><h2>Invalid Credentials</h2>
        <p>Email or Password is Incorrect</p></div>`)
    }
}

function login(user) {
    fullNameLogin = user;
    emailLogin = document.getElementById('emailLogin').value;
    userObj = { 'email': emailLogin, 'fullName': fullNameLogin }

    var userJson = JSON.stringify(userObj);
    sessionStorage.setItem('currentUser', userJson);
    location.assign('index.html')
}