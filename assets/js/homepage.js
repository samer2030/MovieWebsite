const filterContainer = document.getElementById('filtering')
filterContainer.innerHTML = `<input type="text" name="search" id="search" placeholder="Search By Title">
<select name="genre" id="genreFilter">
    <option value="">Filter</option>
</select>
`

var moviesContainer = document.getElementById('moviesContainer');
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
        if (movies[i].Genre.indexOf(genreFilter.value) != -1 && movies[i].Title.toLowerCase().indexOf(search.value.toLowerCase()) == 0) {
            genreSplit = movies[i].Genre.split(',');
            moviesContainer.innerHTML += `
        <div class="movie">
            <img src="${movies[i].Poster}">
            <div>
                <h2>${movies[i].Title}</h2>
                <!--<div>
                    <b>Story</b>
                    <p>${movies[i].Plot}</p>
                </div>-->
                <p>
                    <b>Genre: </b>
                    ${movies[i].Genre.split(',').join(', ')}
                </p>
                <p><b>Year: </b> ${movies[i].Year}</p>
                <a href="movie.html?movieID=${movies[i].ID}">
                <i class="fa-solid fa-circle-play fa-beat-fade fa-xl"></i>
                </a>
            </div>
        </div>`;
            for (var j = 0; j < genreSplit.length; j++) {
                if (!genres.includes(genreSplit[j])) {
                    genres.push(genreSplit[j]);
                    genreFilter.innerHTML += `<option value=${genreSplit[j]}>${genreSplit[j]}</option>`;
                }
            }
        }
    }
    //Then show all the movies that it's title includes the search value
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].Genre.indexOf(genreFilter.value) != -1 && movies[i].Title.toLowerCase().indexOf(search.value.toLowerCase()) > 0) {
            genreSplit = movies[i].Genre.split(',');
            moviesContainer.innerHTML += `
        <div class="movie">
            <img src=${movies[i].Poster}>
            <div>
                <h2>${movies[i].Title}</h2>
                <!--<div>
                    <b>Story</b>
                    <p>${movies[i].Plot}</p>
                </div>-->
                <p>
                    <b>Genre: </b>
                    ${movies[i].Genre.split(',').join(', ')}
                </p>
                <p><b>Year: </b> ${movies[i].Year}</p>
                <a href="movie.html?movieID=${movies[i].ID}">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/>
                </svg>
                </a>
                </div>
            
        </div>`;
            for (var j = 0; j < genreSplit.length; j++) {
                if (!genres.includes(genreSplit[j])) {
                    genres.push(genreSplit[j]);
                    genreFilter.innerHTML += `<option value=${genreSplit[j]}>${genreSplit[j]}</option>`;
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
