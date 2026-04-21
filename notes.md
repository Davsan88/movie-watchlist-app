# 1 Movie Object shape:
* Id - Core
* Title - Core
* Poster - Core
* runtime - Core
* Sinopsys - Core 
* Rating - Core

* release date - Later
* genre - Later
* Age rating? - Later

# 2a Index page resposibilities
1. read search input
2. send API request
3. transform response into your app’s movie shape
4. render results or empty state
5. save selected movie to localStorage

# 2b Watchlist page resposibilities
1. read movies from localStorage
2. render saved movies or empty state
3. delete movies from localStorage
4. re-render updated list

# 3 Building Order
1. HTML/CSS scaffold **DONE**
2. Search + fetch + render results 
3. Define and test the movie object shape
4. Add to watchlist (localStorage)
5. Render watchlist
6. Delete saved movie
7. Refactor shared logic
8. Secure API with Netlify function



const show = {
    id: "",
    title: "",
    poster: "",
    rating: "",
    releaseDate: "",
    overview: ""
}


hue 34
sat 24
lum 86  
r 183
g 155
b 0