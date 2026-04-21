const form = document.getElementById('search-bar')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const showsSection = document.getElementById('shows-section')


let showsArr = []

// Pure helper (generate HTML)

const generateShowHtml = (shows) => {
  let feedHtml = ''

  shows.forEach(show => {
    feedHtml += `
      <div class="show-card" data-id="${show.id}">
        <img class="show-card-img" src="https://image.tmdb.org/t/p/w500/${show.posterPath}"/>
        <div class="show-card-info">
          <h2 class="show-title">
            ${show.label} <span>${show.rating} </span>
          </h2>
          <div class="show-details">
            <span>${show.mediaType}</span>
            <button>Watchlist</button>
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

  showsArr = data.results

  const curatedShowsArr = curateShows(showsArr)

  showsSection.innerHTML = generateShowHtml(curatedShowsArr)

  console.log(curatedShowsArr)

}


form.addEventListener('submit', handleClick)
