import { generateShowHtml } from "./utils.js"

const watchlistSection = document.getElementById('watchlist-section')


let watchlist = []


const initializeWatchList = () => {
  if (!localStorage.getItem('watchlist')) { return }

  watchlist = JSON.parse(localStorage.getItem('watchlist'))

  watchlistSection.innerHTML = generateShowHtml(watchlist, 'remove')
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

  if (btnAction === 'remove') {
    handleDeleteFromWatchlist(btnId)
  } 
})


initializeWatchList()