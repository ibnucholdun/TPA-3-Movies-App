const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0960e915a728e16ff143f46542084799';
const ENDPOINT_POPULER = 'movie/popular'
const ENDPOINT_SEARCH = 'search/movie'
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const form = document.querySelector('form');
const search = document.querySelector('.input-search');
const listMovies = document.querySelector('.list-movies');

const templateCardMovie = (movie) => {
    return `
    <div class="col g-3 d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
            <img src="${IMG_URL + movie.poster_path}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-date">${movie.release_date}</p>
                <p class="card-rating"><i class="bi bi-star-fill me-2"></i>${movie.vote_average}</p>
            </div>
        </div>
    </div>
    `;
}

const getMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/${ENDPOINT_POPULER}?api_key=${API_KEY}&page=1`);
        const data = await response.json();
        const movies = data.results;
        const html = movies.map(movie => templateCardMovie(movie)).join('');
        listMovies.innerHTML = html;
    } catch (error) {
        console.log(error);
    }
}

const searchMovies = async (keyword) => {
    try {
        const response = await fetch(`${BASE_URL}/${ENDPOINT_SEARCH}?api_key=${API_KEY}&query=${keyword}&page=1`);
        const data = await response.json();
        const movies = data.results;
        const html = movies.map(movie => templateCardMovie(movie)).join('');
        listMovies.innerHTML = html;
    } catch (error) {
        console.log(error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchMovies(search.value);
});


getMovies();
