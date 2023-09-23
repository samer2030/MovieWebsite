const filterContainer = document.getElementById('filtering')
filterContainer.innerHTML = `<input type="text" name="search" id="search" placeholder="Search By Title">
<select name="genre" id="genreFilter">
    <option value="">Filter</option>
</select>
`

function getCurrentUser() {
    var currentJson = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentJson)
        return currentJson.email;
    else
        throw alert('YOU MUST LOGIN FIRST')
}


var currentEmail = getCurrentUser();
var oldFavDB = JSON.parse(localStorage.getItem(currentEmail)) || [];

var moviesContainer = document.getElementsByTagName('tbody')[0];
var search = document.getElementById('search');
var genreFilter = document.getElementById('genreFilter')

var movies = "";
var request = new XMLHttpRequest();
request.open('get', 'assets/data/movies.json')
request.send()
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        movies = JSON.parse(request.responseText)
        drawMovies();
    }
}
var genres = [];



function drawMovies() {
    moviesContainer.innerHTML = "";
    //Show all the movies that it's title starts with the search value
    for (var i = 0; i < movies.length; i++) {
        if (oldFavDB.includes(movies[i].ID)) {
            if (movies[i].Genre.indexOf(genreFilter.value) != -1 && movies[i].Title.toLowerCase().indexOf(search.value.toLowerCase()) == 0) {
                genreSplit = movies[i].Genre.split(',');
                moviesContainer.innerHTML += `<tr>
                <td><a href="movie.html?movieID=${movies[i].ID}"><img src="${movies[i].Poster}"></a></td>
                <td><a href="movie.html?movieID=${movies[i].ID}">${movies[i].Title}</a></td>
                <td>${movies[i].Genre.split(',').join(', ')}</td>
                <td>${movies[i].Year}</td>
                <td>${movies[i].Rating}</td>
                <td><i onclick="unfavourite(${movies[i].ID})" class="heartButton fa-solid fa-heart" style="color: #ff0064;"></i></td>
                </tr>`;
                for (var j = 0; j < genreSplit.length; j++) {
                    if (!genres.includes(genreSplit[j])) {
                        genres.push(genreSplit[j]);
                        genreFilter.innerHTML += `<option value=${genreSplit[j]}>${genreSplit[j]}</option>`;
                    }
                }
            }
        }
    }
    //Then show all the movies that it's title includes the search value
    for (var i = 0; i < movies.length; i++) {
        if (oldFavDB.includes(movies[i].ID)) {
            if (movies[i].Genre.indexOf(genreFilter.value) != -1 && movies[i].Title.toLowerCase().indexOf(search.value.toLowerCase()) > 0) {
                genreSplit = movies[i].Genre.split(',');
                moviesContainer.innerHTML += `<tr>
                <td><img src="${movies[i].Poster}" style="width:100px;"></td>
                <td><a href="movie.html?movieID=${movies[i].ID}>${movies[i].Title}</a></td>
                <td>${movies[i].Genre.split(',').join(', ')}</td>
                <td>${movies[i].Year}</td>
                <td>${movies[i].Rating}</td>
                <td><button onclick="unfavourite(${movies[i].ID})"><i class="fa-solid fa-heart"></i></button></td>
                </tr>`;
                for (var j = 0; j < genreSplit.length; j++) {
                    if (!genres.includes(genreSplit[j])) {
                        genres.push(genreSplit[j]);
                        genreFilter.innerHTML += `<option value=${genreSplit[j]}>${genreSplit[j]}</option>`;
                    }
                }
            }
        }
    }
}
genreFilter.addEventListener('change', () => {
    drawMovies();
})


search.addEventListener('keyup', () => {
    drawMovies();
}
);
function unfavourite(movieID) {
    oldFavDB.splice(oldFavDB.indexOf(movieID), 1)
    localStorage.setItem(currentEmail, JSON.stringify(oldFavDB)) 
    drawMovies();
 }
/*
-------------->GOING TO NEED THIS TO GET SPECIFIC URL PARAMETER<--------------
// Create urlParams query string
var urlParams = new URLSearchParams(window.location.search);

// Get value of single parameter
var sectionName = urlParams.get('section');

// Output value to console
console.log(sectionName);

Using the movie index we show it in another page and using js we display that specific movie
*/
