var oldFavDB = JSON.parse(localStorage.getItem('favs')) || [];
var userFavs = [];
let movie = "";

var currentEmail = getCurrentUser();
function getCurrentUser() {
   var currentJson = JSON.parse(sessionStorage.getItem('currentUser'));
   if (currentJson)
      return currentJson.email;
   else
      throw alert('YOU MUST LOGIN FIRST')
}

for (var i = 0; i < oldFavDB.length; i++) {
   if (oldFavDB[i].currentEmail == currentEmail) {
      for (let j = 0; j < oldFavDB[i].userFavsDB.length; j++) {
         userFavs.push(oldFavDB[i].userFavsDB[j]);
      }
   }
}


const movieContainer = document.getElementById('movieContainer');
var urlParams = new URLSearchParams(window.location.search);
var movieID = urlParams.get('movieID');
var movies = "";
var request = new XMLHttpRequest();
request.open('get', 'assets/data/movies.json')
request.send()
request.onreadystatechange = () => {
   if (request.readyState == 4) {
      movies = JSON.parse(request.responseText)
      for (var index = 0; index < movies.length; index++) {
         if (movies[index].ID == movieID) {
            movie = movies[index]
         }
      }
      movieContainer.innerHTML += (
         `<div id="movie">
         <p class="title"><span>${movie.Title} <span><button id="heartButton" onclick="favourite()"><i class="fa-regular fa-heart"></i></button>
         </p>
         <div id="player_Info">
            <div id="playerContainer">
               <iframe width="860" height="480" src="${movie.Trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div id="movieDetails">
            <span class="title">Description</span>
            <hr>
               <p><b>Actors:</b> ${movie.Actors}</p>
               <p><b>Awards:</b> ${movie.Awards}</p>
               <p><b>Country:</b> ${movie.Country}</p>
               <p><b>Director:</b> ${movie.Director}</p>
               <p><b>Plot:</b><p>${movie.Plot}</p></p>
               <p><b>Rated:</b> ${movie.Rated}</p>
               <p><b>Released:</b> ${movie.Released}</p>
               <p><b>Runtime:</b> ${movie.Runtime}</p>
               <p><b>Language:</b> ${movie.Language}</p>
               <p><b>Year:</b> ${movie.Year}</p>
               <p id="rating"><b>Rating: </b></p>
            </div>
         </div>
      </div>`
      )
      const rating = document.getElementById('rating');
      for (let i = 0; i < movie.Rating; i++) {
         rating.innerHTML += `<i class="fa-solid fa-star" style="color: #ffd700;"></i>`
      }
      if (movie.Rating < 5) {
         for (let i = 0; i < (5 - movie.Rating); i++) {
            rating.innerHTML += `<i class="fa-regular fa-star" style="color: #ffd700;"></i>`
         }
      }
   }
}



function checkFavs() {
   if (userFavs.includes(movieID)) {
      favourite();
   } else {
      unfavourite();
   }
}



function unfavourite() {
   // array pop id 
}


function favourite() {
   if (oldFavDB) {
      favDB = oldFavDB;
   }
   userFavs.push(movieID);
   favUser = {
      email: `${currentEmail}`,
      userFavsDB: userFavs,
   }
   favDB.push(favUser);

   var json = JSON.stringify(favDB);
   localStorage.setItem('favs', json)
}