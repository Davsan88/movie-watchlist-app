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
2. Search + fetch + render results **DONE**
3. Define and test the movie object shape **DONE**
4. Add to watchlist (localStorage) **DONE**
5. Render watchlist **DONE**
6. Delete saved movie **DONE**
7. Refactor shared logic **DONE** 
8. Secure API with Netlify function 


# 4 CSS phase
1. Page shell: header, footer, main spacing
2. Search bar
3. Show cards
4. Watchlist layout
5. Button states: default, hover, saved, removed,       disabled
6. Responsive layout
7. Empty/loading states

# Final checklist

1. Search works
2. Results render cleanly
3. Watchlist buttons save items
4. Saved items persist after refresh
5. Watchlist page renders saved items
6. Remove works
7. Empty watchlist message exists
8. Missing posters don’t break layout
9. Ratings are formatted
10. Basic loading/no-results/error states exist
11. CSS is responsive enough for mobile + desktop