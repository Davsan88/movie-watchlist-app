import { generateShowHtml, generateEmptyStateHtml } from "./utils.js"

const form = document.getElementById('search-bar')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const showsSection = document.getElementById('shows-section')


let curatedShowsArr = []
let watchlist = []


const fetchGenres = async () => {
 
  const movieRes = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=96b4f733b8a3836c9dfb5ea5e1034a79&language=en')
  const movieGenres = await movieRes.json()

  const movieGenresArr = movieGenres.genres
  
  const tvRes = await fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=96b4f733b8a3836c9dfb5ea5e1034a79&language=en')
  const tvGenres = await tvRes.json()

  const tvGenresArr = tvGenres.genres

  const arrayToObject = (arr) => arr.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})

  const movieGenresObj = arrayToObject(movieGenresArr)

  const tvGenresObj = arrayToObject(tvGenresArr)
  
 
  console.log(tvGenresObj)
}


const initializeIndexPage = () => {
  showsSection.innerHTML = generateEmptyStateHtml('index')
  fetchGenres()
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
    vote_average
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
      "No title"
  }))
}


const handleClick = async (e) => {
  e.preventDefault()

  const inputValue = searchInput.value.trim()

  if (!inputValue) {
    console.log('No user input')
    return
  }

  const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=96b4f733b8a3836c9dfb5ea5e1034a79&query=${encodeURIComponent(inputValue)}`)
  const data = await res.json()

  console.log(data)

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

  console.log(JSON.parse(localStorage.getItem('watchlist')))
}


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


initializeIndexPage()