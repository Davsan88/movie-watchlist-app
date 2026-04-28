export const generateShowHtml = (shows, mode) => {
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


