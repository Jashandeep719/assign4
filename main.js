// DOM Elements
const loadBtn = document.getElementById('load-movies');
const genreFilter = document.getElementById('genre-filter');
const movieContainer = document.getElementById('movie-container');
const loadingStatus = document.getElementById('loading-status');

// Movie data cache
let moviesData = [];

// Fetch movies from JSON API
async function fetchMovies() {
  try {
    loadingStatus.textContent = 'Loading movies...';
    loadingStatus.className = 'loading';
    
    const response = await fetch('https://[YOUR-GITHUB-USERNAME].github.io/[YOUR-REPO-NAME]/movies.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    moviesData = await response.json();
    displayMovies(moviesData);
    populateGenreFilter(moviesData);
    
    loadingStatus.textContent = `Loaded ${moviesData.length} movies`;
    loadingStatus.className = 'success';
  } catch (error) {
    loadingStatus.textContent = `Error: ${error.message}`;
    loadingStatus.className = 'error';
    console.error('Error fetching movies:', error);
  }
}

// Display movies in the container
function displayMovies(movies) {
  movieContainer.innerHTML = '';
  
  if (movies.length === 0) {
    movieContainer.innerHTML = '<p class="no-results">No movies found</p>';
    return;
  }
  
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
      <div class="movie-info">
        <h3>${movie.title} (${movie.year})</h3>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Rating:</strong> ${movie.rating}/10</p>
        <p class="movie-summary">${movie.summary}</p>
      </div>
    `;
    movieContainer.appendChild(movieCard);
  });
}

// Populate genre filter dropdown
function populateGenreFilter(movies) {
  const genres = new Set(movies.map(movie => movie.genre));
  
  genreFilter.innerHTML = '<option value="all">All Genres</option>';
  
  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

// Filter movies by genre
function filterMovies() {
  const selectedGenre = genreFilter.value;
  
  if (selectedGenre === 'all') {
    displayMovies(moviesData);
  } else {
    const filteredMovies = moviesData.filter(movie => movie.genre === selectedGenre);
    displayMovies(filteredMovies);
  }
}

// Event Listeners
loadBtn.addEventListener('click', fetchMovies);
genreFilter.addEventListener('change', filterMovies);