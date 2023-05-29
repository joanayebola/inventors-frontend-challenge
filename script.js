
const apiKey = '43822d33f0bc3f90bda3102b3fad7e98';
const popularMoviesEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;


fetch(popularMoviesEndpoint)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    const mostPopularMovie = movies[0]; // Assuming the first movie is the most popular


    const headerBackground = document.getElementById('header-background');
    const backgroundImageUrl = `https://image.tmdb.org/t/p/original${mostPopularMovie.backdrop_path}`;
    headerBackground.style.backgroundImage = `url(${backgroundImageUrl})`;


    const movieTitle = document.getElementById('movie-title');
    movieTitle.textContent = mostPopularMovie.title;


    const watchNowBtn = document.getElementById('watch-now-btn');
    watchNowBtn.href = `https://www.example.com/movie/${mostPopularMovie.id}`;

    const sortedMovies = sortMoviesByPopularity(movies);


    renderMoviesSlider(sortedMovies);


    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', handleSearch);


    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', handleSort);


    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(movieCard => {
      movieCard.addEventListener('click', handleMovieClick);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });


function sortMoviesByPopularity(movies) {
  return movies.sort((a, b) => b.popularity - a.popularity);
}


function sortMoviesByReleaseDate(movies) {
  return movies.sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateB - dateA;
  });
}


function renderMoviesSlider(movies) {
  const moviesList = document.getElementById('movies-list');
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    moviesList.appendChild(movieCard);


    movieCard.addEventListener('click', handleMovieClick);
  });
}


function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const title = movie.title;
  const releaseDate = new Date(movie.release_date).toLocaleDateString();
  const overview = movie.overview

  const cardContent = `
    <img src="${posterUrl}" alt="${title} Poster">
    <h3>${title}</h3>
    <p>Release Date: ${releaseDate}</p>
    <p>${overview}</p>
  `;

  movieCard.innerHTML = cardContent;

  return movieCard;
}


function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.toLowerCase();

  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(movieCard => {
    const title = movieCard.querySelector('h3').textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      movieCard.style.display = 'block';
    } else {
      movieCard.style.display = 'none';
    }
  });
}


function handleSort() {
  const sortSelect = document.getElementById('sort-select');
  const selectedOption = sortSelect.value;

  const moviesList = document.getElementById('movies-list');
  while (moviesList.firstChild) {
    moviesList.firstChild.remove();
  }

  fetch(popularMoviesEndpoint)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      let sortedMovies;

      if (selectedOption === 'popularity') {
        sortedMovies = sortMoviesByPopularity(movies);
      } else if (selectedOption === 'release_date') {
        sortedMovies = sortMoviesByReleaseDate(movies);
      }

      renderMoviesSlider(sortedMovies);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function handleMovieClick(event) {
  const movieCard = event.currentTarget;
  const title = movieCard.querySelector('h3').textContent;
  const rating = movieCard.dataset.rating;
  const runtime = movieCard.dataset.runtime;
  const genre = movieCard.dataset.genre;
  const overview = movieCard.dataset.overview;




  const modalMovieTitle = document.getElementById('modal-movie-title');
  const modalMovieRating = document.getElementById('modal-movie-rating');
  const modalMovieRuntime = document.getElementById('modal-movie-runtime');
  const modalMovieGenre = document.getElementById('modal-movie-genre');
  const modalMovieOverview = document.getElementById('modal-movie-overview');


  modalMovieTitle.textContent = title;
  modalMovieRating.textContent = rating;
  modalMovieRuntime.textContent = runtime;
  modalMovieGenre.textContent = genre;





  const modal = document.getElementById('modal');
  modal.style.display = 'block';


  const closeModal = () => {
    modal.style.display = 'none';
  };
  modal.addEventListener('click', event => {
    if (event.target === modal || event.target.classList.contains('close')) {
      closeModal();
    }
  });
}
