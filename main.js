const form = document.getElementById('search-bar')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const showsSection = document.getElementById('shows-section')
const watchlistSection = document.getElementById('watchlist-section')



let curatedShowsArr = []
let watchlist = []


const initializeWatchList = () => {
  if (!localStorage.getItem('watchlist')) { return }

  watchlist = JSON.parse(localStorage.getItem('watchlist'))
}




// Pure helper (generate HTML)

const generateShowHtml = (shows, mode) => {
  const buttonText = mode === 'add' ? 'Watchlist' : 'Remove'
  const action = mode === 'add' ? 'add' : 'remove'
  
  let feedHtml = ''
  
  shows.forEach(show => {

    feedHtml += `
    <div class="show-card">
    <img class="show-card-img" src="https://image.tmdb.org/t/p/w500/${show.posterPath}"/>
    <div class="show-card-info">
    <h2 class="show-title">
    ${show.label} <span>${show.rating} </span>
    </h2>
    <div class="show-details">
    <span class="media-type-span">${show.mediaType}</span>
    <button class="action-btn" data-action="${action}"data-id="${show.id}">${buttonText}</button>
    </div>
    <p>${show.overview}</p>
    </div>
    </div>
    `
  })
  
  return feedHtml
}



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


const handleDeleteFromWatchlist = showId => {
  const storedWatchList = JSON.parse(localStorage.getItem('watchlist'))

  const filteredWatchlist = storedWatchlist.filter(show => show.id !== showId)

  localStorage.setItem('watchlist', JSON.stringify(filteredWatchlist))
}


const handleAddToWatchlist = showId => {
  const targetShow = curatedShowsArr.find(show => show.id === showId)

  watchlist.push(targetShow)

  localStorage.setItem('watchlist', JSON.stringify(watchlist))

  console.log(JSON.parse(localStorage.getItem('watchlist')))
}


form.addEventListener('submit', handleClick)


showsSection.addEventListener('click', function (e) {
  const actionBtn = e.target.closest('[data-action]')

  if (!actionBtn) return

  const btnId = Number(actionBtn.dataset.id)
  const btnAction = actionBtn.dataset.action

  if (btnAction === 'add') {
    handleAddToWatchlist(btnId)
  } else if (btnAction === 'remove') {
    handleDeleteFromWatchlist(btnId)
  }
})