import { generateShowHtml, generateEmptyStateHtml } from "./utils.js"

const watchlistSection = document.getElementById('watchlist-section')


let watchlist = []





const initializeWatchList = () => {
  watchlist = JSON.parse(localStorage.getItem('watchlist')) || []

  if (watchlist.length) {
    watchlistSection.innerHTML = generateShowHtml(watchlist, 'remove')
  } else watchlistSection.innerHTML = generateEmptyStateHtml('watchlist')
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