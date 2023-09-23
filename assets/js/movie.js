let movie = "";
const movieContainer = document.getElementById('movieContainer');
var urlParams = new URLSearchParams(window.location.search);
var movieID = parseInt(urlParams.get('movieID'));
var movies = "";

var request = new XMLHttpRequest();
request.open('get', 'assets/data/movies.json')
request.send()
request.onreadystatechange = () => {
   if (request.readyState == 4) {
      movies = JSON.parse(request.responseText)
      movieContainer.innerHTML += (
         `<div id="movie">
         <p class="title" id="titleFavourite"><span>${movies[movieID].Title} </span><button id="heartButton" onclick="checkFavs()"></button>
         </p>
         <div id="player_Info">
            <div id="playerContainer">
               <iframe width="860" height="480" src="${movies[movieID].Trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div id="movieDetails">
            <span class="title">Description</span>
            <hr>
               <p><b>Actors:</b> ${movies[movieID].Actors}</p>
               <p><b>Awards:</b> ${movies[movieID].Awards}</p>
               <p><b>Country:</b> ${movies[movieID].Country}</p>
               <p><b>Director:</b> ${movies[movieID].Director}</p>
               <p><b>Plot:</b><p>${movies[movieID].Plot}</p></p>
               <p><b>Rated:</b> ${movies[movieID].Rated}</p>
               <p><b>Released:</b> ${movies[movieID].Released}</p>
               <p><b>Runtime:</b> ${movies[movieID].Runtime}</p>
               <p><b>Language:</b> ${movies[movieID].Language}</p>
               <p><b>Year:</b> ${movies[movieID].Year}</p>
               <p id="rating"><b>Rating: </b></p>
            </div>
         </div>
      </div>`
      )
      const heartButton = document.getElementById('heartButton');
      if (oldFavDB.includes(movieID)) {
         heartButton.innerHTML = `<i class="fa-solid fa-heart" style="color: #ff0064;"></i>`
      }
      else {
         heartButton.innerHTML = `<i class="fa-regular fa-heart"></i>`
      }
      const rating = document.getElementById('rating');
      for (let i = 0; i < movies[movieID].Rating; i++) {
         rating.innerHTML += `<i class="fa-solid fa-star" style="color: #ffd700;"></i>`
      }
      if (movies[movieID].Rating < 5) {
         for (let i = 0; i < (5 - movies[movieID].Rating); i++) {
            rating.innerHTML += `<i class="fa-regular fa-star" style="color: #ffd700;"></i>`
         }
      }
   }
}

// function getCurrentUser() {
//    var currentJson = JSON.parse(sessionStorage.getItem('currentUser'));
//    if (currentJson)
//       return currentJson.email;
//    else
//       throw alert('YOU MUST LOGIN FIRST')
// }
var currentEmail="";
if(JSON.parse(sessionStorage.getItem('currentUser')))
{
   currentEmail = JSON.parse(sessionStorage.getItem('currentUser')).email
}
// var currentEmail = JSON.parse(sessionStorage.getItem('currentUser')).email || "";
var oldFavDB = JSON.parse(localStorage.getItem(currentEmail)) || [];

function checkFavs() {
   oldFavDB = JSON.parse(localStorage.getItem(currentEmail)) || [];
   if (oldFavDB.includes(movieID)) {
      unfavourite(movieID);
   } else {
      favourite(movieID);
   }
}



function unfavourite(movieID) {
   oldFavDB.splice(oldFavDB.indexOf(movieID), 1)
   localStorage.setItem(currentEmail, JSON.stringify(oldFavDB))
   heartButton.innerHTML = `<i class="fa-regular fa-heart"></i>`

}


function favourite() {
   oldFavDB.push(movieID);
   localStorage.setItem(currentEmail, JSON.stringify(oldFavDB))
   heartButton.innerHTML = `<i class="fa-solid fa-heart" style="color: #ff0064;"></i>`
}
