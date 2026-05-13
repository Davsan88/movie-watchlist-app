// ====================
// Imports
// ====================

import { generateShowHtml, generateEmptyStateHtml, arrayToObject } from "./utils.js"


// ====================
// DOM References
// ====================

const form = document.getElementById('search-bar')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const showsSection = document.getElementById('shows-section')


// ====================
// State
// ====================

let curatedShowsArr = []
let watchlist = []
let movieGenresObj = {}
let tvGenresObj = {}


// ====================
// API Constants
// ====================

const API_KEY = 'api_key=96b4f733b8a3836c9dfb5ea5e1034a79'
const BASE_URL = 'https://api.themoviedb.org/3'


// ====================
// Data Helpers
// ====================

const fetchGenres = async () => {
 
  const movieRes = await fetch(`${BASE_URL}/genre/movie/list?${API_KEY}&language=en`)
  const movieGenres = await movieRes.json()
  const movieGenresArr = movieGenres.genres
  
  const tvRes = await fetch(`${BASE_URL}/genre/tv/list?${API_KEY}&language=en`)
  const tvGenres = await tvRes.json()
  const tvGenresArr = tvGenres.genres

  movieGenresObj = arrayToObject(movieGenresArr)
  tvGenresObj = arrayToObject(tvGenresArr)
}


const checkGenre = (mediaType, genresArr) => {
  const genresObj = mediaType === 'movie'
    ? movieGenresObj
    : tvGenresObj

    return genresArr.map( genre => genresObj[genre]).join(', ')
}


const curateShows = (shows) => {
  const fallBackImg = '../assets/no-image.png'
  
  const movieAndTvShows = shows.filter(show => {
    
    const allowedTypes = ["movie", "tv"]
    return allowedTypes.includes(show.media_type)
  })
  
  return movieAndTvShows.map(({
    id,
    first_air_date,
    release_date,
    backdrop_path,
    poster_path,
    title,
    name,
    original_title,
    original_name,
    media_type,
    overview,
    vote_average,
    genre_ids
  }) => ({
    id,
    releaseDate:
    new Date (release_date || first_air_date)
    .getFullYear(),
    backdropPath:
    backdrop_path,
    posterUrl:
    poster_path 
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : fallBackImg,
    mediaType:
    media_type,
    overview,
    rating:
    Math.round(vote_average * 10) / 10,
    label:
    title ??
    name ??
    original_title ??
    original_name ??
    "No title",
    genres:
    checkGenre(media_type, genre_ids.slice(0, 3)),
  }))
}


// ====================
// UI Initialization
// ====================

const initializeIndexPage = () => {
  showsSection.innerHTML = generateEmptyStateHtml('index')
  fetchGenres()
}


// ====================
// Event Handlers
// ====================

const handleClick = async (e) => {
  e.preventDefault()
  
  const inputValue = searchInput.value.trim()

  if (!inputValue) {
        return
  }

  const res = await fetch(`${BASE_URL}/search/multi?${API_KEY}&query=${encodeURIComponent(inputValue)}`)
  const data = await res.json()

  if (!data.results.length) {
        showsSection.innerHTML = '<p class="no-data-message">These aren’t the shows you’re looking for. Try another search.</p>'
    return
  }

  curatedShowsArr = curateShows(data.results)

  showsSection.innerHTML = generateShowHtml(curatedShowsArr, 'add')
}


const handleAddToWatchlist = showId => {
  watchlist = JSON.parse(localStorage.getItem('watchlist')) || []

  const targetShow = curatedShowsArr.find(show => show.id === showId)

  if (!targetShow) return

  const showInWatchlist = watchlist.find(({ id }) => id === targetShow.id)

  showInWatchlist 
    ? '' 
    : watchlist.push(targetShow) 

  localStorage.setItem('watchlist', JSON.stringify(watchlist))
}


// ====================
// Event Listeners
// ====================

form.addEventListener('submit', handleClick)


showsSection.addEventListener('click', function (e) {
  const actionBtn = e.target.closest('[data-action]')
  if (!actionBtn) return

  const btnId = Number(actionBtn.dataset.id)
  const btnAction = actionBtn.dataset.action
  const originalText = actionBtn.textContent

  if (btnAction === 'add') {
    handleAddToWatchlist(btnId)
    actionBtn.disabled = true
    actionBtn.textContent = 'Saved!'
    actionBtn.classList.add('saved')
  }
})


// ====================
// App Initialization
// ====================

initializeIndexPage()