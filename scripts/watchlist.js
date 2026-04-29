import { generateShowHtml } from "./utils.js"

const watchlistSection = document.getElementById('watchlist-section')


let watchlist = []


const generateEmptyWatchlistHtml = () => {
   return `
            <div 
              class="watchlist-icon-div"
            >
                <svg class="film-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="rgb(30, 48, 80)"
                        d="M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM48 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm304-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm304-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16L64 96c-8.8 0-16 7.2-16 16zM352 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0z" />
                </svg>
                <span>Your watchlist is looking a little empty...
                    Let’s add some shows.
                </span>
            </div>
    `
}


const initializeWatchList = () => {
  // if (!localStorage.getItem('watchlist')) {   watchlistSection.innerHTML = generateEmptyWatchlistHtml() }

  watchlist = JSON.parse(localStorage.getItem('watchlist')) || []

  if (watchlist.length) {
    watchlistSection.innerHTML = generateShowHtml(watchlist, 'remove')
  } else watchlistSection.innerHTML = generateEmptyWatchlistHtml()
}


const handleDeleteFromWatchlist = showId => {
  const filteredWatchlist = watchlist.filter(show => show.id !== showId)

  localStorage.setItem('watchlist', JSON.stringify(filteredWatchlist))

  initializeWatchList()
}


watchlistSection.addEventListener('click', function (e) {
  const actionBtn = e.target.closest('[data-action]')
  if (!actionBtn) return

  const btnId = Number(actionBtn.dataset.id)
  const btnAction = actionBtn.dataset.action
  const originalText = actionBtn.textContent

  actionBtn.textContent = 'Removed!'
  actionBtn.classList.add('removed')

  setTimeout(() => {
    if (btnAction === 'remove') {
      handleDeleteFromWatchlist(btnId)
    }
  }, 400)
})


initializeWatchList()