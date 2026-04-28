import { generateShowHtml } from "./utils.js"

const form = document.getElementById('search-bar')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const showsSection = document.getElementById('shows-section')


let curatedShowsArr = []
let watchlist = []


const curateShows = (shows) => {
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
      release_date ??
      first_air_date,
    backdropPath:
      backdrop_path,
    posterPath:
      poster_path,
    mediaType:
      media_type,
    overview,
    rating:
      vote_average,
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