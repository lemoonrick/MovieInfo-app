// movie api keys

const apikey = 'fb22739f'; // rplace your api key with this

$(document).ready(() => {
  $('#searchForm').on('submit', e => {
    e.preventDefault();
    let searchText = $('#searchText').val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=fb22739f') // put your api key here
    .then((response) => {
      console.log(response)

      let movies = response.data.Search;
      let output = '';

      $.each(movies, (index, movie) => {
        output += `
            <div class="col-3">
            <div class="card">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => console.log(err));
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  // return false;
}

function getMovie() {
  // getting the movie id
  
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=fb22739f') // put your api key here
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="movie-row">
          <div class="poster card">
            <img src="${movie.Poster}" class="thumbnail">
            <h2>${movie.Title}</h2>
          </div>

          <div class="moviedetaillist card" style=" text-align: left ">
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Released:</strong> ${movie.Released}</p>
            <p><strong>Rated:</strong> ${movie.Rated}</p>
            <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Writer:</strong> ${movie.Writer}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>

            <div>
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn" style='background-color: orange; color: black'>View IMDB</a>
              <a href="index.html" class="btn">Go Back To Search</a>
            </div>

          </div>

        </div>


      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
