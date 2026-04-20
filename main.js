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
        <img class="show-card-img" src="${show.poster_path}"/>
        <div class="show-card-info">
          <h2 class="show-title">
            ${show.name || show.title} <span>${show.vote_average} </span>
          </h2>
          <div class="show-details">
            <span>${show.media_type}</span>
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
  return shows.map(({
    id,
    first_air_date,
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
      first_air_date,
    backdropPath: 
      backdrop_path,
    posterPath:
      poster_path,
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
  // showsSection.innerHTML = generateShowHtml(showsArr)
  console.log(showsArr)

  console.log(curateShows(showsArr))

}


form.addEventListener('submit', handleClick)
