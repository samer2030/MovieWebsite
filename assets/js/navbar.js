// function getCurrentUser() {
//     var currentJson = JSON.parse(sessionStorage.getItem('currentUser')) || '';
//     return currentJson.fullName;
// }
const head = document.getElementsByTagName('head')[0];
head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="assets/css/navbar.css">`)

var currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

function logout() {
    sessionStorage.clear();
    console.log(sessionStorage)
}

if (currentUser) {
    document.body.insertAdjacentHTML('afterbegin',
        `
<nav>
    <a href="index.html">
        <i class="fa-solid fa-house"></i>
        Home
    </a>
    <div id="filtering"></div>
    <div>
        <a href="favourites.html">${currentUser.fullName}</a>
        <a href="index.html" onclick="logout()" >Log out</a>
    </div>
</nav>
`)
} else {
    document.body.insertAdjacentHTML('afterbegin',
        `
<nav>
    <a class="active" href="index.html">
        <i class="fa-solid fa-house"></i>
        Home
    </a>
    <div id="filtering"></div>
    <div>
        <a href="register.html">Register</a>
        <a href="login.html">Login</a>
    </div>
</nav>
`)
}




