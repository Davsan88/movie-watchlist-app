export const generateEmptyStateHtml = (mode) => {
    const classDiv = mode === 'index' 
        ? 'movie' 
        : 'watchlist'

    const span = mode === 'index' 
        ? 'Start exploring' 
        : 'Your watchlist is looking a little empty... Let’s add some shows.'

   return `
            <div 
              class="${classDiv}-icon-div"
            >
                <svg class="film-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="#404040"
                        d="M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM48 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm304-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm304-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16L64 96c-8.8 0-16 7.2-16 16zM352 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0z" />
                </svg>
                <span>
                    ${span}
                </span>
            </div>
    `
}


export const generateShowHtml = (shows, mode) => {
    const buttonText = mode === 'add' 
        ? '<i class="fa-solid fa-circle-plus" style="color: rgb(255, 255, 255)"></i>  Watchlist' 
        : '<i class="fa-solid fa-circle-minus" style="color: rgb(255, 255, 255)"></i> Remove'
    const action = mode === 'add' ? 'add' : 'remove'

    let feedHtml = ''

    shows.forEach(show => {
        feedHtml += `

    <div class="show-card">
        <img class="show-card-img" src="${show.posterUrl}"/>
        
        <div class="show-card-info">
            <h2 class="show-title">
                ${show.label} 
                
            </h2>
            <div class="show-details">
                <span>
                    <img                class="rating-icon"
                    src="../assets/star-solid.svg"/>
                    ${show.rating} 
                </span>
                <span>
                    ${show.releaseDate}
                </span>
                <span class="media-type-span">
                    ${show.mediaType}
                </span>
                <button 
                    class="action-btn" 
                    data-action="${action}" 
                    data-id="${show.id}">
                    
                        ${buttonText}
                </button>
            </div>
            <p class="show-overview">${show.overview}</p>
        </div>
    </div>
    `
    })

    return feedHtml
}


